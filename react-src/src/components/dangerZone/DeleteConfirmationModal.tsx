import { actions } from "@/actions/actions";
import { Button, Modal } from "@/components/ui";
import type { Song } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { AlertTriangle, Trash2 } from "lucide-react";

export type DeleteConfirmationModalProps = {
	isOpen: boolean;
	onClose: () => void;
	songs: Song[];
	threshold: number;
};

export const DeleteConfirmationModal = ({ isOpen, onClose, songs, threshold }: DeleteConfirmationModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" icon={<AlertTriangle size={20} />} closeOnClickOutside>
		<Vertical gap={16}>
			<div style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
				<p style={{ margin: "0 0 12px 0", fontWeight: 600, color: "#fecaca" }}>⚠️ This action cannot be undone!</p>
				<p style={{ margin: 0 }}>
					You are about to permanently delete <strong>{songs.length} songs</strong> that have skip odds above{" "}
					<strong>{Math.round(threshold * 100)}%</strong>.
				</p>
			</div>

			{songs.length > 0 && (
				<div
					style={{
						maxHeight: "200px",
						overflowY: "auto",
						padding: "12px",
						background: "rgba(255, 107, 107, 0.1)",
						borderRadius: "8px",
						border: "1px solid rgba(255, 107, 107, 0.2)",
					}}
				>
					<p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}>Songs to be deleted:</p>
					<Vertical gap={4}>
						{songs.slice(0, 10).map((song) => (
							<div key={song.filename} style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)" }}>
								• {song.title} - {song.artist}
							</div>
						))}
						{songs.length > 10 && (
							<div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", fontStyle: "italic" }}>
								... and {songs.length - 10} more songs
							</div>
						)}
					</Vertical>
				</div>
			)}

			<Horizontal gap={12} justifyContent="center">
				<Button text="Cancel" variant="light" onClick={onClose} />
				<Button
					text="Delete All"
					icon={<Trash2 size={16} />}
					variant="filled"
					color="danger"
					onClick={() => {
						actions.dangerZone.songs.deleteFn(songs)();
						onClose();
					}}
				/>
			</Horizontal>
		</Vertical>
	</Modal>
);
