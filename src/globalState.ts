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
	picture: Blob | null;
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
		currentSong: {
			song: null as Song | null,
			currentTime: 0,
			imgSrc: null as string | null,
		},
		isPlaying: false,
		isEndTimeAbsoluteDisplayed: false,
		rollbackSongList: [] as Song[], // storing the song to apply when rollback, max length is 10
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

export const folderHandleMap = new Map<string, FileSystemDirectoryHandle>(); // folderName -> folderHandle

export const folderInfoHandleMap = new Map<string, FileSystemFileHandle>(); // folderName -> folderInfoFileHandle

export const songFileMap = new Map<string, File>(); // filename -> songFileHandle

export const currentSong = {
	audio: null as HTMLAudioElement | null,
};

export type SongId = {
	folderIndex: number;
	songIndex: number;
};

export const songIdListMap = new Map<string, SongId[]>();
export const songList: Song[] = [];
