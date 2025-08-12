import { actions } from "@/actions/actions";
import { Button, Modal } from "@/components/ui";
import { FileBrowser } from "@/components/ui/FileBrowser";
import type { AppState } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { FolderOpen, Music } from "lucide-react";
import { useEffect } from "react";

export type AddMusicFolderModalProps = {
	bShowAddMusicFolderModal: boolean;
	browser: AppState["browser"];
};

export const AddMusicFolderModal = ({ bShowAddMusicFolderModal, browser }: AddMusicFolderModalProps) => {
	// Initialize file browser when modal opens
	useEffect(() => {
		if (bShowAddMusicFolderModal) actions.browser.currentDirectory.update(browser.currentDirectory);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bShowAddMusicFolderModal]);

	return (
		<Modal
			isOpen={bShowAddMusicFolderModal}
			onClose={actions.app.addMusicFolderModal.close}
			title="Add Music Folder"
			icon={<Music size={20} />}
			closeOnClickOutside
			style={{ maxWidth: "900px" }}
		>
			<Vertical gap={16}>
				<p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
					Browse and select a folder containing your music files. You can navigate through directories or use the quick folder
					picker.
				</p>
				<div
					style={{
						backgroundColor: "rgba(255, 255, 255, 0.05)",
						padding: "8px 12px",
						borderRadius: "6px",
						border: "1px solid rgba(255, 255, 255, 0.1)",
					}}
				>
					<p style={{ color: "rgba(255, 255, 255, 0.6)", margin: 0, fontSize: "14px" }}>
						Current path:{" "}
						<span style={{ color: "rgba(255, 255, 255, 0.8)", fontFamily: "monospace" }}>{browser.currentDirectory}</span>
					</p>
				</div>

				{/* File Browser */}
				<div
					style={{
						height: "400px",
						overflow: "auto",
						border: "1px solid rgba(255, 255, 255, 0.1)",
						borderRadius: "8px",
						padding: "8px",
					}}
				>
					<FileBrowser
						currentDirectory={browser.currentDirectory}
						isLoading={browser.isLoading}
						entryList={browser.entryList}
						onNavigate={actions.browser.currentDirectory.update}
					/>
				</div>

				{/* Action Buttons */}
				<Horizontal gap={12} justifyContent="center">
					<Button
						text="Select Current Folder"
						icon={<FolderOpen size={16} />}
						variant="filled"
						onClick={actions.browser.folder.selectFn(browser.currentDirectory)}
					/>
					<Button text="Cancel" variant="light" onClick={actions.app.addMusicFolderModal.close} />
				</Horizontal>
			</Vertical>
		</Modal>
	);
};
