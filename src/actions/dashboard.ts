import { setAppWithUpdate } from "@/globalState";

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.dashboard.songFilter = filter));

const startEditMode = () => setAppWithUpdate((app) => (app.dashboard.editedSongList = app.songList));

const cancelEditMode = () => setAppWithUpdate((app) => (app.dashboard.editedSongList = null));

const saveEditMode = () =>
	setAppWithUpdate((app) => {
		if (app.dashboard.editedSongList) app.songList = app.dashboard.editedSongList;
		app.dashboard.editedSongList = null;
	});

export const dashboard = {
	songFilter: { update: updateSongFilter },
	editMode: { start: startEditMode, cancel: cancelEditMode, save: saveEditMode },
};
