import { Button } from "@/components/_ui/Button";
import { Card } from "@/components/_ui/Card";
import type { Entry } from "@/components/_ui/FileBrowser";
import { FileBrowser } from "@/components/_ui/FileBrowser";
import { Modal } from "@/components/_ui/Modal";
import { Slider } from "@/components/_ui/Slider";
import { Text } from "@/components/_ui/Text";
import { Title } from "@/components/_ui/Title";
import { getFilesRecursively, isMusicFile, processMusicFileFn } from "@/components/musicFileUtils";
import "@/components/MusicPlayer.css";
import type { Playlist, ProcessingProgress, Track } from "@/components/musicTypes";
import { Capacitor } from "@capacitor/core";
import type { ReaddirResult } from "@capacitor/filesystem";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Base64 } from "js-base64";
import { ListMusic, Music, Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { parseBuffer } from "music-metadata";
import React, { useEffect, useMemo, useRef, useState } from "react";

const capacitorToEntryList = (result: ReaddirResult, path: string): Entry[] =>
	result.files.map((file) => ({
		baseName: file.name,
		path: path + "/" + file.name,
		type: file.type === "directory" ? "DIRECTORY" : "FILE",
	}));

const isDirectoryOrMusicFile = (e: Entry): boolean => e.type === "DIRECTORY" || isMusicFile(e.baseName);

// function base64ToArrayBuffer(base64: string) {
// 	const binaryString = atob(base64);
// 	const bytes = new Uint8Array(binaryString.length);
// 	for (let i = 0; i < binaryString.length; i++) {
// 		bytes[i] = binaryString.charCodeAt(i);
// 	}
// 	return bytes.buffer;
// }

// const convertDataURIToBinary = (dataURI: string) => Uint8Array.from(window.atob(dataURI), (v) => v.charCodeAt(0));
const convertDataURIToBinary = Base64.toUint8Array;

export const MusicPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.7);
	const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	const [showPlaylistModal, setShowPlaylistModal] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [repeat, setRepeat] = useState<"none" | "one" | "all">("none");
	const [isLoading, setIsLoading] = useState(false);
	const [processingProgress, setProcessingProgress] = useState<ProcessingProgress>({ current: 0, total: 0 });
	const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

	const audioRef = useRef<HTMLAudioElement>(null);

	const isWeb = useMemo(() => Capacitor.getPlatform() === "web", []);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	// Update audio source when current track changes
	useEffect(() => {
		if (audioRef.current && currentTrack?.songSrc) {
			audioRef.current.src = currentTrack.songSrc;
			audioRef.current.load();

			// Auto-play when track changes and isPlaying is true
			if (isPlaying) {
				audioRef.current.play().catch((error) => {
					console.log("Auto-play prevented:", error);
					setIsPlaying(false);
				});
			}
		}
	}, [currentTrack, isPlaying]);

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const handlePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleNext = () => {
		if (!currentPlaylist) return;

		let nextIndex: number;

		if (shuffle && shuffledIndices.length > 0) {
			// Find current position in shuffled order
			const currentShuffledIndex = shuffledIndices.indexOf(currentTrackIndex);
			if (currentShuffledIndex < shuffledIndices.length - 1) {
				// Move to next track in shuffled order
				nextIndex = shuffledIndices[currentShuffledIndex + 1];
			} else {
				// End of shuffled playlist
				if (repeat === "all") {
					// Generate new shuffle order and start from beginning
					const newShuffledIndices = generateShuffledIndices(currentPlaylist.tracks.length);
					setShuffledIndices(newShuffledIndices);
					nextIndex = newShuffledIndices[0];
				} else if (repeat === "one") {
					// Repeat current track
					nextIndex = currentTrackIndex;
				} else {
					return; // End of playlist
				}
			}
		} else {
			// Normal sequential order
			if (currentTrackIndex < currentPlaylist.tracks.length - 1) {
				nextIndex = currentTrackIndex + 1;
			} else {
				// End of playlist
				if (repeat === "all") {
					nextIndex = 0;
				} else if (repeat === "one") {
					// Repeat current track
					nextIndex = currentTrackIndex;
				} else {
					return; // End of playlist
				}
			}
		}

		setCurrentTrackIndex(nextIndex);
		setCurrentTrack(currentPlaylist.tracks[nextIndex]);
		// Keep playing state when navigating to next track
	};

	const handlePrevious = () => {
		if (!currentPlaylist) return;

		let prevIndex: number;

		if (shuffle && shuffledIndices.length > 0) {
			// Find current position in shuffled order
			const currentShuffledIndex = shuffledIndices.indexOf(currentTrackIndex);
			if (currentShuffledIndex > 0) {
				// Move to previous track in shuffled order
				prevIndex = shuffledIndices[currentShuffledIndex - 1];
			} else {
				// Beginning of shuffled playlist
				if (repeat === "all") {
					// Generate new shuffle order and go to end
					const newShuffledIndices = generateShuffledIndices(currentPlaylist.tracks.length);
					setShuffledIndices(newShuffledIndices);
					prevIndex = newShuffledIndices[newShuffledIndices.length - 1];
				} else if (repeat === "one") {
					// Repeat current track
					prevIndex = currentTrackIndex;
				} else {
					return; // Beginning of playlist
				}
			}
		} else {
			// Normal sequential order
			if (currentTrackIndex > 0) {
				prevIndex = currentTrackIndex - 1;
			} else {
				// Beginning of playlist
				if (repeat === "all") {
					prevIndex = currentPlaylist.tracks.length - 1;
				} else if (repeat === "one") {
					// Repeat current track
					prevIndex = currentTrackIndex;
				} else {
					return; // Beginning of playlist
				}
			}
		}

		setCurrentTrackIndex(prevIndex);
		setCurrentTrack(currentPlaylist.tracks[prevIndex]);
		// Keep playing state when navigating to previous track
	};

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	};

	const handleSeek = (value: number) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value;
			setCurrentTime(value);
		}
	};

	const handleVolumeChange = (value: number) => {
		setVolume(value);
	};

	const generateShuffledIndices = (playlistLength: number): number[] => {
		const indices = Array.from({ length: playlistLength }, (_, i) => i);
		for (let i = indices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[indices[i], indices[j]] = [indices[j], indices[i]];
		}
		return indices;
	};

	const toggleShuffle = () => {
		const newShuffle = !shuffle;
		setShuffle(newShuffle);

		if (newShuffle && currentPlaylist) {
			// Generate new shuffled order
			const newShuffledIndices = generateShuffledIndices(currentPlaylist.tracks.length);
			setShuffledIndices(newShuffledIndices);
		} else {
			// Clear shuffled indices when turning off shuffle
			setShuffledIndices([]);
		}
	};

	const toggleRepeat = () => {
		setRepeat(repeat === "none" ? "all" : repeat === "all" ? "one" : "none");
	};

	const handleTrackEnd = () => {
		if (repeat === "one") {
			// Repeat current track
			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current.play().catch((error) => {
					console.log("Auto-play prevented:", error);
					setIsPlaying(false);
				});
			}
		} else {
			// Move to next track
			handleNext();
		}
	};

	// Get the display order for playlist (shuffled or sequential)
	const getDisplayOrder = () => {
		if (shuffle && shuffledIndices.length > 0) {
			return shuffledIndices;
		}
		return Array.from({ length: currentPlaylist?.tracks.length || 0 }, (_, i) => i);
	};

	// Folder opening functionality
	const openFolder = async (dirHandle: FileSystemDirectoryHandle, bRecursive: boolean = false) => {
		try {
			setIsLoading(true);

			// Clear existing tracks and revoke URLs
			if (currentPlaylist?.tracks) {
				for (const track of currentPlaylist.tracks) {
					URL.revokeObjectURL(track.songSrc);
					if (track.pictureSrc) URL.revokeObjectURL(track.pictureSrc);
				}
			}

			const newTracks: Track[] = [];
			const musicFiles: FileSystemFileHandle[] = [];

			// Collect all music files
			for await (const fileHandle of getFilesRecursively(dirHandle, isMusicFile, bRecursive)) {
				musicFiles.push(fileHandle);
			}

			setProcessingProgress({ current: 0, total: musicFiles.length });

			// Process each music file
			const processMusicFile = processMusicFileFn(newTracks, setProcessingProgress);
			await Promise.all(musicFiles.map(processMusicFile));

			if (newTracks.length === 0) {
				alert("No music files found in the selected folder.");
				return;
			}

			newTracks.sort((a, b) => a.title.localeCompare(b.title));

			// Create new playlist
			const newPlaylist: Playlist = {
				id: Date.now().toString(),
				name: dirHandle.name,
				tracks: newTracks,
			};

			// Update state
			setCurrentPlaylist(newPlaylist);
			setCurrentTrackIndex(0);
			setCurrentTrack(newTracks[0]);

			// Generate shuffled indices if shuffle is enabled
			if (shuffle) {
				const newShuffledIndices = generateShuffledIndices(newTracks.length);
				setShuffledIndices(newShuffledIndices);
			} else {
				setShuffledIndices([]);
			}

			// Auto-play the first track when folder is loaded
			setIsPlaying(true);

			// Close modal
			setShowPlaylistModal(false);
		} catch (error) {
			console.error("Error opening folder:", error);
			alert("Error opening folder. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleOpenFolder = () => {
		window
			.showDirectoryPicker()
			.then((dirHandle) => openFolder(dirHandle, false))
			.catch((error) => {
				console.error("Error selecting folder:", error);
				if (error.name === "AbortError") {
					// User cancelled folder selection
					return;
				}
				alert("Error selecting folder. Please try again.");
			});
	};

	const [currentDirectory, setCurrentDirectory] = useState<string>("/");
	const [entryList, setEntryList] = useState<Entry[]>([]);

	useEffect(() => {
		Filesystem.readdir({ directory: Directory.ExternalStorage, path: "" }).then((e) => setEntryList(capacitorToEntryList(e, "")));
	}, []);

	const handleNavigate = (path: string) => {
		setCurrentDirectory(path);
		setIsLoading(true);
		Filesystem.readdir({ directory: Directory.ExternalStorage, path })
			.then((result) => setEntryList(capacitorToEntryList(result, path)))
			.finally(() => setIsLoading(false));
	};

	const [elapsedTime, setElapsedTime] = useState(0);

	const selectFolder = async () => {
		const newTracks: Track[] = [];

		const filteredEntryList = entryList.filter((e) => e.type === "FILE").slice(0, 10);

		setProcessingProgress({ current: 0, total: filteredEntryList.length });

		const startTime = performance.now();
		await Promise.all(
			filteredEntryList.map(async (entry) => {
				let songSrc: string = "";
				let pictureSrc: string | null = null;

				try {
					const result = await Filesystem.readFile({ directory: Directory.ExternalStorage, path: entry.path });
					const arrayBuffer = convertDataURIToBinary(result.data as string);

					songSrc = URL.createObjectURL(new Blob([arrayBuffer as BlobPart]));

					// Parse metadata from the audio file
					const metadata = await parseBuffer(arrayBuffer);

					// Extract metadata with fallbacks
					const title = metadata.common.title || entry.baseName.replace(/\.[^/.]+$/, "");
					const artist = metadata.common.artist || "Unknown Artist";
					const album = metadata.common.album || "Unknown Album";
					const duration = metadata.format.duration || 0;

					// Extract album art if available
					if (metadata.common.picture && metadata.common.picture.length > 0) {
						const picture = metadata.common.picture[0];
						const blob = new Blob([new Uint8Array(picture.data)], { type: picture.format });
						pictureSrc = URL.createObjectURL(blob);
					}

					newTracks.push({
						fileName: entry.baseName,
						title: title,
						artist: artist,
						album: album,
						duration: duration,
						songSrc: songSrc,
						pictureSrc: pictureSrc,
					});

					// Update progress
					setProcessingProgress((prev) => ({ ...prev, current: prev.current + 1 }));
				} catch (error) {
					console.error(`Error processing file ${entry.baseName}:`, error);

					// Fallback to filename if metadata parsing fails
					const filename = entry.baseName;
					const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

					newTracks.push({
						fileName: filename,
						title: nameWithoutExt,
						artist: "Unknown Artist",
						album: "Unknown Album",
						duration: 0,
						songSrc: songSrc,
						pictureSrc: null,
					});

					// Update progress
					setProcessingProgress((prev) => ({ ...prev, current: prev.current + 1 }));
				}
			})
		);
		const endTime = performance.now();
		setElapsedTime((endTime - startTime) / 1000);

		if (newTracks.length === 0) {
			alert("No music files found in the selected folder.");
			return;
		}

		newTracks.sort((a, b) => a.title.localeCompare(b.title));

		// Create new playlist
		const newPlaylist: Playlist = {
			id: Date.now().toString(),
			name: currentDirectory,
			tracks: newTracks,
		};

		// Update state
		setCurrentPlaylist(newPlaylist);
		setCurrentTrackIndex(0);
		setCurrentTrack(newTracks[0]);

		// Generate shuffled indices if shuffle is enabled
		if (shuffle) {
			const newShuffledIndices = generateShuffledIndices(newTracks.length);
			setShuffledIndices(newShuffledIndices);
		} else {
			setShuffledIndices([]);
		}

		// Auto-play the first track when folder is loaded
		setIsPlaying(true);

		// Close modal
		setShowPlaylistModal(false);
	};

	return (
		<div className="music-player">
			<audio
				ref={audioRef}
				src={currentTrack?.songSrc}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleTrackEnd}
			/>
			{elapsedTime && (
				<Text size="sm" color="white">
					Elapsed time: {elapsedTime.toFixed(2)} seconds
				</Text>
			)}

			<Card className="player-main-card">
				<div className="player-header">
					<Title order={2} noMargin>
						Music Player
					</Title>
					<Button variant="light" size="sm" onClick={() => setShowPlaylistModal(true)} icon={<ListMusic size={16} />}>
						Open Music Folder
					</Button>
				</div>

				{/* Now Playing */}
				<Card className="now-playing-card">
					<div className="track-info">
						<div className="album-art">
							{currentTrack?.pictureSrc ? <img src={currentTrack?.pictureSrc} alt="Album Art" /> : <Music size={40} />}
						</div>
						<div className="track-details">
							<Title order={2}>{currentTrack?.title || "No track selected"}</Title>
							{currentTrack?.title && (
								<>
									<Text size="md">{currentTrack?.artist || "Unknown Artist"}</Text>
									<Text size="sm" color="theme" style={{ marginLeft: "6px" }}>
										{currentTrack?.album || "Unknown Album"}
									</Text>
								</>
							)}
						</div>
					</div>
				</Card>

				{/* Progress Bar */}
				<div className="progress-section">
					<div className="time-display">
						<Text size="sm">{formatTime(currentTime)}</Text>
						<Text size="sm">{formatTime(duration)}</Text>
					</div>
					<Slider value={currentTime} setValue={handleSeek} min={0} max={duration} step={0.1} thick className="progress-slider" />
				</div>

				{/* Controls */}
				<div className="player-controls">
					<Button
						size="sm"
						onClick={toggleShuffle}
						variant={shuffle ? "filled" : "light"}
						icon={<Shuffle size={16} />}
						circular
					/>
					<Button
						variant="light"
						size="md"
						onClick={handlePrevious}
						disabled={!currentPlaylist || (currentTrackIndex === 0 && repeat === "none")}
						icon={<SkipBack size={18} />}
						circular
					/>

					<Button size="lg" onClick={handlePlayPause} circular icon={isPlaying ? <Pause size={24} /> : <Play size={24} />} />

					<Button
						variant="light"
						size="md"
						onClick={handleNext}
						disabled={!currentPlaylist || (currentTrackIndex === currentPlaylist.tracks.length - 1 && repeat === "none")}
						icon={<SkipForward size={18} />}
						circular
					/>

					<Button
						size="sm"
						onClick={toggleRepeat}
						variant={repeat !== "none" ? "filled" : "light"}
						icon={repeat === "one" ? <Repeat1 size={16} /> : <Repeat size={16} />}
						circular
					/>
				</div>

				{/* Volume Control */}
				<div className="volume-section">
					<Volume2 size={16} />
					<Slider value={volume} setValue={handleVolumeChange} min={0} max={1} step={0.01} className="volume-slider" />
				</div>

				{/* Playlist */}
				<Card className="playlist-card">
					<Title order={3}>Current Playlist</Title>
					<div className="playlist-tracks">
						{getDisplayOrder().map((displayIndex, displayPosition) => {
							const track = currentPlaylist!.tracks[displayIndex];
							const isActive = displayIndex === currentTrackIndex;

							return (
								<div
									key={track.fileName}
									className={`playlist-track ${isActive ? "active" : ""}`}
									onClick={() => {
										setCurrentTrackIndex(displayIndex);
										setCurrentTrack(track);
										setIsPlaying(true);
									}}
								>
									<div className="track-thumbnail">
										{track.pictureSrc ? <img src={track.pictureSrc} alt={`${track.title} album art`} /> : <Music size={16} />}
									</div>
									<div className="track-info-mini">
										<Text size="sm">{track.title}</Text>
										<Text size="sm" color="theme">
											{track.artist}
										</Text>
									</div>
									{shuffle && (
										<div className="shuffle-indicator">
											<Text size="sm" color="theme">
												{displayPosition + 1}
											</Text>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</Card>
			</Card>

			{/* Music Folder Modal */}
			<Modal isOpen={showPlaylistModal} onClose={() => setShowPlaylistModal(false)} title="Open Music Folder">
				<div className="playlist-modal-content">
					<div className="music-folder-section">
						<Text size="md" color="theme">
							Select a music folder to import your music files
						</Text>
						{!isWeb && (
							<FileBrowser
								currentDirectory={currentDirectory}
								isLoading={isLoading}
								entryList={entryList}
								onNavigate={handleNavigate}
								entryFilter={isDirectoryOrMusicFile}
								maxFileToShowCount={10}
								props={{
									content: { style: { maxHeight: 400, overflowY: "auto", padding: 8 } },
								}}
							/>
						)}
						<Button
							color="theme"
							size="md"
							onClick={isWeb ? handleOpenFolder : selectFolder}
							icon={<ListMusic size={16} />}
							disabled={isLoading}
						>
							{isLoading ? "Processing..." : isWeb ? "Choose Folder" : "Select Folder"}
						</Button>

						{isLoading && processingProgress.total > 0 && (
							<div className="processing-progress">
								<Text size="sm" color="white">
									Processing {processingProgress.current} of {processingProgress.total} files...
								</Text>
								<div className="progress-bar">
									<div
										className="progress-fill"
										style={{ width: `${(processingProgress.current / processingProgress.total) * 100}%` }}
									/>
								</div>
							</div>
						)}
					</div>
					<div className="current-folder-info">
						<Text size="sm" color="white">
							Current folder: {currentPlaylist?.name || "No folder selected"}
						</Text>
						{currentPlaylist && (
							<Text size="sm" color="white">
								{currentPlaylist.tracks.length} tracks loaded
							</Text>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
};
