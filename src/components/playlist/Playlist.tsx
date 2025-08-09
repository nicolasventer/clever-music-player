import type { NewCurrentSong } from "@/appUtils";
import { displayArtistAlbum, displayTitle } from "@/components/componentUtil";
import { Button, SearchInput, Title } from "@/components/ui";
import type { Song } from "@/globalState";
import { TodoFn } from "@/utils/clientUtils";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Ban, FolderOpen, Music, Pause, Play, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";

type Playlist = {
	songFilter: {
		value: string;
		update: React.Dispatch<React.SetStateAction<string>>;
	};
	filteredSongList: Song[];
	currentSong: NewCurrentSong;
	isSongPlaying: boolean;
	isFolderLoading: boolean;
};

const PlaylistSongs = ({ playlist }: { playlist: Playlist }) => (
	<Vertical widthFull>
		<table>
			<thead>
				<tr>
					<th colSpan={2}>
						<Horizontal justifyContent="space-between">
							<Title order={3} icon={<Music size={20} />}>
								Songs
							</Title>
							<SearchInput
								value={playlist.songFilter.value}
								placeholder="Search songs..."
								setValue={playlist.songFilter.update}
							/>
						</Horizontal>
					</th>
				</tr>
			</thead>
			<tbody>
				{playlist.filteredSongList.length === 0 && (
					<tr>
						<td colSpan={2}>
							{playlist.isFolderLoading ? <Title order={5}>Loading songs...</Title> : <Title order={5}>No songs found</Title>}
						</td>
					</tr>
				)}
				{playlist.isFolderLoading && playlist.filteredSongList.length === 0
					? // Loading skeleton rows
					  Array.from({ length: 3 }).map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<tr key={`skeleton-${index}`}>
								<td>
									<div
										className="loading-skeleton"
										style={{ height: "20px", width: "60%", borderRadius: "4px", marginBottom: "4px" }}
									/>
									<div className="loading-skeleton" style={{ height: "16px", width: "40%", borderRadius: "4px" }} />
								</td>
								<td>
									<Horizontal gap={16} justifyContent="flex-end">
										<div className="loading-skeleton" style={{ height: "32px", width: "32px", borderRadius: "50%" }} />
										<div className="loading-skeleton" style={{ height: "32px", width: "32px", borderRadius: "50%" }} />
									</Horizontal>
								</td>
							</tr>
					  ))
					: playlist.filteredSongList.map((song, index) => (
							<tr key={song.filename} className="loading-fade-in">
								<td>
									<Title order={5}>{displayTitle(song)}</Title>
									<Title order={6}>{displayArtistAlbum(song)}</Title>
								</td>
								<td>
									<Horizontal gap={16} justifyContent="flex-end">
										{playlist.isSongPlaying && playlist.currentSong.song?.filename === song.filename ? (
											<Button icon={<Pause size={14} />} variant="filled" onClick={TodoFn("pause song")} />
										) : (
											<Button
												icon={<Play size={14} />}
												variant="filled"
												// onClick={actions.player.song.playFn(
												// 	song,
												// 	currentSong?.filename === song.filename ? currentAudio.currentTime : 0
												// )}
												onClick={TodoFn("play song")}
											/>
										)}

										<Button
											icon={<Ban size={14} />}
											variant={song.isBanned ? "filled" : "light"}
											color="danger"
											onClick={TodoFn("ban song " + index)}
										/>
									</Horizontal>
								</td>
							</tr>
					  ))}
				{/* <tr>
					<th className="table-header-alphabet" colSpan={2}>
						A
					</th>
				</tr> */}
			</tbody>
			<tfoot>
				<tr>
					<th colSpan={2} className="table-footer">
						📊 Total: {playlist.filteredSongList.length} songs, 2h35
					</th>
				</tr>
			</tfoot>
		</table>
	</Vertical>
);

const PlaylistDisplay = ({ playlist }: { playlist: Playlist }) => (
	<Vertical heightFull widthFull alignItems="center" margin="auto" padding="0 24px" style={{ maxWidth: 800 }}>
		<Horizontal justifyContent="space-between" gap={16} widthFull marginTop={12}>
			<Button
				icon={<RefreshCw size={16} />}
				variant="light"
				onClick={TodoFn("refresh song list")}
				isLoading={playlist.isFolderLoading}
			>
				Refresh
			</Button>
			<Button
				icon={<FolderOpen size={16} />}
				variant="filled"
				onClick={TodoFn("open folder")}
				isLoading={playlist.isFolderLoading}
			>
				Open Folder
			</Button>
		</Horizontal>
		<PlaylistSongs playlist={playlist} />
	</Vertical>
);

export type PlaylistProps = {
	currentSong: NewCurrentSong;
	songList: Song[];
	isSongPlaying: boolean;
	isFolderLoading: boolean;
};

export const Playlist = ({ songList, ...playlistProps }: PlaylistProps) => {
	const [songFilter, setSongFilter] = useState("");
	const filteredSongList = useMemo(
		() => songList.filter((song) => song.title.toLowerCase().includes(songFilter.toLowerCase())),
		[songFilter, songList]
	);

	const playlist = useMemo(
		() => ({
			...playlistProps,
			songFilter: { value: songFilter, update: setSongFilter },
			filteredSongList,
		}),
		[filteredSongList, playlistProps, songFilter]
	);

	return <PlaylistDisplay playlist={playlist} />;
};
