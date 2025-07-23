import { cloneWithUpdate } from "@/utils/ISerializable";
import type { TypeOfStore } from "@/utils/Store";
import { store } from "@/utils/Store";

export const APP_TABS = ["Player", "Playlist", "Dashboard", "Danger Zone"] as const;
export type AppTab = (typeof APP_TABS)[number];

export const PLAYLIST_TABS = ["Songs", "Folders"] as const;
export type PlaylistTab = (typeof PLAYLIST_TABS)[number];

export type Song = {
	filename: string;
	title: string;
	artist: string;
	picture: Blob;
	skipCount: number;
	actionCount: number;
	folderList: string[]; // can have several or can be empty, if empty not considered in threshold deletion
};

export const appStore = store({
	currentTab: "Player" as AppTab,
	player: {
		currentSongFileName: "",
		isPlaying: false,
		currentSongTime: 0,
		isEndTimeAbsoluteDisplayed: false,
	},
	playlist: {
		currentTab: "Songs" as PlaylistTab,
		songFilter: "",
	},
	dashboard: {
		songFilter: "",
		isEditModeEnabled: false,
	},
	dangerZone: {
		threshold: 0.75,
		isShowBelowEnabled: false,
		isEditModeEnabled: false,
	},
	songList: [] as Song[],
	folderList: [] as string[], // folder path
});

export const useApp = () => appStore.use();

export type AppState = TypeOfStore<typeof appStore>;

export const setAppWithUpdate = (update: (app: AppState) => void) => appStore.setValue((prev) => cloneWithUpdate(prev, update));
