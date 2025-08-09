export const APP_TABS = ["Player", "Playlist", "Dashboard", "Danger Zone"] as const;
export type AppTab = (typeof APP_TABS)[number];

export type Song = {
	filename: string;
	title: string;
	album: string;
	artist: string;
	picture: { data: number[]; type: string } | null;
	skipOdds: number;
	playOrSkipCount: number;
	isBanned: boolean; // if true, automatically skipped, increase playOrSkipCount but no change in skipOdds
};

export type Folder = {
	folderName: string; // name randomly generated
	songList: Song[];
};

export const LOCAL_STORAGE_KEY = "cleverMusicPlayer_globalState" as const;

export type LocalStorageState = {
	threshold: number;
	volume: number;
	isMuted: boolean;
};
export const loadLocalStorageState = (): LocalStorageState => {
	const storedLocalStorageState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}") as Partial<LocalStorageState>;

	return {
		threshold: storedLocalStorageState.threshold ?? 0.75,
		volume: storedLocalStorageState.volume ?? 1,
		isMuted: storedLocalStorageState.isMuted ?? false,
	};
};
const localStorageState = loadLocalStorageState();
export const localStorageStateStore = localStorageState;

export const appStore = {
	bShowNoFolderModal: false,
	currentTab: "Player" as AppTab,
	player: {
		currentSong: {
			song: null as Song | null,
			currentTime: 0,
			imgSrc: null as string | null,
			isConsideredAsPlayed: false,
		},
		isPlaying: false,
		isEndTimeAbsoluteDisplayed: false,
		rollbackSongList: [] as Song[], // storing the song to apply when rollback, max length is 10
		volume: localStorageState.volume,
		isMuted: localStorageState.isMuted,
	},
	playlist: {
		songFilter: "",
	},
	dashboard: {
		songFilter: "",
	},
	dangerZone: {
		threshold: localStorageState.threshold,
		bShowAboveModal: false,
		bShowDeleteModal: false,
		bShowResetModal: false,
	},
	folder: {
		isLoading: false,
		folderName: "",
		songList: [] as Song[],
	},
};

export const useApp = () => appStore;

export type AppState = typeof appStore;

export const setAppWithUpdate = (_update: (app: AppState) => void) => {};

export const folder = {
	folderHandle: null as FileSystemDirectoryHandle | null,
	folderInfoHandle: null as FileSystemFileHandle | null,
};

export const songFileMap = new Map<string, File>(); // filename -> songFileHandle

export const currentAudio = new Audio();
