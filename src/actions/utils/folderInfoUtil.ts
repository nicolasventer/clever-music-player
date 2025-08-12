import { FOLDER_INFO_FILE_NAME } from "@/actions/utils/fileUtil";
import type { Folder, Song } from "@/globalState";
import { appStore, folder } from "@/globalState";
import path from "path-browserify-esm";

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
	if (window.fs !== undefined) {
		window.fs.writeFileSync(
			path.join(appStore.value.browser.currentDirectory, FOLDER_INFO_FILE_NAME),
			JSON.stringify(folderToFolderInfo(appStore.value.folder))
		);
	} else {
		if (!folder.folderInfoHandle) return;
		const writable = await folder.folderInfoHandle.createWritable();
		const folderInfo = folderToFolderInfo(appStore.value.folder);
		await writable.write(JSON.stringify(folderInfo));
		writable.close();
	}
};
