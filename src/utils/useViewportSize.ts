/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";

export function useWindowEvent<K extends string>(
	type: K,
	listener: K extends keyof WindowEventMap
		? (this: Window, ev: WindowEventMap[K]) => void
		: (this: Window, ev: CustomEvent) => void,
	options?: boolean | AddEventListenerOptions
) {
	useEffect(() => {
		window.addEventListener(type as any, listener, options);
		return () => window.removeEventListener(type as any, listener, options);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, listener]);
}

const eventListerOptions = {
	passive: true,
};

export function useViewportSize() {
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	const setSize = useCallback(() => {
		setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 });
	}, []);

	useWindowEvent("resize", setSize, eventListerOptions);
	useWindowEvent("orientationchange", setSize, eventListerOptions);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(setSize, []);

	return windowSize;
}
