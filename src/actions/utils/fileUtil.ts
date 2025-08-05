import type { Folder } from "@/globalState";

const MUSIC_EXTENSIONS = [".mp3", ".wav", ".flac", ".ogg", ".aac", ".m4a"];

export const isMusicFile = (fileName: string) => MUSIC_EXTENSIONS.some((ext) => fileName.toLowerCase().endsWith(ext));

export async function* getFilesRecursively(
	dirHandle: FileSystemDirectoryHandle,
	filter: (fileName: string) => boolean,
	bRecursive: boolean
): AsyncGenerator<FileSystemFileHandle, void, unknown> {
	for await (const entry of dirHandle.values()) {
		if (entry.kind === "file" && isMusicFile(entry.name)) yield entry;
		else if (entry.kind === "directory" && bRecursive) yield* getFilesRecursively(entry, filter, bRecursive);
	}
}

const FOLDER_INFO_FILE_NAME = ".folderInfo.json";

export const getFolderInfoFile = (dirHandle: FileSystemDirectoryHandle) =>
	dirHandle.getFileHandle(FOLDER_INFO_FILE_NAME, { create: true });

export const getFolderInfo = async (folderInfoHandle: FileSystemFileHandle) => {
	try {
		const folderInfoFile = await folderInfoHandle.getFile();
		const folderInfoText = await folderInfoFile.text();
		return JSON.parse(folderInfoText) as Folder;
	} catch {
		return null;
	}
};
