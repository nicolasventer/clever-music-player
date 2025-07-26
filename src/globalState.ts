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
	album: string;
	artist: string;
	picture: Blob;
	skipOdds: number;
	playOrSkipCount: number;
	isBanned: boolean; // if true, automatically skipped, increase playOrSkipCount but no change in skipOdds
};

export type Folder = {
	folderName: string; // name randomly generated
	songList: Song[];
};

export const appStore = store({
	bShowNoFolderModal: false,
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
	},
	dangerZone: {
		threshold: 0.75,
		isShowBelowEnabled: false,
	},
	folderList: [] as Folder[],
});

export const useApp = () => appStore.use();

export type AppState = TypeOfStore<typeof appStore>;

export const setAppWithUpdate = (update: (app: AppState) => void) => appStore.setValue((prev) => cloneWithUpdate(prev, update));

export const folderInfoHandleMap = new Map<string, FileSystemFileHandle>();
