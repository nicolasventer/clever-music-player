import type { ProcessingProgress, Track } from "@/components/musicTypes";
import { parseBuffer } from "music-metadata";
import type { SetStateAction } from "react";

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

export const processMusicFileFn =
	(newTracks: Track[], setProcessingProgress: (value: SetStateAction<ProcessingProgress>) => void) =>
	async (fileHandle: FileSystemFileHandle) => {
		let songSrc: string = "";
		let pictureSrc: string | null = null;

		try {
			const file = await fileHandle.getFile();
			songSrc = URL.createObjectURL(file);

			// Parse metadata from the audio file
			const arrayBuffer = await file.arrayBuffer();
			const metadata = await parseBuffer(new Uint8Array(arrayBuffer));

			// Extract metadata with fallbacks
			const title = metadata.common.title || fileHandle.name.replace(/\.[^/.]+$/, "");
			const artist = metadata.common.artist || "Unknown Artist";
			const album = metadata.common.album || "Unknown Album";
			const duration = metadata.format.duration || 0;

			// Extract album art if available
			if (metadata.common.picture && metadata.common.picture.length > 0) {
				const picture = metadata.common.picture[0];
				const blob = new Blob([new Uint8Array(picture.data)], { type: picture.format });
				pictureSrc = URL.createObjectURL(blob);
			}

			newTracks.push({
				fileName: fileHandle.name,
				title: title,
				artist: artist,
				album: album,
				duration: duration,
				songSrc: songSrc,
				pictureSrc: pictureSrc,
			});

			// Update progress
			setProcessingProgress((prev) => ({ ...prev, current: prev.current + 1 }));
		} catch (error) {
			console.error(`Error processing file ${fileHandle.name}:`, error);

			// Fallback to filename if metadata parsing fails
			const filename = fileHandle.name;
			const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

			newTracks.push({
				fileName: filename,
				title: nameWithoutExt,
				artist: "Unknown Artist",
				album: "Unknown Album",
				duration: 0,
				songSrc: songSrc,
				pictureSrc: null,
			});

			// Update progress
			setProcessingProgress((prev) => ({ ...prev, current: prev.current + 1 }));
		}
	};
