import { AlertTriangle, Edit, Music, Pause, Play, Search, SkipBack, SkipForward, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button, Card, SearchInput, Slider, Tab, Title } from "./index";

export const ComponentDemo: React.FC = () => {
	const [activeTab, setActiveTab] = useState("player");
	const [sliderValue, setSliderValue] = useState(35);
	const [searchValue, setSearchValue] = useState("");

	return (
		<div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
			<Title order={1} text="UI Components Demo" icon={<Music size={32} />} />

			{/* Tabs Demo */}
			<Card>
				<Title order={3} text="Tabs" />
				<div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
					<Tab
						isActive={activeTab === "player"}
						tabCount={3}
						text="Player"
						icon={<Music size={16} />}
						onClick={() => setActiveTab("player")}
					/>
					<Tab
						isActive={activeTab === "playlist"}
						tabCount={3}
						text="Playlist"
						icon={<Play size={16} />}
						onClick={() => setActiveTab("playlist")}
					/>
					<Tab isActive={activeTab === "settings"} tabCount={3} text="Settings" onClick={() => setActiveTab("settings")} />
				</div>
			</Card>

			{/* Buttons Demo */}
			<Card>
				<Title order={3} text="Buttons" />
				<div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
					<Button text="Play" icon={<Play size={16} />} variant="filled" color="theme" />
					<Button text="Pause" icon={<Pause size={16} />} variant="light" color="theme" />
					<Button text="Edit" icon={<Edit size={16} />} variant="filled" color="warning" />
					<Button text="Delete" icon={<Trash2 size={16} />} variant="filled" color="danger" />
					<Button icon={<SkipBack size={16} />} variant="filled" isCompact />
					<Button icon={<SkipForward size={16} />} variant="light" isCompact />
				</div>
			</Card>

			{/* Slider Demo */}
			<Card>
				<Title order={3} text="Slider" />
				<div style={{ marginBottom: "24px" }}>
					<Slider value={sliderValue} onChange={setSliderValue} min={0} max={100} />
					<div style={{ textAlign: "center", marginTop: "8px" }}>Value: {sliderValue}%</div>
				</div>
			</Card>

			{/* Search Input Demo */}
			<Card>
				<Title order={3} text="Search Input" />
				<div style={{ marginBottom: "24px" }}>
					<SearchInput value={searchValue} onChange={setSearchValue} placeholder="Search songs..." />
					<div style={{ marginTop: "8px", fontSize: "14px", color: "#cbd5e1" }}>Search value: "{searchValue}"</div>
				</div>
			</Card>

			{/* Titles Demo */}
			<Card>
				<Title order={3} text="Titles" />
				<div style={{ marginBottom: "24px" }}>
					<Title order={1} text="Title 1" icon={<Music size={24} />} />
					<Title order={2} text="Title 2" icon={<Play size={20} />} />
					<Title order={3} text="Title 3" icon={<Pause size={18} />} />
					<Title order={4} text="Title 4" icon={<Search size={16} />} />
					<Title order={3} text="Warning Title" icon={<AlertTriangle size={18} />} color="warning" />
					<Title order={3} text="Danger Title" icon={<Trash2 size={18} />} color="danger" />
				</div>
			</Card>

			{/* Card Demo */}
			<Card>
				<Title order={3} text="Cards" />
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
					<Card>
						<Title order={4} text="Card 1" />
						<p>This is a nested card with some content.</p>
					</Card>
					<Card>
						<Title order={4} text="Card 2" />
						<p>Another card with different content.</p>
					</Card>
				</div>
			</Card>
		</div>
	);
};
