import { setAppWithUpdate } from "@/globalState";

const updateCurrentSongFileName = (fileName: string) => setAppWithUpdate((app) => (app.player.currentSongFileName = fileName));

const toggleIsPlaying = () => setAppWithUpdate((app) => (app.player.isPlaying = !app.player.isPlaying));

const updateCurrentSongTime = (time: number) => setAppWithUpdate((app) => (app.player.currentSongTime = time));

const toggleIsEndTimeAbsoluteDisplayed = () =>
	setAppWithUpdate((app) => (app.player.isEndTimeAbsoluteDisplayed = !app.player.isEndTimeAbsoluteDisplayed));

export const player = {
	currentSongFileName: { update: updateCurrentSongFileName },
	isPlaying: { toggle: toggleIsPlaying },
	currentSongTime: { update: updateCurrentSongTime },
	isEndTimeAbsoluteDisplayed: { toggle: toggleIsEndTimeAbsoluteDisplayed },
};
