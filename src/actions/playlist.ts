import { getFilesRecursively, getFolderInfo, getFolderInfoFile, isMusicFile } from "@/actions/fileUtil";
import type { Folder, PlaylistTab, Song } from "@/globalState";
import { folderInfoHandleMap, setAppWithUpdate } from "@/globalState";
import randomName from "@scaleway/random-name";
import Mp3Tag from "mp3tag.js";

const updateCurrentTab = (tab: PlaylistTab) => setAppWithUpdate((app) => (app.playlist.currentTab = tab));

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.playlist.songFilter = filter));

const updateSongIsBanned = (folderIndex: number, songIndex: number, isBanned: boolean) =>
	setAppWithUpdate((app) => (app.folderList[folderIndex].songList[songIndex].isBanned = isBanned));

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
			const arrayBuffer = await file.arrayBuffer();
			const mp3tag = new Mp3Tag(arrayBuffer);
			mp3tag.read();

			const apic = mp3tag.tags.v2?.APIC;
			newFolderInfo.songList.push({
				title: mp3tag.tags.title,
				album: mp3tag.tags.album,
				artist: mp3tag.tags.artist,
				filename: fileHandle.name,
				picture: apic && apic[0] ? new Blob([new Uint8Array(apic[0].data)], { type: apic[0].format }) : new Blob(),
				skipOdds: fileMap.get(fileHandle.name)?.skipOdds ?? 0,
				playOrSkipCount: fileMap.get(fileHandle.name)?.playOrSkipCount ?? 0,
				isBanned: fileMap.get(fileHandle.name)?.isBanned ?? false,
			});
		}
		folderInfoHandleMap.set(newFolderInfo.folderName, folderInfoHandle);
		setAppWithUpdate(
			(app) =>
				(app.folderList = [...app.folderList.filter((folder) => folder.folderName !== folderInfo?.folderName), newFolderInfo])
		);
		await refreshFolderInfo(newFolderInfo);
	} catch (e) {
		console.error(e);
	}
};

type SongInfo = {
	filename: string;
	skipOdds: number;
	playOrSkipCount: number;
	isBanned: boolean;
};

type FolderInfo = {
	folderName: string;
	songList: SongInfo[];
};

const folderToFolderInfo = (folder: Folder): FolderInfo => ({
	folderName: folder.folderName,
	songList: folder.songList.map((song) => ({
		filename: song.filename,
		skipOdds: song.skipOdds,
		playOrSkipCount: song.playOrSkipCount,
		isBanned: song.isBanned,
	})),
});

const refreshFolderInfo = async (folder: Folder) => {
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
	song: { ban: { update: updateSongIsBanned } },
	folder: { handleOpen: handleOpenFolder, refreshInfo: refreshFolderInfo, remove: removeFolder },
};
