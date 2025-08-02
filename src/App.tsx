import { ComponentDemo } from "@/components/ui";
import { FullViewport, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";

export const App = () => (
	<FullViewport>
		<WriteToolboxClasses />
		<Vertical overflowAuto widthFull heightFull>
			<ComponentDemo />
		</Vertical>
	</FullViewport>
);
