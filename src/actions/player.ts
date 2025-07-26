import type { Song } from "@/globalState";
import { currentSong, setAppWithUpdate, songFileMap, songList } from "@/globalState";

const toggleIsEndTimeAbsoluteDisplayed = () =>
	setAppWithUpdate((app) => (app.player.isEndTimeAbsoluteDisplayed = !app.player.isEndTimeAbsoluteDisplayed));

const playSong = (song: Song, currentTime: number) => {
	const songFile = songFileMap.get(song.filename);
	if (!songFile) return;
	if (currentSong.audio) URL.revokeObjectURL(currentSong.audio.src);
	const audioSrc = URL.createObjectURL(songFile);
	currentSong.audio = new Audio(audioSrc);
	currentSong.audio.play();
	currentSong.audio.currentTime = currentTime;
	currentSong.audio.ontimeupdate = () =>
		setAppWithUpdate((app) => (app.player.currentSong.currentTime = currentSong.audio?.currentTime ?? 0));
	currentSong.audio.onended = () => {
		URL.revokeObjectURL(audioSrc);
	};
	setAppWithUpdate((app) => {
		app.player.currentSong.song = song;
		if (app.player.currentSong.imgSrc) URL.revokeObjectURL(app.player.currentSong.imgSrc);
		app.player.currentSong.imgSrc = song.picture ? URL.createObjectURL(song.picture) : null;
		app.player.isPlaying = true;
		app.player.rollbackSongList.push(song);
		if (app.player.rollbackSongList.length > 10) app.player.rollbackSongList.shift();
	});
};

const pauseSong = () => {
	currentSong.audio?.pause();
	setAppWithUpdate((app) => (app.player.isPlaying = false));
};

const resumeSong = () => {
	currentSong.audio?.play();
	setAppWithUpdate((app) => (app.player.isPlaying = true));
};

const pressPlayFn = (song: Song | null, currentTime: number) => () => {
	if (currentSong.audio) {
		if (currentSong.audio.paused) resumeSong();
		else pauseSong();
	} else {
		if (song) playSong(song, currentTime);
	}
};

const updateToRandom = () => {
	const randomSong = songList[Math.floor(Math.random() * songList.length)];
	const meanPlayOrSkipCount = songList.reduce((acc, song) => acc + song.playOrSkipCount, 0) / songList.length;
	if (randomSong) {
		if (randomSong.playOrSkipCount - 1 <= meanPlayOrSkipCount) {
			if (Math.random() < randomSong.skipOdds) {
				playSong(randomSong, 0);
			} else {
				// TODO: auto skip
				updateToRandom();
			}
		} else updateToRandom();
	}
};

export const player = {
	song: { play: playSong, pause: pauseSong, resume: resumeSong, pressPlayFn: pressPlayFn },
	currentSong: { updateToRandom: updateToRandom },
	isEndTimeAbsoluteDisplayed: { toggle: toggleIsEndTimeAbsoluteDisplayed },
};
