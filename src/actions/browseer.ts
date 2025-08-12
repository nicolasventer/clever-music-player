import { FOLDER_INFO_FILE_NAME, isMusicFile } from "@/actions/utils/fileUtil";
import { writeFolderInfo } from "@/actions/utils/folderInfoUtil";
import { getRandomSong, playAudio, playSong } from "@/actions/utils/songUtil";
import type { Entry } from "@/components/ui";
import type { Folder, Song } from "@/globalState";
import { appStore, folder, setAppWithUpdate } from "@/globalState";
import type fs from "fs";
import { parseBuffer } from "music-metadata";
import path from "path-browserify-esm";

declare global {
	interface Window {
		fs: typeof fs;
	}
}

const updateCurrentDirectory = (currentDirectory: string) => {
	try {
		setAppWithUpdate((prev) => (prev.browser.isLoading = true));
		const data = window.fs.readdirSync(currentDirectory, { withFileTypes: true });
		const entryList: Entry[] = data
			.filter((item) => item.isDirectory() || isMusicFile(item.name))
			.map((item) => ({
				baseName: item.name,
				path: path.join(currentDirectory, item.name),
			}));
		setAppWithUpdate((prev) => {
			prev.browser.isLoading = false;
			prev.browser.entryList = entryList;
			prev.browser.currentDirectory = currentDirectory;
		});
	} catch (err) {
		console.log(err);
		setAppWithUpdate((prev) => (prev.browser.isLoading = false));
	}
};

const nativeGetFolderInfo = (selectedFolder: string) => {
	try {
		const folderInfoFileContent = window.fs.readFileSync(path.join(selectedFolder, FOLDER_INFO_FILE_NAME), "utf-8");
		return JSON.parse(folderInfoFileContent) as Folder;
	} catch {
		return null;
	}
};

const selectFolderFn = (selectedFolder: string) => async () => {
	try {
		setAppWithUpdate((prev) => {
			prev.folder.isLoading = true;
			prev.bShowAddMusicFolderModal = false;
			prev.bShowNoFolderModal = true;
		});
		for (const song of appStore.value.folder.songList) {
			URL.revokeObjectURL(song.songSrc);
			if (song.pictureSrc) URL.revokeObjectURL(song.pictureSrc);
		}

		const folderInfo = await nativeGetFolderInfo(selectedFolder);
		const fileMap = new Map<string, Song>();
		folderInfo?.songList.forEach((song) => fileMap.set(song.filename, song));

		const newFolderInfo: Folder = { folderName: folderInfo?.folderName ?? selectedFolder, songList: [] };

		const data = window.fs.readdirSync(selectedFolder, { withFileTypes: true });
		const musicFiles = data.filter((item) => item.isFile() && isMusicFile(item.name));
		setAppWithUpdate((app) => (app.folder.totalToLoadCount = musicFiles.length));

		await Promise.all(
			musicFiles.map(async (item) => {
				const fileContent = window.fs.readFileSync(path.join(selectedFolder, item.name));
				const file = new Uint8Array(fileContent);
				const metadata = await parseBuffer(fileContent);

				const filename = path.join(selectedFolder, item.name);
				const song = fileMap.get(filename);

				newFolderInfo.songList.push({
					title: metadata.common.title ?? "",
					album: metadata.common.album ?? "",
					artist: metadata.common.artist?.replace(/\\\\/g, "; ") ?? "",
					filename,
					songSrc: URL.createObjectURL(new Blob([file])),
					pictureSrc: metadata.common.picture?.[0]
						? URL.createObjectURL(
								new Blob([new Uint8Array(metadata.common.picture[0].data)], { type: metadata.common.picture[0].format })
						  )
						: null,
					skipOdds: song?.skipOdds ?? 0,
					playOrSkipCount: song?.playOrSkipCount ?? 0,
					isBanned: song?.isBanned ?? false,
				});
				setAppWithUpdate((app) => (app.folder.loadedCount = newFolderInfo.songList.length));
			})
		);

		folder.folderHandle = null;
		folder.folderInfoHandle = null;

		if (newFolderInfo.songList.length === 0) {
			setAppWithUpdate((app) => (app.bShowNoFolderModal = true));
			return;
		}
		const { randomSong, newSongList } = getRandomSong(newFolderInfo.songList);
		setAppWithUpdate((app) => {
			app.bShowNoFolderModal = false;
			app.bShowAddMusicFolderModal = false;
			app.folder.isLoading = false;
			app.folder.folderName = newFolderInfo.folderName;
			if (newSongList !== app.folder.songList) app.folder.songList = newSongList;
			playSong(app, randomSong);
		});
		playAudio(randomSong, 0);
		writeFolderInfo();
	} catch (err) {
		console.log(err);
		setAppWithUpdate((prev) => (prev.folder.isLoading = false));
	}
};

export const browser = {
	currentDirectory: { update: updateCurrentDirectory },
	folder: { selectFn: selectFolderFn },
};
