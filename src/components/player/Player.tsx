import { Button, Title } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Pause, SkipBack, SkipForward } from "lucide-react";

export const Player = () => (
	<Vertical alignItems="center" flexGrow>
		<div className="player-container">
			<img src="https://fastly.picsum.photos/id/830/300/300.jpg?hmac=ir_VjfhHplWelY0wWwUlqdRl_N4KTR-caNJPFMUz2r8" alt="cover" />
		</div>
		<Title order={3} text="🎶 Bohemian Rhapsody" />
		<Title order={4} text="👤 Queen • A Night at the Opera" />
		<Vertical width={300} className="player-controls">
			<Horizontal justifyContent="space-between" className="time-display">
				<div>01:21</div>
				<div>03:45</div>
			</Horizontal>
			<div className="progress-container">
				<div className="progress-bar" style={{ width: "35%" }}></div>
			</div>
			<Horizontal justifyContent="center" style={{ gap: "16px", marginTop: "24px" }}>
				<Button icon={<SkipBack size={20} />} variant="filled" isCompact />
				<Button icon={<Pause size={20} />} variant="filled" isCompact />
				<Button icon={<SkipForward size={20} />} variant="filled" isCompact />
			</Horizontal>
		</Vertical>
	</Vertical>
);
