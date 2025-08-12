import { useRef, useState } from "react";

/* THEME LOADER UTILITY */

export type Theme = "default" | "ocean" | "sunset" | "neon" | "forest" | "light" | "aurora" | "galaxy";

export const useTheme = () => {
	const [theme, setTheme_] = useState<Theme>("default");
	const [isLoading, setIsLoading] = useState(false);

	const cssMap = useRef(new Map<Theme, string>());

	const setTheme = async (newTheme: Theme) => {
		const cssEl = document.querySelector(`style[data-vite-dev-id$="${theme}.css"]`);
		cssMap.current.set(theme, cssEl?.textContent ?? "");
		const css = cssMap.current.get(newTheme);
		if (css) {
			const cssEl = document.createElement("style");
			cssEl.setAttribute("data-vite-dev-id", `${newTheme}.css`);
			cssEl.textContent = css;
			document.head.appendChild(cssEl);
		} else {
			const promise = new Promise<void>((resolve) => {
				setIsLoading(true);
				setTimeout(async () => {
					await import(`./themes/${newTheme}.css`);
					setIsLoading(false);
					resolve();
				}, 200);
			});
			await promise;
		}
		cssEl?.remove();
		setTheme_(newTheme);
	};

	return { theme, setTheme, isLoading };
};
