import { ComponentDemo } from "@/components/ui";
import { FullViewport, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";
import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export const App = () => {
	const { updateServiceWorker, needRefresh } = useRegisterSW({ immediate: true });

	useEffect(() => void (needRefresh && updateServiceWorker(true)), [needRefresh, updateServiceWorker]);

	return (
		<FullViewport>
			<WriteToolboxClasses />
			<Vertical overflowAuto widthFull heightFull>
				<ComponentDemo />
			</Vertical>
		</FullViewport>
	);
};
