import { Button, Card, Title } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { AlertTriangle, Eye, FolderOpen, RotateCcw, Target, Trash2 } from "lucide-react";

export const DangerZone = () => {
	return (
		<Vertical alignItems="center" flexGrow>
			<Vertical className="danger-zone-container">
				<Card className="danger-zone-section">
					<Title order={3} text="Skip Threshold" icon={<Target size={20} />} color="danger" />
					<Horizontal justifyContent="space-between" className="danger-zone-controls">
						<Horizontal className="danger-zone-input-group">
							<div className="danger-zone-label">Threshold:</div>
							<input type="number" className="input-number-small" defaultValue="3" />
						</Horizontal>
						<div className="danger-zone-badge icon-with-text-small">
							<AlertTriangle size={14} />
							<span>5 songs below</span>
						</div>
					</Horizontal>
					<Horizontal justifyContent="space-between">
						<Button text="Show" icon={<Eye size={16} />} variant="light" color="warning" />
						<Button text="Delete" icon={<Trash2 size={16} />} variant="filled" color="danger" />
					</Horizontal>
				</Card>
				<Card className="danger-zone-section">
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
				<div className="danger-zone-warning">
					<p className="danger-zone-warning-text icon-with-text">
						<AlertTriangle size={16} />
						<span>
							<strong>Warning:</strong> These actions are irreversible. Please make sure you want to proceed before continuing.
						</span>
					</p>
				</div>
			</Vertical>
		</Vertical>
	);
};
