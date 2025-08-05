import { displayArtistAlbum, formatTime } from "@/components/componentUtil";
import { KeyboardShortcuts } from "@/components/player/KeyboardShortcuts";
import { Button, Slider, Text, Title } from "@/components/ui";
import type { AppState, Song } from "@/globalState";
import { currentAudio } from "@/globalState";
import { TodoFn } from "@/utils/clientUtils";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { useKeyboardShortcuts } from "@/utils/useKeyboardShortcuts";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useMemo, useState } from "react";

type Player = {
	isEndTimeAbsoluteDisplayed: {
		value: boolean;
		toggle: () => void;
	};
	volume: {
		value: number;
		update: (value: number) => void;
	};
	isMuted: {
		value: boolean;
		toggle: () => void;
	};
	currentSong: {
		song: Song | null;
		currentTime: number;
		imgSrc: string | null;
		isConsideredAsPlayed: boolean;
	} & {
		rollbackSongListLength: number;
		isPlaying: boolean;
	};
};

const PlayerDisplay = ({ player }: { player: Player }) => (
	<Vertical alignItems="center" flexGrow>
		<div className="player-container">
			<img
				src={
					player.currentSong.imgSrc ??
					"https://fastly.picsum.photos/id/830/300/300.jpg?hmac=ir_VjfhHplWelY0wWwUlqdRl_N4KTR-caNJPFMUz2r8"
				}
				alt="cover"
			/>
		</div>
		<Title order={3}>{player.currentSong.song?.title ?? "No song selected"}</Title>
		<Title order={4}>{displayArtistAlbum(player.currentSong.song)}</Title>
		<Vertical width={300} gap={16} marginTop={16}>
			<Vertical gap={6}>
				<Horizontal justifyContent="space-between">
					<Text size="small">{formatTime(player.currentSong.currentTime)}</Text>
					<Text size="small" onClick={player.isEndTimeAbsoluteDisplayed.toggle}>
						{isNaN(currentAudio.duration)
							? formatTime(0)
							: player.isEndTimeAbsoluteDisplayed
							? formatTime(currentAudio.duration)
							: `-${formatTime(currentAudio.duration - player.currentSong.currentTime)}`}
					</Text>
				</Horizontal>
				<Slider
					value={isNaN(currentAudio.duration) ? 0 : (player.currentSong.currentTime / currentAudio.duration) * 100}
					step={0.05}
					onChange={TodoFn("update current time")}
					thick
				/>
			</Vertical>
			<Horizontal justifyContent="center" gap={16}>
				<div>
					<Button
						icon={player.isMuted.value ? <VolumeX size={16} /> : <Volume2 size={16} />}
						circular
						onClick={player.isMuted.toggle}
					/>
				</div>
				<Slider value={player.volume.value} setValue={player.volume.update} />
			</Horizontal>
			<Horizontal justifyContent="center" gap={16}>
				<Button
					icon={<SkipBack size={20} />}
					circular
					disabled={player.currentSong.rollbackSongListLength === 1 && currentAudio.currentTime < 10}
					onClick={TodoFn("previous song")}
					size="large"
				/>
				<Button
					icon={player.currentSong.isPlaying ? <Pause size={20} /> : <Play size={20} />}
					circular
					onClick={TodoFn("press play button")}
					size="large"
				/>
				<Button icon={<SkipForward size={20} />} circular onClick={TodoFn("next song")} size="large" />
			</Horizontal>
		</Vertical>
		<KeyboardShortcuts />
	</Vertical>
);

export type PlayerProps = {
	currentSong: AppState["player"]["currentSong"] & { rollbackSongListLength: number; isPlaying: boolean };
};

export const Player = ({ currentSong }: PlayerProps) => {
	// shortcuts are available only on the player page
	useKeyboardShortcuts();

	const [isEndTimeAbsoluteDisplayed, setIsEndTimeAbsoluteDisplayed] = useState(false);
	const toggleIsEndTimeAbsoluteDisplayed = () => setIsEndTimeAbsoluteDisplayed((prev) => !prev);

	const [volume, setVolume] = useState(0.5);
	const updateVolume = (value: number) =>
		setVolume(() => {
			currentAudio.volume = value / 100;
			return value;
		});

	const [isMuted, setIsMuted] = useState(false);
	const toggleIsMuted = () => setIsMuted((prev) => (currentAudio.muted = !prev));

	const player = useMemo(
		() => ({
			isEndTimeAbsoluteDisplayed: { value: isEndTimeAbsoluteDisplayed, toggle: toggleIsEndTimeAbsoluteDisplayed },
			volume: { value: volume, update: updateVolume },
			isMuted: { value: isMuted, toggle: toggleIsMuted },
			currentSong,
		}),
		[currentSong, isEndTimeAbsoluteDisplayed, isMuted, volume]
	);

	return <PlayerDisplay player={player} />;
};
