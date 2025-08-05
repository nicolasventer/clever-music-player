import { actions } from "@/actions/actions";
import { Button, Modal } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { FolderOpen, Loader2, Music } from "lucide-react";

export type NoMusicModalProps = {
	isOpen: boolean;
	onClose: () => void;
	isLoading: boolean;
	loadedCount: number;
	totalToLoadCount: number;
};

export const NoMusicModal = ({ isOpen, onClose, isLoading, loadedCount = 0, totalToLoadCount = 0 }: NoMusicModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} title="No Music Found" icon={<Music size={20} />} closeOnClickOutside>
		<Vertical gap={16}>
			{isLoading ? (
				<div className="loading-fade-in">
					<p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
						Loading music folder... Please wait while we scan your music files.
					</p>
					{totalToLoadCount > 0 && (
						<div style={{ marginTop: "8px" }}>
							<p style={{ color: "rgba(255, 255, 255, 0.6)", margin: 0, fontSize: "14px" }}>
								Loaded {loadedCount} of {totalToLoadCount} files
							</p>
							<div
								style={{
									width: "100%",
									height: "4px",
									backgroundColor: "rgba(255, 255, 255, 0.1)",
									borderRadius: "2px",
									marginTop: "8px",
									overflow: "hidden",
								}}
							>
								<div
									style={{
										width: `${totalToLoadCount > 0 ? (loadedCount / totalToLoadCount) * 100 : 0}%`,
										height: "100%",
										backgroundColor: "rgba(255, 255, 255, 0.8)",
										transition: "width 0.3s ease",
										borderRadius: "2px",
									}}
								/>
							</div>
						</div>
					)}
					<Horizontal justifyContent="center" style={{ marginTop: "16px" }}>
						<div className="loading-bounce">
							<Loader2 size={24} className="animate-spin" />
						</div>
					</Horizontal>
				</div>
			) : (
				<>
					<p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
						It looks like you haven't added any music folders yet. To get started, add a folder containing your music files.
					</p>
					<Horizontal gap={12} justifyContent="center">
						<Button
							text="Add Music Folder"
							icon={<FolderOpen size={16} />}
							variant="filled"
							onClick={actions.playlist.folder.handleOpen}
						/>
						<Button text="Later" variant="light" onClick={onClose} />
					</Horizontal>
				</>
			)}
		</Vertical>
	</Modal>
);
