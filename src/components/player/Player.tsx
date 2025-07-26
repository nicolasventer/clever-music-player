import { actions } from "@/actions/actions";
import { Button, Title } from "@/components/ui";
import { currentSong, type AppState } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const Player = ({ player }: { player: AppState["player"] }) => (
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
		<Title order={3} text="🎶 Bohemian Rhapsody" />
		<Title order={4} text="👤 Queen • A Night at the Opera" />
		<Vertical width={300} className="player-controls">
			<Horizontal justifyContent="space-between" className="time-display">
				<div>{formatTime(player.currentSong.currentTime)}</div>
				<div>{formatTime(currentSong.audio?.duration ?? 0)}</div>
			</Horizontal>
			<div className="progress-container">
				<div
					className="progress-bar"
					style={{ width: `${(player.currentSong.currentTime / (currentSong.audio?.duration ?? 0)) * 100}%` }}
				></div>
			</div>
			<Horizontal justifyContent="center" style={{ gap: "16px", marginTop: "24px" }}>
				<Button icon={<SkipBack size={20} />} variant="filled" isCompact />
				<Button
					icon={player.isPlaying ? <Pause size={20} /> : <Play size={20} />}
					variant="filled"
					isCompact
					onClick={actions.player.song.pressPlayFn(player.currentSong.song, player.currentSong.currentTime)}
				/>
				<Button icon={<SkipForward size={20} />} variant="filled" isCompact />
			</Horizontal>
		</Vertical>
	</Vertical>
);
