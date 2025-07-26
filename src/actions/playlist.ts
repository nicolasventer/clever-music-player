import { actions } from "@/actions/actions";
import { getFilesRecursively, getFolderInfo, getFolderInfoFile, isMusicFile } from "@/actions/utils/fileUtil";
import type { Folder, PlaylistTab, Song } from "@/globalState";
import { folderHandleMap, folderInfoHandleMap, setAppWithUpdate, songFileMap, songIdListMap, songList } from "@/globalState";
import randomName from "@scaleway/random-name";
import Mp3Tag from "mp3tag.js";

const updateCurrentTab = (tab: PlaylistTab) => setAppWithUpdate((app) => (app.playlist.currentTab = tab));

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.playlist.songFilter = filter));

const toggleSongIsBanned = (filename: string) =>
	setAppWithUpdate((app) => {
		songIdListMap
			.get(filename)
			?.forEach(
				({ folderIndex, songIndex }) =>
					(app.folderList[folderIndex].songList[songIndex].isBanned = !app.folderList[folderIndex].songList[songIndex].isBanned)
			);
	});

const _refreshSongList = (folderList: Folder[]) => {
	songIdListMap.clear();
	songList.length = 0;

	folderList.forEach((folder, folderIndex) => {
		folder.songList.forEach((song, songIndex) => {
			const oldSongIdList = songIdListMap.get(song.filename);
			if (oldSongIdList) songList.push(song);
			const songIdList = oldSongIdList ?? [];
			songIdList.push({ folderIndex, songIndex });
			songIdListMap.set(song.filename, songIdList);
		});
	});
};

const addFolder = async (dirHandle: FileSystemDirectoryHandle) => {
	try {
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
				artist: mp3tag.tags.artist,
				filename: fileHandle.name,
				picture: apic && apic[0] ? new Blob([new Uint8Array(apic[0].data)], { type: apic[0].format }) : null,
				skipOdds: fileMap.get(fileHandle.name)?.skipOdds ?? 0,
				playOrSkipCount: fileMap.get(fileHandle.name)?.playOrSkipCount ?? 0,
				isBanned: fileMap.get(fileHandle.name)?.isBanned ?? false,
			});
		}
		folderHandleMap.set(newFolderInfo.folderName, dirHandle);
		folderInfoHandleMap.set(newFolderInfo.folderName, folderInfoHandle);
		setAppWithUpdate((app) => {
			app.bShowNoFolderModal = false;
			app.folderList = [...app.folderList.filter((folder) => folder.folderName !== folderInfo?.folderName), newFolderInfo];
			_refreshSongList(app.folderList);
		});
		await writeFolderInfo(newFolderInfo);
		actions.player.currentSong.updateToRandom();
	} catch (e) {
		console.error(e);
	}
};

type SongInfo = Pick<Song, "filename" | "skipOdds" | "playOrSkipCount" | "isBanned">;
type FolderInfo = Pick<Folder, "folderName"> & { songList: SongInfo[] };

const folderToFolderInfo = (folder: Folder): FolderInfo => ({
	folderName: folder.folderName,
	songList: folder.songList.map((song) => ({
		filename: song.filename,
		skipOdds: song.skipOdds,
		playOrSkipCount: song.playOrSkipCount,
		isBanned: song.isBanned,
	})),
});

const writeFolderInfo = async (folder: Folder) => {
	const folderInfoHandle = folderInfoHandleMap.get(folder.folderName);
	if (!folderInfoHandle) return;
	const writable = await folderInfoHandle.createWritable();
	const folderInfo = folderToFolderInfo(folder);
	writable.write(JSON.stringify(folderInfo));
	writable.close();
};

const removeFolder = async (folderName: string) => {
	folderInfoHandleMap.delete(folderName);
	setAppWithUpdate((app) => (app.folderList = app.folderList.filter((folder) => folder.folderName !== folderName)));
};

export const handleOpenFolder = () => window.showDirectoryPicker().then(addFolder).catch(console.error);

export const playlist = {
	currentTab: { update: updateCurrentTab },
	songFilter: { update: updateSongFilter },
	song: { ban: { toggle: toggleSongIsBanned } },
	folder: { handleOpen: handleOpenFolder, writeInfo: writeFolderInfo, remove: removeFolder },
};
