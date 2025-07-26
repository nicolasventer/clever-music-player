import { actions } from "@/actions/actions";
import { Button, Modal } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { FolderOpen, Music } from "lucide-react";

export type NoMusicModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const NoMusicModal = ({ isOpen, onClose }: NoMusicModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} title="No Music Found" icon={<Music size={20} />} closeOnClickOutside>
		<Vertical gap={16}>
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
		</Vertical>
	</Modal>
);
