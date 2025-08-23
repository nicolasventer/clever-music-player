import { ComponentDemo } from "@/components/ComponentDemo";
import "@/components/_ui/index.css";
import { FullViewport, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";

export const App = () => (
	<FullViewport>
		<WriteToolboxClasses />
		<Vertical overflowAuto widthFull heightFull>
			<ComponentDemo />
		</Vertical>
	</FullViewport>
);
