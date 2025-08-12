import { useState } from "react";
import type { Entry } from "./FileBrowser";
import { FileBrowser } from "./FileBrowser";

// Sample data for demonstration
const sampleEntries: Record<string, Entry[]> = {
	"/": [
		{ baseName: "Documents", path: "/Documents", type: "DIRECTORY" },
		{ baseName: "Music", path: "/Music", type: "DIRECTORY" },
		{ baseName: "Pictures", path: "/Pictures", type: "DIRECTORY" },
		{ baseName: "Videos", path: "/Videos", type: "DIRECTORY" },
		{ baseName: "readme.txt", path: "/readme.txt", type: "FILE" },
		{ baseName: "config.json", path: "/config.json", type: "FILE" },
	],
	"/Documents": [
		{ baseName: "Work", path: "/Documents/Work", type: "DIRECTORY" },
		{ baseName: "Personal", path: "/Documents/Personal", type: "DIRECTORY" },
		{ baseName: "report.pdf", path: "/Documents/report.pdf", type: "FILE" },
		{ baseName: "notes.txt", path: "/Documents/notes.txt", type: "FILE" },
	],
	"/Documents/Work": [
		{ baseName: "Projects", path: "/Documents/Work/Projects", type: "DIRECTORY" },
		{ baseName: "presentation.pptx", path: "/Documents/Work/presentation.pptx", type: "FILE" },
		{ baseName: "budget.xlsx", path: "/Documents/Work/budget.xlsx", type: "FILE" },
	],
	"/Documents/Work/Projects": [
		{ baseName: "Project A", path: "/Documents/Work/Projects/Project A", type: "DIRECTORY" },
		{ baseName: "Project B", path: "/Documents/Work/Projects/Project B", type: "DIRECTORY" },
		{ baseName: "project-plan.docx", path: "/Documents/Work/Projects/project-plan.docx", type: "FILE" },
	],
	"/Music": [
		{ baseName: "Rock", path: "/Music/Rock", type: "DIRECTORY" },
		{ baseName: "Jazz", path: "/Music/Jazz", type: "DIRECTORY" },
		{ baseName: "Classical", path: "/Music/Classical", type: "DIRECTORY" },
		{ baseName: "playlist.m3u", path: "/Music/playlist.m3u", type: "FILE" },
	],
	"/Music/Rock": [
		{ baseName: "song1.mp3", path: "/Music/Rock/song1.mp3", type: "FILE" },
		{ baseName: "song2.mp3", path: "/Music/Rock/song2.mp3", type: "FILE" },
		{ baseName: "album-cover.jpg", path: "/Music/Rock/album-cover.jpg", type: "FILE" },
	],
	"/Pictures": [
		{ baseName: "Vacation", path: "/Pictures/Vacation", type: "DIRECTORY" },
		{ baseName: "Family", path: "/Pictures/Family", type: "DIRECTORY" },
		{ baseName: "screenshot.png", path: "/Pictures/screenshot.png", type: "FILE" },
	],
	"/Videos": [
		{ baseName: "Tutorials", path: "/Videos/Tutorials", type: "DIRECTORY" },
		{ baseName: "movie.mp4", path: "/Videos/movie.mp4", type: "FILE" },
		{ baseName: "video.mp4", path: "/Videos/video.mp4", type: "FILE" },
	],
};

export const FileBrowserDemo = () => {
	const [currentDirectory, setCurrentDirectory] = useState("/");
	const [isLoading, setIsLoading] = useState(false);

	const handleNavigate = (path: string) => {
		setIsLoading(true);
		// Simulate loading delay
		setTimeout(() => {
			setCurrentDirectory(path);
			setIsLoading(false);
		}, 300);
	};

	const entryList = sampleEntries[currentDirectory] || [];

	return (
		<FileBrowser currentDirectory={currentDirectory} isLoading={isLoading} entryList={entryList} onNavigate={handleNavigate} />
	);
};
