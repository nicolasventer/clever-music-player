import { useEffect, useState } from "react";

export type ColorScheme = "light" | "dark";

export const useColorScheme = () => {
	const [colorScheme, setColorSchemeState] = useState<ColorScheme | null>(
		() => document.documentElement.getAttribute("data-theme") as ColorScheme | null
	);

	const setColorScheme = (newColorScheme: ColorScheme) => {
		document.documentElement.setAttribute("data-theme", newColorScheme);
		setColorSchemeState(newColorScheme);
	};

	const toggleColorScheme = () => {
		const newScheme: ColorScheme = colorScheme === "light" ? "dark" : "light";
		setColorScheme(newScheme);
		return newScheme;
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => void (!colorScheme && setColorScheme("light")), []);

	return {
		colorScheme,
		setColorScheme,
		toggleColorScheme,
	};
};
