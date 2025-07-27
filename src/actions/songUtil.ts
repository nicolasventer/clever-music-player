import type { AppState, Song } from "@/globalState";
import { currentAudio, songFileMap } from "@/globalState";

export const getRandomSong = (songList: Song[]) => {
	// TODO: better get random song
	const randomSong = songList[Math.floor(Math.random() * songList.length)];
	return randomSong;
};

// must be called inside setAppWithUpdate
export const playSong = (app: AppState, song: Song, bBack: boolean = false) => {
	app.player.currentSong.song = song;
	app.player.currentSong.isConsideredAsPlayed = false;
	if (app.player.currentSong.imgSrc) URL.revokeObjectURL(app.player.currentSong.imgSrc);
	const blob = song.picture ? new Blob([new Uint8Array(song.picture.data)], { type: song.picture.type }) : null;
	app.player.currentSong.imgSrc = blob ? URL.createObjectURL(blob) : null;
	if (bBack) app.folder.songList = app.folder.songList.map((s) => (s.filename === song.filename ? song : s));
	else app.player.rollbackSongList.push({ ...song });
};

// must be called outside setAppWithUpdate
export const playAudio = (song: Song, currentTime: number) => {
	const songFile = songFileMap.get(song.filename);
	if (!songFile) return;
	if (currentAudio.src) URL.revokeObjectURL(currentAudio.src);
	const audioSrc = URL.createObjectURL(songFile);
	currentAudio.src = audioSrc;
	currentAudio.play();
	currentAudio.currentTime = currentTime;
};

export type OddsUpdateType = "play" | "skip" | "auto-skip";

export const updateSongSkipOdds = (song: Song, updateType: OddsUpdateType) => ({
	...song,
	skipOdds:
		updateType === "play"
			? Math.max(0, song.skipOdds - 0.1)
			: updateType === "skip"
			? Math.min(1, song.skipOdds + 0.2)
			: Math.max(0, song.skipOdds - 0.08 + song.skipOdds * 0.05),
	playOrSkipCount: song.playOrSkipCount + 1,
});
