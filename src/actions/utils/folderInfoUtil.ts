import type { Folder, Song } from "@/globalState";
import { appStore, folder } from "@/globalState";

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

export const writeFolderInfo = async () => {
	if (!folder.folderInfoHandle) return;
	const writable = await folder.folderInfoHandle.createWritable();
	const folderInfo = folderToFolderInfo(appStore.value.folder);
	await writable.write(JSON.stringify(folderInfo));
	writable.close();
};
