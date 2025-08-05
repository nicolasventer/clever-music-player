import type { AppTab } from "@/globalState";
import { setAppWithUpdate } from "@/globalState";

const updateCurrentTab = (tab: AppTab) => setAppWithUpdate((prev) => (prev.currentTab = tab));

const openNoFolderModal = () => setAppWithUpdate((prev) => (prev.bShowNoFolderModal = true));

const closeNoFolderModal = () => setAppWithUpdate((prev) => (prev.bShowNoFolderModal = false));

export const app = {
	currentTab: {
		update: updateCurrentTab,
	},
	noFolderModal: {
		open: openNoFolderModal,
		close: closeNoFolderModal,
	},
};
