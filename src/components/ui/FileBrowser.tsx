import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { SearchInput } from "@/components/ui/SearchInput";
import { Text } from "@/components/ui/Text";
import { Title } from "@/components/ui/Title";
import { File, Folder } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./Button";

export type Entry = {
	baseName: string;
	path: string;
	type: "DIRECTORY" | "FILE";
};

export type FileBrowserProps = {
	currentDirectory: string;
	isLoading: boolean;
	entryList: Entry[];
	onNavigate?: (path: string) => void;
	entryFilter?: (entry: Entry) => boolean;
	maxFileToShowCount?: number;
	maxFolderToShowCount?: number;
};

export const FileBrowser = ({
	currentDirectory,
	isLoading,
	entryList,
	onNavigate,
	entryFilter,
	maxFileToShowCount,
	maxFolderToShowCount,
}: FileBrowserProps) => {
	const [isEditingPath, setIsEditingPath] = useState(false);
	const [editingPath, setEditingPath] = useState(currentDirectory);
	const [searchQuery, setSearchQuery] = useState("");

	// Split current directory into breadcrumb entries
	const splittedCurrentDirectory: Entry[] = useMemo(() => {
		const parts = currentDirectory.split("/").filter(Boolean);
		const breadcrumbs: Entry[] = [];
		let currentPath = "";

		// Add root if not empty
		if (currentDirectory.startsWith("/")) {
			breadcrumbs.push({ baseName: "Root", path: "/", type: "DIRECTORY" });
			currentPath = "/";
		}

		for (const part of parts) {
			currentPath = currentPath + (currentPath.endsWith("/") ? "" : "/") + part;
			breadcrumbs.push({ baseName: part, path: currentPath, type: "DIRECTORY" });
		}

		return breadcrumbs;
	}, [currentDirectory]);

	// Separate folders and files
	const { folders, files, hiddenFoldersCount, hiddenFilesCount } = useMemo(() => {
		const folders: Entry[] = [];
		const files: Entry[] = [];

		// Apply filter if provided
		const filteredEntries = entryFilter ? entryList.filter(entryFilter) : entryList;

		// Apply search filter if provided
		const searchFilteredEntries = searchQuery
			? filteredEntries.filter((entry) => entry.baseName.toLowerCase().includes(searchQuery.toLowerCase()))
			: filteredEntries;

		for (const entry of searchFilteredEntries) {
			if (entry.type === "FILE") files.push(entry);
			else folders.push(entry);
		}

		// Apply max counts if provided
		const limitedFolders = maxFolderToShowCount ? folders.slice(0, maxFolderToShowCount) : folders;
		const limitedFiles = maxFileToShowCount ? files.slice(0, maxFileToShowCount) : files;

		// Calculate hidden counts
		const hiddenFoldersCount = maxFolderToShowCount ? Math.max(0, folders.length - maxFolderToShowCount) : 0;
		const hiddenFilesCount = maxFileToShowCount ? Math.max(0, files.length - maxFileToShowCount) : 0;

		return {
			folders: limitedFolders,
			files: limitedFiles,
			hiddenFoldersCount,
			hiddenFilesCount,
		};
	}, [entryList, entryFilter, searchQuery, maxFileToShowCount, maxFolderToShowCount]);

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

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") handleSavePath();
		else if (e.key === "Escape") handleCancelEdit();
	};

	return (
		<Card className="file-browser">
			<LoadingOverlay isVisible={isLoading} />

			{/* Breadcrumb Navigation */}
			<Card className="file-browser-breadcrumb" borderRadiusSize="small">
				{isEditingPath ? (
					<div className="file-browser-path-editor">
						<div>
							<Input
								value={editingPath}
								setValue={setEditingPath}
								onKeyDown={handleKeyPress}
								placeholder="Enter path..."
								autoFocus
							/>
						</div>
						<div className="file-browser-path-actions">
							<Button variant="light" size="small" onClick={handleSavePath} color="success">
								Save
							</Button>
							<Button variant="light" size="small" onClick={handleCancelEdit} color="danger">
								Cancel
							</Button>
						</div>
					</div>
				) : (
					<>
						<div className="breadcrumb-navigation">
							{splittedCurrentDirectory.map((entry, index) => (
								<div key={entry.path} className="breadcrumb-item">
									<Button size="small" onClick={() => handleNavigate(entry.path)}>
										{entry.baseName}
									</Button>
									{index < splittedCurrentDirectory.length - 1 && <Text className="breadcrumb-separator">/</Text>}
								</div>
							))}
						</div>
						<Button variant="light" size="small" onClick={handleEditPath}>
							Edit
						</Button>
					</>
				)}
			</Card>

			{/* Search Input */}
			<SearchInput value={searchQuery} setValue={setSearchQuery} placeholder="Search files and folders..." clearable />

			{/* Content Area */}
			<div className="file-browser-content">
				{/* Folders */}
				{folders.length > 0 && (
					<Card borderRadiusSize="small">
						<Title order={4} className="file-browser-section-title">
							Folders
						</Title>
						<div className="file-browser-items">
							{folders.map((folder) => (
								<div key={folder.path} className="file-browser-item">
									<Button icon={<Folder size={16} />} onClick={() => handleNavigate(folder.path)}>
										{folder.baseName}
									</Button>
								</div>
							))}
							{hiddenFoldersCount > 0 && (
								<div className="file-browser-item">
									<Text size="small" color="theme" className="hidden-count">
										+{hiddenFoldersCount} more folders
									</Text>
								</div>
							)}
						</div>
					</Card>
				)}

				{/* Files */}
				{files.length > 0 && (
					<Card borderRadiusSize="small">
						<Title order={3} className="file-browser-section-title">
							Files
						</Title>
						<div className="file-browser-items">
							{files.map((file) => (
								<div key={file.path} className="file-browser-item">
									<Text icon={<File size={16} />} size="small">
										{file.baseName}
									</Text>
								</div>
							))}
							{hiddenFilesCount > 0 && (
								<div className="file-browser-item">
									<Text size="small" className="hidden-count">
										+{hiddenFilesCount} more files
									</Text>
								</div>
							)}
						</div>
					</Card>
				)}

				{/* Empty State */}
				{folders.length === 0 && files.length === 0 && (
					<div className="file-browser-empty">
						<Text size="small">No files or folders found</Text>
					</div>
				)}
			</div>
		</Card>
	);
};
