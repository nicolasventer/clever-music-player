import { useState } from "react";
import type { Entry } from "./FileBrowser";
import { FileBrowser } from "./FileBrowser";
import { Title } from "./Title";

// Sample data for demonstration
const sampleEntries: Record<string, Entry[]> = {
	"/": [
		{ baseName: "Documents", path: "/Documents" },
		{ baseName: "Music", path: "/Music" },
		{ baseName: "Pictures", path: "/Pictures" },
		{ baseName: "Videos", path: "/Videos" },
		{ baseName: "readme.txt", path: "/readme.txt" },
		{ baseName: "config.json", path: "/config.json" },
	],
	"/Documents": [
		{ baseName: "Work", path: "/Documents/Work" },
		{ baseName: "Personal", path: "/Documents/Personal" },
		{ baseName: "report.pdf", path: "/Documents/report.pdf" },
		{ baseName: "notes.txt", path: "/Documents/notes.txt" },
	],
	"/Documents/Work": [
		{ baseName: "Projects", path: "/Documents/Work/Projects" },
		{ baseName: "presentation.pptx", path: "/Documents/Work/presentation.pptx" },
		{ baseName: "budget.xlsx", path: "/Documents/Work/budget.xlsx" },
	],
	"/Documents/Work/Projects": [
		{ baseName: "Project A", path: "/Documents/Work/Projects/Project A" },
		{ baseName: "Project B", path: "/Documents/Work/Projects/Project B" },
		{ baseName: "project-plan.docx", path: "/Documents/Work/Projects/project-plan.docx" },
	],
	"/Music": [
		{ baseName: "Rock", path: "/Music/Rock" },
		{ baseName: "Jazz", path: "/Music/Jazz" },
		{ baseName: "Classical", path: "/Music/Classical" },
		{ baseName: "playlist.m3u", path: "/Music/playlist.m3u" },
	],
	"/Music/Rock": [
		{ baseName: "song1.mp3", path: "/Music/Rock/song1.mp3" },
		{ baseName: "song2.mp3", path: "/Music/Rock/song2.mp3" },
		{ baseName: "album-cover.jpg", path: "/Music/Rock/album-cover.jpg" },
	],
	"/Pictures": [
		{ baseName: "Vacation", path: "/Pictures/Vacation" },
		{ baseName: "Family", path: "/Pictures/Family" },
		{ baseName: "screenshot.png", path: "/Pictures/screenshot.png" },
	],
	"/Videos": [
		{ baseName: "Tutorials", path: "/Videos/Tutorials" },
		{ baseName: "movie.mp4", path: "/Videos/movie.mp4" },
		{ baseName: "video.mp4", path: "/Videos/video.mp4" },
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
		<div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
			<Title order={1} text="File Browser Component Demo" className="margin-bottom-16" />
			<Title order={3} text={`Current Directory: ${currentDirectory}`} className="margin-bottom-16" />

			<FileBrowser currentDirectory={currentDirectory} isLoading={isLoading} entryList={entryList} onNavigate={handleNavigate} />

			<div style={{ marginTop: "20px", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
				<Title order={4} text="Features:" className="margin-bottom-8" />
				<ul style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
					<li>Breadcrumb navigation with clickable path segments</li>
					<li>Separate sections for folders and files</li>
					<li>Folder icons for folders, file icons for files</li>
					<li>Loading state with spinner</li>
					<li>Responsive design for mobile devices</li>
					<li>Hover effects and smooth transitions</li>
				</ul>
			</div>
		</div>
	);
};
