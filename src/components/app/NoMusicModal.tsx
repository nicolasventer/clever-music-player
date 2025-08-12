import { actions } from "@/actions/actions";
import { Button, Modal } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { FolderOpen, Loader2, Music, Zap } from "lucide-react";

export type NoMusicModalProps = {
	isOpen: boolean;
	onClose: () => void;
	isLoading: boolean;
	loadedCount: number;
	totalToLoadCount: number;
	currentDirectory: string;
};

export const NoMusicModal = ({
	isOpen,
	onClose,
	isLoading,
	loadedCount,
	totalToLoadCount,
	currentDirectory,
}: NoMusicModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} title="No Music Found" icon={<Music size={20} />} closeOnClickOutside={!isLoading}>
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
					<Horizontal gap={12} justifyContent="center" alignItems="flex-start" marginTop={12}>
						{window.fs !== undefined && (
							<Vertical gap={8}>
								<Button
									text={`Quick Add`}
									icon={<Zap size={16} />}
									variant="filled"
									onClick={actions.browser.folder.selectFn(currentDirectory)}
								/>
								<div
									style={{
										color: "rgba(255, 255, 255, 0.6)",
										fontSize: "12px",
										fontStyle: "italic",
										textAlign: "center",
										maxWidth: "180px",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{currentDirectory}
								</div>
							</Vertical>
						)}
						<Button
							text="Add Music Folder"
							icon={<FolderOpen size={16} />}
							variant="filled"
							onClick={actions.app.addMusicFolder}
						/>
						<Button text="Later" variant="light" onClick={onClose} />
					</Horizontal>
				</>
			)}
		</Vertical>
	</Modal>
);
