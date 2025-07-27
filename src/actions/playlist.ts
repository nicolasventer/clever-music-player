import { writeFolderInfo } from "@/actions/folderInfoUtil";
import { getRandomSong, playAudio, playSong } from "@/actions/songUtil";
import { getFilesRecursively, getFolderInfo, getFolderInfoFile, isMusicFile } from "@/actions/utils/fileUtil";
import type { Folder, Song } from "@/globalState";
import { folder, setAppWithUpdate, songFileMap } from "@/globalState";
import randomName from "@scaleway/random-name";
import Mp3Tag from "mp3tag.js";

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.playlist.songFilter = filter));

const toggleSongIsBannedFn = (index: number) => () =>
	setAppWithUpdate((app) => (app.folder.songList[index].isBanned = !app.folder.songList[index].isBanned));

const openFolder = async (dirHandle: FileSystemDirectoryHandle) => {
	try {
		songFileMap.clear();

		const folderInfoHandle = await getFolderInfoFile(dirHandle);
		const folderInfo = await getFolderInfo(folderInfoHandle);
		const fileMap = new Map<string, Song>();
		folderInfo?.songList.forEach((song) => fileMap.set(song.filename, song));

		const newFolderInfo: Folder = { folderName: folderInfo?.folderName ?? randomName(), songList: [] };

		const musicFiles: FileSystemFileHandle[] = [];
		for await (const fileHandle of getFilesRecursively(dirHandle, isMusicFile)) musicFiles.push(fileHandle);

		for (const fileHandle of musicFiles) {
			const file = await fileHandle.getFile();
			songFileMap.set(fileHandle.name, file);
			const arrayBuffer = await file.arrayBuffer();
			const mp3tag = new Mp3Tag(arrayBuffer);
			mp3tag.read();

			const apic = mp3tag.tags.v2?.APIC;
			newFolderInfo.songList.push({
				title: mp3tag.tags.title,
				album: mp3tag.tags.album,
				artist: mp3tag.tags.artist.replace(/\\\\/g, "; "),
				filename: fileHandle.name,
				picture:
					apic && apic[0]
						? {
								data: apic[0].data,
								type: apic[0].format,
						  }
						: null,
				skipOdds: fileMap.get(fileHandle.name)?.skipOdds ?? 0,
				playOrSkipCount: fileMap.get(fileHandle.name)?.playOrSkipCount ?? 0,
				isBanned: fileMap.get(fileHandle.name)?.isBanned ?? false,
			});
		}
		folder.folderHandle = dirHandle;
		folder.folderInfoHandle = folderInfoHandle;
		// TODO: take care of songList.length === 0
		const { randomSong, newSongList } = getRandomSong(newFolderInfo.songList);
		setAppWithUpdate((app) => {
			app.bShowNoFolderModal = false;
			app.folder = newFolderInfo;
			if (newSongList !== app.folder.songList) app.folder.songList = newSongList;
			playSong(app, randomSong);
		});
		playAudio(randomSong, 0);
		writeFolderInfo();
	} catch (e) {
		console.error(e);
	}
};

const handleOpenFolder = () => window.showDirectoryPicker().then(openFolder).catch(console.error);

const refreshFolder = () => {
	if (!folder.folderHandle) return;
	openFolder(folder.folderHandle);
};

export const playlist = {
	songFilter: { update: updateSongFilter },
	song: { ban: { toggleFn: toggleSongIsBannedFn } },
	folder: { handleOpen: handleOpenFolder, refresh: refreshFolder },
};
