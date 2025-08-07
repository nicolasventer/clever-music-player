import { actions } from "@/actions/actions";
import { writeFolderInfo } from "@/actions/utils/folderInfoUtil";
import { updateSongSkipOdds } from "@/actions/utils/songUtil";
import { cloneWithUpdate } from "@/utils/ISerializable";
import type { TypeOfStore } from "@/utils/Store";
import { store } from "@/utils/Store";

export const APP_TABS = ["Player", "Playlist", "Dashboard", "Danger Zone"] as const;
export type AppTab = (typeof APP_TABS)[number];

export type Song = {
	filename: string;
	title: string;
	album: string;
	artist: string;
	songSrc: string; // URL.createObjectURL(songFile)
	pictureSrc: string | null; // URL.createObjectURL(picture)
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
export const localStorageStateStore = store(localStorageState);

export const appStore = store({
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
		rollbackSongList: [] as Song[], // storing the song to apply when rollback
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
		loadedCount: 0,
		totalToLoadCount: 0,
		folderName: "",
		songList: [] as Song[],
	},
});

export const useApp = () => appStore.use();

export type AppState = TypeOfStore<typeof appStore>;

export const setAppWithUpdate = (update: (app: AppState) => void) => appStore.setValue((prev) => cloneWithUpdate(prev, update));

export const folder = {
	folderHandle: null as FileSystemDirectoryHandle | null,
	folderInfoHandle: null as FileSystemFileHandle | null,
};

export const currentAudio = new Audio();
currentAudio.volume = localStorageState.volume / 100;
currentAudio.muted = localStorageState.isMuted;
currentAudio.ontimeupdate = () => {
	let justBeenPlayed = false;
	setAppWithUpdate((app) => {
		app.player.currentSong.currentTime = currentAudio.currentTime;
		if (app.player.currentSong.isConsideredAsPlayed || app.player.currentSong.currentTime < 60) return;
		app.player.currentSong.isConsideredAsPlayed = true;
		justBeenPlayed = true;
		app.folder.songList = app.folder.songList.map((song) =>
			song.filename === app.player.currentSong.song?.filename ? updateSongSkipOdds(song, "play") : song
		);
	});
	if (justBeenPlayed) writeFolderInfo();
};
currentAudio.onended = () => actions.player.song.next();
currentAudio.onplaying = () => setAppWithUpdate((app) => (app.player.isPlaying = true));
currentAudio.onpause = () => setAppWithUpdate((app) => (app.player.isPlaying = false));
