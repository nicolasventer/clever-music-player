import { actions } from "@/actions/actions";
import { Button, Modal } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { AlertTriangle, RotateCcw } from "lucide-react";

export type ResetConfirmationModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const ResetConfirmationModal = ({ isOpen, onClose }: ResetConfirmationModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} title="Confirm Reset" icon={<AlertTriangle size={20} />} closeOnClickOutside>
		<Vertical gap={16}>
			<div style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
				<p style={{ margin: "0 0 12px 0", fontWeight: 600, color: "#fecaca" }}>⚠️ This action cannot be undone!</p>
				<p style={{ margin: 0 }}>You are about to reset all song statistics. This will:</p>
				<ul style={{ margin: "8px 0 0 0", paddingLeft: "20px" }}>
					<li>Set all play/skip counts to 0</li>
					<li>Reset all skip odds to 0</li>
				</ul>
			</div>
			<Horizontal gap={12} justifyContent="center">
				<Button text="Cancel" variant="light" onClick={onClose} />
				<Button
					text="Reset All"
					icon={<RotateCcw size={16} />}
					variant="filled"
					color="danger"
					onClick={() => {
						actions.dangerZone.resetAll();
						onClose();
					}}
				/>
			</Horizontal>
		</Vertical>
	</Modal>
);
