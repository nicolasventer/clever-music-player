import { getFilesRecursively, getFolderInfo, getFolderInfoFile, isMusicFile } from "@/actions/utils/fileUtil";
import { writeFolderInfo } from "@/actions/utils/folderInfoUtil";
import { getRandomSong, playAudio } from "@/actions/utils/songUtil";
import type { Folder, Song } from "@/globalState";
import { folder, songFileMap } from "@/globalState";
import randomName from "@scaleway/random-name";
import MP3Tag from "mp3tag.js";
import type { Dispatch, SetStateAction } from "react";

// TODO: move to globalState (with another name)
export type NewCurrentSong = { song: Song | null; imgSrc: string | null; isConsideredAsPlayed: boolean };

export type PlaySongStateParams = {
	oldImgSrc: string | null;
	setSongList: Dispatch<SetStateAction<Song[]>>;
	setRollbackSongList: Dispatch<SetStateAction<Song[]>>;
	setCurrentSong: Dispatch<SetStateAction<NewCurrentSong>>;
};

const playSong = (
	{ oldImgSrc, setSongList, setRollbackSongList, setCurrentSong }: PlaySongStateParams,
	song: Song,
	bBack: boolean = false
) => {
	if (oldImgSrc) URL.revokeObjectURL(oldImgSrc);
	if (bBack) setSongList((songList) => songList.map((s) => (s.filename === song.filename ? song : s)));
	else setRollbackSongList((rollbackSongList) => [...rollbackSongList, { ...song }]);

	const blob = song.picture ? new Blob([new Uint8Array(song.picture.data)], { type: song.picture.type }) : null;
	const imgSrc = blob ? URL.createObjectURL(blob) : null;
	setCurrentSong({ song, imgSrc, isConsideredAsPlayed: false });
};

export type OpenFolderStateParams = {
	setFolderName: Dispatch<SetStateAction<string>>;
	// setSongList: Dispatch<SetStateAction<Song[]>>;
	setIsFolderLoading: Dispatch<SetStateAction<boolean>>;
	setTotalToLoadCount: Dispatch<SetStateAction<number>>;
	setTotalLoadedCount: Dispatch<SetStateAction<number>>;
	closeNoMusicModal: () => void;
} & PlaySongStateParams;

const openFolder = async (
	{
		setFolderName,
		setIsFolderLoading,
		setTotalToLoadCount,
		setTotalLoadedCount,
		closeNoMusicModal,
		...playSongStateParams
	}: OpenFolderStateParams,
	dirHandle: FileSystemDirectoryHandle
) => {
	try {
		setIsFolderLoading(true);
		songFileMap.clear();

		const folderInfoHandle = await getFolderInfoFile(dirHandle);
		const folderInfo = await getFolderInfo(folderInfoHandle);
		const fileMap = new Map<string, Song>();
		folderInfo?.songList.forEach((song) => fileMap.set(song.filename, song));

		const newFolderInfo: Folder = { folderName: folderInfo?.folderName ?? randomName(), songList: [] };

		const musicFiles: FileSystemFileHandle[] = [];
		for await (const fileHandle of getFilesRecursively(dirHandle, isMusicFile)) musicFiles.push(fileHandle);
		setTotalToLoadCount(musicFiles.length);
		setTotalLoadedCount(0);
		await Promise.all(
			musicFiles.map(async (fileHandle) => {
				const file = await fileHandle.getFile();
				songFileMap.set(fileHandle.name, file);
				const arrayBuffer = await file.arrayBuffer();
				const mp3tag = new MP3Tag(arrayBuffer);
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
				setTotalLoadedCount(newFolderInfo.songList.length);
			})
		);
		folder.folderHandle = dirHandle;
		folder.folderInfoHandle = folderInfoHandle;
		// TODO: take care of songList.length === 0
		const { randomSong, newSongList } = getRandomSong(newFolderInfo.songList);
		closeNoMusicModal();
		setFolderName(newFolderInfo.folderName);
		playSongStateParams.setSongList(newSongList);
		playSong(playSongStateParams, randomSong);
		playAudio(randomSong, 0);
		writeFolderInfo(newFolderInfo);
	} catch (e) {
		console.error(e);
	} finally {
		setIsFolderLoading(false);
	}
};

export const handleOpenFolder = (openFolderStateParams: OpenFolderStateParams) =>
	window
		.showDirectoryPicker()
		.then((dirHandle) => openFolder(openFolderStateParams, dirHandle))
		.catch(console.error);
