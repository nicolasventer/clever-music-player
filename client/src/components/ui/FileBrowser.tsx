import { File, Folder } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useMemo, useState } from "react";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";

export type Entry = {
	baseName: string;
	path: string;
};

export type FileBrowserProps = {
	currentDirectory: string;
	isLoading: boolean;
	entryList: Entry[];
	onNavigate?: (path: string) => void;
};

export const FileBrowser = ({ currentDirectory, isLoading, entryList, onNavigate }: FileBrowserProps) => {
	const [isEditingPath, setIsEditingPath] = useState(false);
	const [editingPath, setEditingPath] = useState(currentDirectory);
	const [searchTerm, setSearchTerm] = useState("");

	// Split current directory into breadcrumb entries
	const splittedCurrentDirectory: Entry[] = useMemo(() => {
		const parts = currentDirectory.split("/");
		if (parts[0] === "") parts[0] = "/";
		if (parts[parts.length - 1] === "") parts.pop();

		const breadcrumbs: Entry[] = [];
		let currentPath = "";

		for (const part of parts) {
			currentPath += (currentPath ? "/" : "") + part;
			breadcrumbs.push({ baseName: part, path: currentPath });
		}

		return breadcrumbs;
	}, [currentDirectory]);

	// Separate folders and files with search filtering
	const { folders, files } = useMemo(() => {
		const folders: Entry[] = [];
		const files: Entry[] = [];

		entryList.forEach((entry) => {
			// Apply search filter
			const matchesSearch = searchTerm === "" || entry.baseName.toLowerCase().includes(searchTerm.toLowerCase());

			if (!matchesSearch) return;

			// Simple heuristic: if it has an extension, it's likely a file
			// In a real implementation, you'd want to check if it's actually a directory
			if (entry.baseName.includes(".") && !entry.baseName.startsWith(".")) {
				files.push(entry);
			} else {
				folders.push(entry);
			}
		});

		return { folders, files };
	}, [entryList, searchTerm]);

	const handleNavigate = (path: string) => {
		onNavigate?.(path);
	};

	const handleEditPath = () => {
		setIsEditingPath(true);
		setEditingPath(currentDirectory);
	};

	const handleSavePath = () => {
		setIsEditingPath(false);
		onNavigate?.(editingPath);
	};

	const handleCancelEdit = () => {
		setIsEditingPath(false);
		setEditingPath(currentDirectory);
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === "Enter") handleSavePath();
		else if (e.key === "Escape") handleCancelEdit();
	};

	return (
		<div className="file-browser" style={{ position: "relative" }}>
			{/* Loading Overlay */}
			{isLoading && (
				<div className="file-browser-loading-overlay">
					<div className="file-browser-loading-spinner" />
					<div className="file-browser-loading-text">Loading...</div>
				</div>
			)}

			{/* Breadcrumb Navigation */}
			<div className="file-browser-breadcrumb">
				{isEditingPath ? (
					<div className="file-browser-path-editor">
						<input
							type="text"
							value={editingPath}
							onChange={(e) => setEditingPath(e.target.value)}
							onKeyDown={handleKeyPress}
							className="file-browser-path-input"
							placeholder="Enter path..."
							autoFocus
						/>
						<div className="file-browser-path-actions">
							<Button text="Save" variant="light" isCompact onClick={handleSavePath} className="file-browser-path-save-btn" />
							<Button
								text="Cancel"
								variant="light"
								isCompact
								onClick={handleCancelEdit}
								className="file-browser-path-cancel-btn"
							/>
						</div>
					</div>
				) : (
					<>
						<div className="breadcrumb-navigation">
							{splittedCurrentDirectory.map((entry, index) => (
								<div key={entry.path} className="breadcrumb-item">
									<Button
										text={entry.baseName}
										variant="light"
										isCompact
										onClick={() => handleNavigate(entry.path)}
										className="breadcrumb-button"
									/>
									{index < splittedCurrentDirectory.length - 1 && <span className="breadcrumb-separator">/</span>}
								</div>
							))}
						</div>
						<Button text="Edit" variant="light" isCompact onClick={handleEditPath} className="file-browser-edit-path-btn" />
					</>
				)}
			</div>

			{/* Search Input */}
			<div className="file-browser-search">
				<SearchInput
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder="Search files and folders..."
					className="file-browser-search-input"
				/>
			</div>

			{/* Content Area */}
			<div className="file-browser-content">
				{/* Folders */}
				{folders.length > 0 && (
					<div className="file-browser-section">
						<h3 className="file-browser-section-title">Folders</h3>
						<div className="file-browser-items">
							{folders.map((folder) => (
								<div key={folder.path} className="file-browser-item">
									<Button
										text={folder.baseName}
										icon={<Folder size={16} />}
										variant="light"
										onClick={() => handleNavigate(folder.path)}
										className="file-browser-folder-button"
									/>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Files */}
				{files.length > 0 && (
					<div className="file-browser-section">
						<h3 className="file-browser-section-title">Files</h3>
						<div className="file-browser-items">
							{files.map((file) => (
								<div key={file.path} className="file-browser-item">
									<div className="file-browser-file">
										<File size={16} className="file-icon" />
										<span className="file-name">{file.baseName}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Empty State */}
				{folders.length === 0 && files.length === 0 && (
					<div className="file-browser-empty">
						<p>{searchTerm ? `No files or folders found matching "${searchTerm}"` : "No files or folders found"}</p>
					</div>
				)}
			</div>
		</div>
	);
};
