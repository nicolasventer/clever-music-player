import { Button } from "@/components/_ui/Button";
import { Card } from "@/components/_ui/Card";
import { CardButton } from "@/components/_ui/CardButton";
import { Text } from "@/components/_ui/Text";
import { Title } from "@/components/_ui/Title";
import { useTheme, type Theme } from "@/components/_ui/useTheme";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Droplets, Leaf, Palette, Sun, Sunset, TreePine, Utensils } from "lucide-react";
import { useColorScheme } from "./_ui/useColorScheme";
import styles from "./ThemeSelector.module.css";

const themeOptions: Array<{
	value: Theme;
	label: string;
	description: string;
	icon: React.ReactNode;
	previewColors: string[];
}> = [
	{
		value: "default",
		label: "Default",
		description: "Classic purple theme",
		icon: <Palette size={20} />,
		previewColors: ["rgb(102, 126, 234)", "#764ba2", "#1a1a2e", "#16213e"],
	},
	{
		value: "ocean",
		label: "Ocean",
		description: "Deep blue teal theme",
		icon: <Droplets size={20} />,
		previewColors: ["rgb(20, 184, 166)", "rgb(13, 148, 136)", "#0f172a", "#1e293b"],
	},
	{
		value: "sunset",
		label: "Sunset",
		description: "Warm gradient theme",
		icon: <Sunset size={20} />,
		previewColors: ["rgb(236, 72, 153)", "rgb(251, 146, 60)", "#1e1b4b", "#312e81"],
	},

	{
		value: "forest",
		label: "Forest",
		description: "Natural green theme",
		icon: <TreePine size={20} />,
		previewColors: ["rgb(34, 197, 94)", "rgb(22, 163, 74)", "#0f1419", "#1a1f2e"],
	},
	{
		value: "autumn",
		label: "Autumn",
		description: "Warm orange and brown theme",
		icon: <Leaf size={20} />,
		previewColors: ["rgb(255, 140, 0)", "#d2691e", "#2d1810", "#3d2817"],
	},
	{
		value: "light",
		label: "Light",
		description: "Clean light theme",
		icon: <Sun size={20} />,
		previewColors: ["rgb(59, 130, 246)", "rgb(37, 99, 235)", "#ffffff", "#f8fafc"],
	},
	{
		value: "restaurant",
		label: "Restaurant",
		description: "Warm restaurant menu theme",
		icon: <Utensils size={20} />,
		previewColors: ["rgb(220, 118, 51)", "rgb(139, 69, 19)", "rgb(255, 248, 240)", "rgb(250, 240, 230)"],
	},
];

export const ThemeSelector = () => {
	const { theme, setTheme, isLoading } = useTheme();
	const { toggleColorScheme } = useColorScheme();

	const handleThemeChange = async (newTheme: Theme) => {
		if (newTheme === theme || isLoading) return;
		await setTheme(newTheme);
	};

	return (
		<Card>
			<Title order={3} icon={<Palette size={20} />}>
				Choose Your Theme
			</Title>
			<Text size="md" color="theme">
				Select a theme to customize your music player experience
			</Text>
			<Horizontal gap={16} widthFull overflowAuto padding={16}>
				{themeOptions.map((option) => (
					<CardButton
						key={option.value}
						isActive={theme === option.value}
						onClick={() => handleThemeChange(option.value)}
						isLoading={isLoading}
					>
						<Vertical gap={12} alignItems="center">
							<Horizontal gap={4}>
								{option.previewColors.map((color) => (
									<div key={color} className={styles["theme-preview-color"]} style={{ backgroundColor: color }} />
								))}
							</Horizontal>
							<Vertical gap={4} alignItems="center">
								<div className={styles["theme-icon"]}>{option.icon}</div>
								<Title order={5} className={styles["theme-label"]}>
									{option.label}
								</Title>
								<Text size="sm" className={styles["theme-description"]}>
									{option.description}
								</Text>
							</Vertical>
						</Vertical>
					</CardButton>
				))}
			</Horizontal>
			<Horizontal gap={8} marginTop={16} justifyContent="center">
				<Button variant="light" size="sm" onClick={() => handleThemeChange("default")} disabled={isLoading}>
					Reset to Default
				</Button>
				<Button variant="light" size="sm" onClick={() => toggleColorScheme()} disabled={isLoading}>
					Toggle Light/Dark
				</Button>
			</Horizontal>
		</Card>
	);
};
