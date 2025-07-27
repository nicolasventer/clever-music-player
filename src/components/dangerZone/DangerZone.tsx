import { actions } from "@/actions/actions";
import { Button, Card, InputBottomLine, Title } from "@/components/ui";
import type { AppState, Song } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { AlertTriangle, Eye, FolderOpen, RotateCcw, Target, Trash2 } from "lucide-react";

export const DangerZone = ({
	dangerZone,
	aboveThresholdSongList,
}: {
	dangerZone: AppState["dangerZone"];
	aboveThresholdSongList: Song[];
}) => (
	<Vertical alignItems="center" flexGrow className="container">
		<Vertical widthFull gap={12}>
			<Card>
				<Title order={3} text="Skip Threshold" icon={<Target size={20} />} color="danger" />
				<Horizontal justifyContent="space-between" className="danger-zone-controls">
					<Horizontal className="danger-zone-input-group">
						<div className="danger-zone-label">Threshold:</div>
						<Horizontal alignItems="center" style={{ gap: 4 }}>
							<InputBottomLine
								type="number"
								max={99}
								style={{ width: 48 }}
								inputMode="numeric"
								value={Math.round(dangerZone.threshold * 100).toString()}
								setValue={(value) => actions.dangerZone.threshold.update(parseInt(value) / 100)}
							/>
							<span style={{ color: "#fecaca", fontWeight: 500 }}>%</span>
						</Horizontal>
					</Horizontal>
					<div className="danger-zone-badge icon-with-text-small">
						<AlertTriangle size={14} />
						<span>{aboveThresholdSongList.length} songs above</span>
					</div>
				</Horizontal>
				<Horizontal justifyContent="space-between">
					<Button
						text="Show"
						icon={<Eye size={16} />}
						variant="light"
						color="warning"
						onClick={actions.dangerZone.aboveModal.open}
					/>
					<Button
						text="Delete"
						icon={<Trash2 size={16} />}
						variant="filled"
						color="danger"
						onClick={actions.dangerZone.deleteModal.open}
						disabled={aboveThresholdSongList.length === 0}
					/>
				</Horizontal>
			</Card>
			<Card>
				<Title order={3} text="Reset Options" icon={<RotateCcw size={20} />} color="danger" />
				<Vertical className="danger-zone-options">
					<Button
						text="Reset all skip counts"
						icon={<RotateCcw size={18} />}
						variant="filled"
						color="danger"
						className="btn-full-width"
					/>
					<Button
						text="Reset skip count for a folder"
						icon={<FolderOpen size={18} />}
						variant="light"
						color="warning"
						className="btn-full-width"
					/>
				</Vertical>
			</Card>
			<Card>
				<Title order={3} text="Warning" icon={<AlertTriangle size={20} />} color="danger" />
				These actions are irreversible. Please make sure you want to proceed before continuing.
			</Card>
		</Vertical>
	</Vertical>
);
