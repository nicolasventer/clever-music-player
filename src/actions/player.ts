import { getRandomSong, playAudio, playSong } from "@/actions/songUtil";
import type { Song } from "@/globalState";
import { appStore, currentAudio, setAppWithUpdate } from "@/globalState";

const toggleIsEndTimeAbsoluteDisplayed = () =>
	setAppWithUpdate((app) => (app.player.isEndTimeAbsoluteDisplayed = !app.player.isEndTimeAbsoluteDisplayed));

const _pauseSong = () => currentAudio.pause();

const _resumeSong = () => currentAudio.play();

const pressPlayFn = (song: Song | null, currentTime: number) => () => {
	if (currentAudio.src) {
		if (currentAudio.paused) _resumeSong();
		else _pauseSong();
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

export const player = {
	song: { pressPlayFn: pressPlayFn, nextSong: nextSong },
	isEndTimeAbsoluteDisplayed: { toggle: toggleIsEndTimeAbsoluteDisplayed },
};
