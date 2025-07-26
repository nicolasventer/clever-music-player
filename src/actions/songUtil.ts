import type { AppState, Song } from "@/globalState";
import { currentAudio, songFileMap } from "@/globalState";

export const getRandomSong = (songList: Song[]) => {
	// TODO: better get random song
	const randomSong = songList[Math.floor(Math.random() * songList.length)];
	return randomSong;
};

// must be called inside setAppWithUpdate
export const playSong = (app: AppState, song: Song) => {
	app.player.currentSong.song = song;
	if (app.player.currentSong.imgSrc) URL.revokeObjectURL(app.player.currentSong.imgSrc);
	app.player.currentSong.imgSrc = song.picture ? URL.createObjectURL(song.picture) : null;
	app.player.rollbackSongList.push({ ...song });
	if (app.player.rollbackSongList.length > 10) app.player.rollbackSongList.shift();
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
