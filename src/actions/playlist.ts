import { getFilesRecursively, getFolderInfo, getFolderInfoFile, isMusicFile } from "@/actions/utils/fileUtil";
import { writeFolderInfo } from "@/actions/utils/folderInfoUtil";
import { getRandomSong, playAudio, playSong } from "@/actions/utils/songUtil";
import type { Folder, Song } from "@/globalState";
import { appStore, folder, setAppWithUpdate } from "@/globalState";
import randomName from "@scaleway/random-name";
import { parseBuffer } from "music-metadata";

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.playlist.songFilter = filter));

const toggleSongIsBannedFn = (index: number) => () =>
	setAppWithUpdate((app) => (app.folder.songList[index].isBanned = !app.folder.songList[index].isBanned));

const openFolder = async (dirHandle: FileSystemDirectoryHandle, bRecursive: boolean) => {
	try {
		setAppWithUpdate((app) => (app.folder.isLoading = true));
		for (const song of appStore.value.folder.songList) {
			URL.revokeObjectURL(song.songSrc);
			if (song.pictureSrc) URL.revokeObjectURL(song.pictureSrc);
		}

		const folderInfoHandle = await getFolderInfoFile(dirHandle);
		const folderInfo = await getFolderInfo(folderInfoHandle);
		const fileMap = new Map<string, Song>();
		folderInfo?.songList.forEach((song) => fileMap.set(song.filename, song));

		const newFolderInfo: Folder = { folderName: folderInfo?.folderName ?? randomName(), songList: [] };

		const musicFiles: FileSystemFileHandle[] = [];
		for await (const fileHandle of getFilesRecursively(dirHandle, isMusicFile, bRecursive)) {
			musicFiles.push(fileHandle);
			setAppWithUpdate((app) => (app.folder.totalToLoadCount = musicFiles.length));
		}

		await Promise.all(
			musicFiles.map(async (fileHandle) => {
				const file = await fileHandle.getFile();
				const arrayBuffer = await file.arrayBuffer();
				const metadata = await parseBuffer(new Uint8Array(arrayBuffer));

				const filename = fileHandle.name;
				const song = fileMap.get(filename);

				newFolderInfo.songList.push({
					title: metadata.common.title ?? "",
					album: metadata.common.album ?? "",
					artist: metadata.common.artist?.replace(/\\\\/g, "; ") ?? "",
					filename,
					songSrc: URL.createObjectURL(file),
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

		folder.folderHandle = dirHandle;
		folder.folderInfoHandle = folderInfoHandle;

		if (newFolderInfo.songList.length === 0) {
			setAppWithUpdate((app) => (app.bShowNoFolderModal = true));
			return;
		}
		const { randomSong, newSongList } = getRandomSong(newFolderInfo.songList);
		setAppWithUpdate((app) => {
			app.bShowNoFolderModal = false;
			app.folder.isLoading = false;
			app.folder.folderName = newFolderInfo.folderName;
			if (newSongList !== app.folder.songList) app.folder.songList = newSongList;
			playSong(app, randomSong);
		});
		playAudio(randomSong, 0);
		writeFolderInfo();
	} catch (e) {
		console.error(e);
	} finally {
		setAppWithUpdate((app) => (app.folder.isLoading = false));
	}
};

const handleOpenFolder = () =>
	window
		.showDirectoryPicker()
		.then((dirHandle) => openFolder(dirHandle, false))
		.catch(console.error);

const refreshFolder = () => {
	if (!folder.folderHandle) return;
	openFolder(folder.folderHandle, false);
};

export const playlist = {
	songFilter: { update: updateSongFilter },
	song: { ban: { toggleFn: toggleSongIsBannedFn } },
	folder: { handleOpen: handleOpenFolder, refresh: refreshFolder },
};
