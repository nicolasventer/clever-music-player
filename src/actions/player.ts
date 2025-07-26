import { getRandomSong, playAudio, playSong } from "@/actions/songUtil";
import type { Song } from "@/globalState";
import { appStore, currentAudio, setAppWithUpdate } from "@/globalState";

const toggleIsEndTimeAbsoluteDisplayed = () =>
	setAppWithUpdate((app) => (app.player.isEndTimeAbsoluteDisplayed = !app.player.isEndTimeAbsoluteDisplayed));

const playSongFn = (song: Song, currentTime: number) => () => {
	setAppWithUpdate((app) => playSong(app, song));
	playAudio(song, currentTime);
};

const pauseSong = () => currentAudio.pause();

const _resumeSong = () => currentAudio.play();

const pressPlayFn = (song: Song | null, currentTime: number) => () => {
	if (currentAudio.src) {
		if (currentAudio.paused) _resumeSong();
		else pauseSong();
	} else {
		if (song) {
			setAppWithUpdate((app) => {
				playSong(app, song);
			});
			playAudio(song, currentTime);
		}
	}
};

const nextSong = () => {
	// TODO: update skipOdds of current song
	const randomSong = getRandomSong(appStore.value.songList);
	setAppWithUpdate((app) => playSong(app, randomSong));
	playAudio(randomSong, 0);
};

const previousSong = () => {
	// TODO: update skipOdds of current song
	if (currentAudio.currentTime > 10) {
		currentAudio.currentTime = 0;
		return;
	}
	const rollbackSongList = appStore.value.player.rollbackSongList;
	if (rollbackSongList.length === 1) return;
	const previousSong = rollbackSongList[rollbackSongList.length - 2];
	// TODO: fix rollbackSongList
	console.log(`rollbackSongList.length: ${rollbackSongList.length}`);
	setAppWithUpdate((app) => {
		playSong(app, previousSong);
		// app.player.rollbackSongList.length = rollbackSongList.length - 2;
	});
	playAudio(previousSong, 0);
};

export const player = {
	song: { pressPlayFn: pressPlayFn, playFn: playSongFn, pause: pauseSong, next: nextSong, previous: previousSong },
	isEndTimeAbsoluteDisplayed: { toggle: toggleIsEndTimeAbsoluteDisplayed },
};
