import { filesystem } from "@neutralinojs/lib";
import path from "path-browserify-esm";
import { Fragment, useEffect, useState } from "react";
import "./App.css";

declare global {
	const NL_TEST: string;
}

function App() {
	const [currentDirectory, setCurrentDirectory] = useState<string>("./");

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [folders, setFolders] = useState<{ dirName: string; path: string }[]>([]);

	const [splitPath, setSplitPath] = useState<{ dirName: string; path: string }[]>([]);

	const updateCurrentDirectory = (directory: string) => {
		setCurrentDirectory(directory);

		setIsLoading(true);
		setTimeout(async () => {
			await filesystem.getAbsolutePath(directory).then((path) => {
				let cumulativePath = "";
				setSplitPath(
					path.split("/").map((dirName) => {
						const fullPath = cumulativePath + (cumulativePath ? "/" : "") + dirName;
						cumulativePath = fullPath;
						return { dirName, path: fullPath };
					})
				);
			});
			filesystem
				.readDirectory(directory)
				.then(async (data) => {
					setFolders([
						{ dirName: "..", path: path.resolve(directory, "..") },
						...data
							.filter((item) => item.type === "DIRECTORY")
							.map((item) => ({ dirName: path.basename(item.path), path: item.path })),
					]);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, 200);
	};

	const openFolder = (path: string) => {
		filesystem.readDirectory(path).then((data) => {
			const musicFiles = data.filter((item) => item.type === "FILE" && item.path.endsWith(".mp3"));
			const firstMusicFile = musicFiles[0];
			if (firstMusicFile) {
				filesystem.readBinaryFile(firstMusicFile.path).then((data) => {
					const audio = new Audio(URL.createObjectURL(new Blob([data])));
					audio.play();
				});
			}
		});
	};

	// Log current directory or error after component is mounted
	useEffect(() => {
		console.log(NL_TEST);
		updateCurrentDirectory("./");
	}, []);

	return (
		<div className="App">
			My Neutralinojs App
			<div>
				{splitPath.map(({ dirName, path }, index) => (
					<Fragment key={path}>
						<button onClick={() => updateCurrentDirectory(path)}>{dirName}</button>
						{index !== splitPath.length - 1 && <span> / </span>}
					</Fragment>
				))}
			</div>
			<div className="folders">
				{folders.map(({ dirName, path }) => (
					<button key={path} onClick={() => updateCurrentDirectory(path)}>
						{dirName}
					</button>
				))}
			</div>
			<div style={{ marginTop: "20px" }}>
				<button onClick={() => openFolder(currentDirectory)}>Open</button>
			</div>
		</div>
	);
}

export default App;
