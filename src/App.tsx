import { ComponentDemo } from "@/components/ui";
import { FullViewport, WriteToolboxClasses } from "@/utils/ComponentToolbox";

export const App = () => (
	<FullViewport>
		<WriteToolboxClasses />
		<ComponentDemo />
	</FullViewport>
);
