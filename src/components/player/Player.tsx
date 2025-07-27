import { actions } from "@/actions/actions";
import { displayArtistAlbum, formatTime } from "@/components/componentUtil";
import { Button, Title } from "@/components/ui";
import type { AppState } from "@/globalState";
import { currentAudio } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

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
		<Title order={3} text={player.currentSong.song?.title ?? "No song selected"} />
		<Title order={4} text={displayArtistAlbum(player.currentSong.song)} />
		<Vertical width={300} className="player-controls">
			<Horizontal justifyContent="space-between" className="time-display">
				<div>{formatTime(player.currentSong.currentTime)}</div>
				<div>{formatTime(isNaN(currentAudio.duration) ? 0 : currentAudio.duration)}</div>
			</Horizontal>
			<div className="progress-container">
				<div
					className="progress-bar"
					style={{ width: `${(player.currentSong.currentTime / (currentAudio.duration ?? 0)) * 100}%` }}
				></div>
			</div>
			<Horizontal justifyContent="center" style={{ gap: "16px", marginTop: "24px" }}>
				<Button
					icon={<SkipBack size={20} />}
					variant="filled"
					isCompact
					disabled={player.rollbackSongList.length === 1 && currentAudio.currentTime < 10}
					onClick={actions.player.song.previous}
				/>
				<Button
					icon={player.isPlaying ? <Pause size={20} /> : <Play size={20} />}
					variant="filled"
					isCompact
					onClick={actions.player.song.pressPlayFn(player.currentSong.song, player.currentSong.currentTime)}
				/>
				<Button icon={<SkipForward size={20} />} variant="filled" isCompact onClick={actions.player.song.next} />
			</Horizontal>
		</Vertical>
	</Vertical>
);
