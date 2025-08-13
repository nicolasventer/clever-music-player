import { actions } from "@/actions/actions";
import type { AppTab } from "@/globalState";
import { setAppWithUpdate } from "@/globalState";

const updateCurrentTab = (tab: AppTab) => setAppWithUpdate((prev) => (prev.currentTab = tab));

const openNoFolderModal = () => setAppWithUpdate((prev) => (prev.bShowNoFolderModal = true));

const closeNoFolderModal = () => setAppWithUpdate((prev) => (prev.bShowNoFolderModal = false));

const _openAddMusicFolderModal = () =>
	setAppWithUpdate((prev) => {
		prev.bShowNoFolderModal = false;
		prev.bShowAddMusicFolderModal = true;
	});

const closeAddMusicFolderModal = () => setAppWithUpdate((prev) => (prev.bShowAddMusicFolderModal = false));

const addMusicFolder = () => {
	try {
		if (window.fs !== undefined) _openAddMusicFolderModal();
		else actions.playlist.folder.handleOpen();
	} catch {
		console.log("Failed to use filesystem, browser mode");
		actions.playlist.folder.handleOpen();
	}
};

export const app = {
	currentTab: {
		update: updateCurrentTab,
	},
	noFolderModal: {
		open: openNoFolderModal,
		close: closeNoFolderModal,
	},
	addMusicFolder: addMusicFolder,
	addMusicFolderModal: {
		close: closeAddMusicFolderModal,
	},
};
