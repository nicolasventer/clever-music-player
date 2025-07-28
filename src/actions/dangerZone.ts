import { writeFolderInfo } from "@/actions/utils/folderInfoUtil";
import type { Song } from "@/globalState";
import { currentAudio, folder, setAppWithUpdate } from "@/globalState";

const updateThreshold = (threshold: number) => setAppWithUpdate((app) => (app.dangerZone.threshold = threshold));

const openAboveModal = () => setAppWithUpdate((app) => (app.dangerZone.bShowAboveModal = true));

const closeAboveModal = () => setAppWithUpdate((app) => (app.dangerZone.bShowAboveModal = false));

const openDeleteModal = () => setAppWithUpdate((app) => (app.dangerZone.bShowDeleteModal = true));

const closeDeleteModal = () => setAppWithUpdate((app) => (app.dangerZone.bShowDeleteModal = false));

const openResetModal = () => setAppWithUpdate((app) => (app.dangerZone.bShowResetModal = true));

const closeResetModal = () => setAppWithUpdate((app) => (app.dangerZone.bShowResetModal = false));

const deleteSongsFn = (songs: Song[]) => () => {
	songs.forEach((song) => folder.folderHandle?.removeEntry(song.filename));
	setAppWithUpdate((app) => {
		app.folder.songList = app.folder.songList.filter((song) => !songs.some((s) => s.filename === song.filename));
		if (songs.some((s) => s.filename === app.player.currentSong.song?.filename)) {
			app.player.currentSong.song = null;
			if (app.player.currentSong.imgSrc) URL.revokeObjectURL(app.player.currentSong.imgSrc);
			app.player.currentSong.imgSrc = "";
			currentAudio.src = "";
			currentAudio.currentTime = 0;
		}
	});
	writeFolderInfo();
};

const resetAll = () => {
	setAppWithUpdate((app) =>
		app.folder.songList.forEach((song) => {
			song.playOrSkipCount = 0;
			song.skipOdds = 0;
		})
	);
	writeFolderInfo();
};

export const dangerZone = {
	threshold: { update: updateThreshold },
	aboveModal: { open: openAboveModal, close: closeAboveModal },
	deleteModal: { open: openDeleteModal, close: closeDeleteModal },
	resetModal: { open: openResetModal, close: closeResetModal },
	songs: { deleteFn: deleteSongsFn },
	resetAll: resetAll,
};
