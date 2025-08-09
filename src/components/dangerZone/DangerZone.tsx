import { AboveThresholdModal } from "@/components/dangerZone/AboveThresholdModal";
import { DeleteConfirmationModal } from "@/components/dangerZone/DeleteConfirmationModal";
import { ResetConfirmationModal } from "@/components/dangerZone/ResetConfirmationModal";
import { Button, Card, Input, Text, Title } from "@/components/ui";
import type { Song } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { AlertTriangle, Eye, RotateCcw, Target, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type DangerZone = {
	isShowAboveModalOpen: {
		value: boolean;
		open: () => void;
		close: () => void;
	};
	isShowDeleteModalOpen: {
		value: boolean;
		open: () => void;
		close: () => void;
	};
	isShowResetModalOpen: {
		value: boolean;
		open: () => void;
		close: () => void;
	};
	aboveThresholdSongList: Song[];
	threshold: {
		str: {
			value: string;
			update: React.Dispatch<React.SetStateAction<string>>;
		};
		num: {
			value: number;
			update: (value: number) => void;
		};
	};
};

const DangerZoneDisplay = ({ dangerZone }: { dangerZone: DangerZone }) => (
	<Vertical alignItems="center" flexGrow className="container">
		<Vertical heightFull padding="0 24px" style={{ maxWidth: 800 }} gap={12}>
			<Card>
				<Title order={3} icon={<Target size={20} />} color="danger">
					Skip Threshold
				</Title>
				<Horizontal justifyContent="space-between" className="danger-zone-controls">
					<Horizontal className="danger-zone-input-group" gap={8}>
						<div className="danger-zone-label">Threshold:</div>
						<Horizontal alignItems="center" style={{ gap: 4 }}>
							<Input
								type="number"
								max={99}
								style={{ width: 32, textAlign: "center" }}
								inputMode="numeric"
								value={dangerZone.threshold.str.value}
								setValue={dangerZone.threshold.str.update}
								setNumberValue={dangerZone.threshold.num.update}
							/>
							<span style={{ color: "#fecaca", fontWeight: 500 }}>%</span>
						</Horizontal>
					</Horizontal>
					<Text icon={<AlertTriangle size={16} />}>{dangerZone.aboveThresholdSongList.length} songs above</Text>
				</Horizontal>
				<Horizontal justifyContent="space-between" marginTop={12}>
					<Button icon={<Eye size={16} />} variant="light" color="warning" onClick={dangerZone.isShowAboveModalOpen.open}>
						Show
					</Button>
					<Button
						icon={<Trash2 size={16} />}
						variant="filled"
						color="danger"
						onClick={dangerZone.isShowDeleteModalOpen.open}
						disabled={dangerZone.aboveThresholdSongList.length === 0}
					>
						Delete
					</Button>
				</Horizontal>
			</Card>
			<Card>
				<Title order={3} icon={<RotateCcw size={20} />} color="danger">
					Reset Options
				</Title>
				<Button
					icon={<RotateCcw size={18} />}
					variant="light"
					color="danger"
					fullWidth
					onClick={dangerZone.isShowResetModalOpen.open}
				>
					Reset all
				</Button>
			</Card>
			<Card>
				<Title order={3} icon={<AlertTriangle size={20} />} color="danger">
					Warning
				</Title>
				These actions are irreversible. Please make sure you want to proceed before continuing.
			</Card>
		</Vertical>
		<AboveThresholdModal
			isOpen={dangerZone.isShowAboveModalOpen.value}
			onClose={dangerZone.isShowAboveModalOpen.close}
			songs={dangerZone.aboveThresholdSongList}
			threshold={dangerZone.threshold.num.value}
		/>
		<DeleteConfirmationModal
			isOpen={dangerZone.isShowDeleteModalOpen.value}
			onClose={dangerZone.isShowDeleteModalOpen.close}
			songs={dangerZone.aboveThresholdSongList}
			threshold={dangerZone.threshold.num.value}
		/>
		<ResetConfirmationModal isOpen={dangerZone.isShowResetModalOpen.value} onClose={dangerZone.isShowResetModalOpen.close} />
	</Vertical>
);

export type DangerZoneProps = {
	threshold: { value: number; update: (value: number) => void };
	songList: Song[];
};

export const DangerZone = ({ threshold, songList }: DangerZoneProps) => {
	const [isShowAboveModalOpen, setIsShowAboveModalOpen] = useState(false);
	const openShowAboveModal = () => setIsShowAboveModalOpen(true);
	const closeShowAboveModal = () => setIsShowAboveModalOpen(false);

	const [isShowDeleteModalOpen, setIsShowDeleteModalOpen] = useState(false);
	const openShowDeleteModal = () => setIsShowDeleteModalOpen(true);
	const closeShowDeleteModal = () => setIsShowDeleteModalOpen(false);

	const [isShowResetModalOpen, setIsShowResetModalOpen] = useState(false);
	const openShowResetModal = () => setIsShowResetModalOpen(true);
	const closeShowResetModal = () => setIsShowResetModalOpen(false);

	const [thresholdStr, setThresholdStr] = useState(() => Math.round(threshold.value * 100).toString());
	const updateThresholdNum = useCallback((value: number) => threshold.update(value / 100), [threshold]);

	const aboveThresholdSongList = useMemo(
		() => songList.filter((song) => song.skipOdds > threshold.value),
		[songList, threshold.value]
	);

	const dangerZone = useMemo(
		() => ({
			isShowAboveModalOpen: { value: isShowAboveModalOpen, open: openShowAboveModal, close: closeShowAboveModal },
			isShowDeleteModalOpen: { value: isShowDeleteModalOpen, open: openShowDeleteModal, close: closeShowDeleteModal },
			isShowResetModalOpen: { value: isShowResetModalOpen, open: openShowResetModal, close: closeShowResetModal },
			aboveThresholdSongList,
			threshold: {
				str: { value: thresholdStr, update: setThresholdStr },
				num: { value: threshold.value, update: updateThresholdNum },
			},
		}),
		[
			aboveThresholdSongList,
			isShowAboveModalOpen,
			isShowDeleteModalOpen,
			isShowResetModalOpen,
			threshold.value,
			thresholdStr,
			updateThresholdNum,
		]
	);

	return <DangerZoneDisplay dangerZone={dangerZone} />;
};
