import { actions } from "@/actions/actions";
import { displayArtistAlbum, displayTitle } from "@/components/componentUtil";
import { Button, Modal } from "@/components/ui";
import type { Song } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { AlertTriangle, Trash2 } from "lucide-react";

export type AboveThresholdModalProps = {
	isOpen: boolean;
	onClose: () => void;
	songs: Song[];
	threshold: number;
};

export const AboveThresholdModal = ({ isOpen, onClose, songs, threshold }: AboveThresholdModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} title="Songs Above Threshold" icon={<AlertTriangle size={20} />} closeOnClickOutside>
		<Vertical gap={16}>
			<div style={{ color: "#fecaca", fontWeight: 600 }}>⚠️ The delete action cannot be undone!</div>
			<p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
				The following {songs.length} songs have skip odds above {Math.round(threshold * 100)}%:
			</p>
			<div style={{ maxHeight: "400px", overflowY: "auto" }}>
				{songs.length === 0 ? (
					<p style={{ color: "rgba(255, 255, 255, 0.6)", textAlign: "center", margin: 0 }}>No songs above the threshold.</p>
				) : (
					<Vertical gap={8}>
						{songs.map((song) => (
							<div
								key={song.filename}
								style={{
									padding: "12px",
									background: "rgba(255, 107, 107, 0.1)",
									borderRadius: "8px",
									border: "1px solid rgba(255, 107, 107, 0.2)",
								}}
							>
								<Horizontal justifyContent="space-between" alignItems="flex-start">
									<Vertical gap={4} style={{ flex: 1 }}>
										<div style={{ fontWeight: 600, color: "#fecaca" }}>{displayTitle(song)}</div>
										<div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}>{displayArtistAlbum(song)}</div>
										<div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
											Skip odds: {Math.round(song.skipOdds * 100)}% • Plays: {song.playOrSkipCount}
										</div>
									</Vertical>
									<Button
										icon={<Trash2 size={14} />}
										variant="filled"
										color="danger"
										isCompact
										onClick={actions.dangerZone.songs.deleteFn([song])}
									/>
								</Horizontal>
							</div>
						))}
					</Vertical>
				)}
			</div>
			<Horizontal gap={12} justifyContent="center">
				{songs.length > 0 && (
					<Button
						text="Delete All"
						icon={<Trash2 size={16} />}
						variant="filled"
						color="danger"
						onClick={actions.dangerZone.songs.deleteFn(songs)}
					/>
				)}
				<Button text="Close" variant="light" onClick={onClose} />
			</Horizontal>
		</Vertical>
	</Modal>
);
