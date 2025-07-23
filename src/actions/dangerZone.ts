import { setAppWithUpdate } from "@/globalState";

const updateThreshold = (threshold: number) => setAppWithUpdate((app) => (app.dangerZone.threshold = threshold));

const toggleIsShowBelowEnabled = () =>
	setAppWithUpdate((app) => (app.dangerZone.isShowBelowEnabled = !app.dangerZone.isShowBelowEnabled));

const startEditMode = () => setAppWithUpdate((app) => (app.dangerZone.editedSongList = app.songList));

const cancelEditMode = () => setAppWithUpdate((app) => (app.dangerZone.editedSongList = null));

const saveEditMode = () =>
	setAppWithUpdate((app) => {
		if (app.dangerZone.editedSongList) app.songList = app.dangerZone.editedSongList;
		app.dangerZone.editedSongList = null;
	});

export const dangerZone = {
	threshold: { update: updateThreshold },
	isShowBelowEnabled: { toggle: toggleIsShowBelowEnabled },
	editMode: { start: startEditMode, cancel: cancelEditMode, save: saveEditMode },
};
