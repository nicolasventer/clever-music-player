import { Button, Card, CardButton, Text, Title } from "@/components/ui";
import { useTheme, type Theme } from "@/components/useTheme";
import "@/ThemeSelector.css";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Droplets, Palette, Sparkles, Stars, Sun, Sunset, TreePine, Zap } from "lucide-react";

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
		value: "neon",
		label: "Neon",
		description: "Bright cyberpunk theme",
		icon: <Zap size={20} />,
		previewColors: ["rgb(0, 255, 255)", "rgb(255, 0, 255)", "#0a0a0a", "#1a1a1a"],
	},
	{
		value: "forest",
		label: "Forest",
		description: "Natural green theme",
		icon: <TreePine size={20} />,
		previewColors: ["rgb(34, 197, 94)", "rgb(22, 163, 74)", "#0f1419", "#1a1f2e"],
	},
	{
		value: "light",
		label: "Light",
		description: "Clean light theme",
		icon: <Sun size={20} />,
		previewColors: ["rgb(59, 130, 246)", "rgb(37, 99, 235)", "#ffffff", "#f8fafc"],
	},
	{
		value: "aurora",
		label: "Aurora",
		description: "Colorful gradient theme",
		icon: <Sparkles size={20} />,
		previewColors: ["rgb(147, 51, 234)", "rgb(59, 130, 246)", "#0a0a23", "#1a1a3a"],
	},
	{
		value: "galaxy",
		label: "Galaxy",
		description: "Deep space theme",
		icon: <Stars size={20} />,
		previewColors: ["rgb(139, 92, 246)", "rgb(124, 58, 237)", "#0a0a0f", "#1a1a2e"],
	},
];

export const ThemeSelector = () => {
	const { theme, setTheme, isLoading } = useTheme();

	const handleThemeChange = async (newTheme: Theme) => {
		if (newTheme === theme || isLoading) return;
		await setTheme(newTheme);
	};

	return (
		<Card>
			<Title order={3} icon={<Palette size={20} />}>
				Choose Your Theme
			</Title>
			<Text size="medium" color="theme">
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
									<div key={color} className="theme-preview-color" style={{ backgroundColor: color }} />
								))}
							</Horizontal>
							<Vertical gap={4} alignItems="center">
								<div className="theme-icon">{option.icon}</div>
								<Title order={5} className="theme-label">
									{option.label}
								</Title>
								<Text size="small" className="theme-description">
									{option.description}
								</Text>
							</Vertical>
						</Vertical>
					</CardButton>
				))}
			</Horizontal>
			<Horizontal gap={8} marginTop={16} justifyContent="center">
				<Button variant="light" size="small" onClick={() => handleThemeChange("default")} disabled={isLoading}>
					Reset to Default
				</Button>
			</Horizontal>
		</Card>
	);
};
