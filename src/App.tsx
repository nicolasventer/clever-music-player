import { MusicPlayer } from "@/components/MusicPlayer";
import "@/components/_ui/index.css";
import "@/components/_ui/themes/ocean.css";
import { FullViewport, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";

export const App = () => (
	<FullViewport>
		<WriteToolboxClasses />
		<Vertical overflowAuto widthFull heightFull>
			<MusicPlayer />
		</Vertical>
	</FullViewport>
);
