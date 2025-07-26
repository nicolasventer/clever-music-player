import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useClickOutside<T extends HTMLElement = any>(
	callback: () => void,
	events?: string[] | null,
	nodes?: (HTMLElement | null)[]
) {
	const ref = useRef<T>(null);
	const eventsList = events || DEFAULT_EVENTS;

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const listener = (event: any) => {
			const { target } = event ?? {};
			if (Array.isArray(nodes)) {
				const shouldIgnore = !document.body.contains(target) && target.tagName !== "HTML";
				const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node));
				if (shouldTrigger && !shouldIgnore) callback();
			} else if (ref.current && !ref.current.contains(target)) {
				callback();
			}
		};

		eventsList.forEach((fn) => document.addEventListener(fn, listener));

		return () => {
			eventsList.forEach((fn) => document.removeEventListener(fn, listener));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref, callback, nodes]);

	return ref;
}
