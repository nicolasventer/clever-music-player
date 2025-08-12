import { MusicPlayer } from "@/components/MusicPlayer";
import { FullViewport, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";

import "@/components/themes/ocean.css";

export const App = () => (
	<FullViewport>
		<WriteToolboxClasses />
		<Vertical overflowAuto widthFull heightFull>
			<MusicPlayer />
		</Vertical>
	</FullViewport>
);
