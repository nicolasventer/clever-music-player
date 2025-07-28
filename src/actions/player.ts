import { writeFolderInfo } from "@/actions/utils/folderInfoUtil";
import { getRandomSong, playAudio, playSong, updateSongSkipOdds } from "@/actions/utils/songUtil";
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
			setAppWithUpdate((app) => playSong(app, song));
			playAudio(song, currentTime);
		}
	}
};

const nextSong = () => {
	const { randomSong, newSongList } = getRandomSong(appStore.value.folder.songList);
	setAppWithUpdate((app) => {
		if (!app.player.currentSong.isConsideredAsPlayed)
			app.folder.songList = newSongList.map((song) =>
				song.filename === app.player.currentSong.song?.filename ? updateSongSkipOdds(song, "skip") : song
			);
		else if (newSongList !== app.folder.songList) app.folder.songList = newSongList;
		playSong(app, randomSong);
	});
	writeFolderInfo();
	playAudio(randomSong, 0);
};

const previousSong = () => {
	if (currentAudio.currentTime > 10) {
		currentAudio.currentTime = 0;
		return;
	}
	const rollbackSongList = appStore.value.player.rollbackSongList;
	if (rollbackSongList.length === 1) return;
	const previousSong = rollbackSongList[rollbackSongList.length - 2];
	setAppWithUpdate((app) => {
		app.player.rollbackSongList.length = rollbackSongList.length - 1;
		playSong(app, previousSong, true);
	});
	writeFolderInfo();
	playAudio(previousSong, 0);
};

const updateVolume = (volume: number) => {
	setAppWithUpdate((app) => (app.player.volume = volume));
	currentAudio.volume = volume / 100;
};

const updateCurrentTime = (percentage: number) => {
	const newTime = (percentage * (currentAudio.duration ?? 0)) / 100;
	setAppWithUpdate((app) => (app.player.currentSong.currentTime = newTime));
	currentAudio.currentTime = newTime;
};

export const player = {
	song: { pressPlayFn: pressPlayFn, playFn: playSongFn, pause: pauseSong, next: nextSong, previous: previousSong },
	isEndTimeAbsoluteDisplayed: { toggle: toggleIsEndTimeAbsoluteDisplayed },
	volume: { update: updateVolume },
	currentTime: { update: updateCurrentTime },
};
