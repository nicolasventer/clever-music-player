import { FileBrowserDemo } from "@/components/FileBrowserDemo";
import { ThemeSelector } from "@/components/ThemeSelector";
import { Button } from "@/components/_ui/Button";
import { Card } from "@/components/_ui/Card";
import { CardButton } from "@/components/_ui/CardButton";
import { Carousel } from "@/components/_ui/Carousel";
import { Divider } from "@/components/_ui/Divider";
import { Input } from "@/components/_ui/Input";
import { LoadingOverlay } from "@/components/_ui/LoadingOverlay";
import { Modal } from "@/components/_ui/Modal";
import { NativeSelect } from "@/components/_ui/NativeSelect";
import { NodeCompare } from "@/components/_ui/NodeCompare";
import { SearchInput } from "@/components/_ui/SearchInput";
import { Slider } from "@/components/_ui/Slider";
import { Switch } from "@/components/_ui/Switch";
import { Tab } from "@/components/_ui/Tab";
import { TabGroup, asTabItems } from "@/components/_ui/TabGroup";
import { Tag } from "@/components/_ui/Tag";
import { Text } from "@/components/_ui/Text";
import { Title } from "@/components/_ui/Title";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import {
	Download,
	Heart,
	Home,
	Loader2,
	Music,
	Play,
	Search,
	Settings,
	Share2,
	SkipBack,
	SkipForward,
	Text as TextIcon,
	Volume2,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

export const ComponentDemo = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [numberValue, setNumberValue] = useState(50);
	const [sliderValue, setSliderValue] = useState(75);
	const [activeTab, setActiveTab] = useState(0);
	const [tabGroupValue, setTabGroupValue] = useState("home");
	const [verticalTabGroupValue, setVerticalTabGroupValue] = useState("library");
	const [isLoading, setIsLoading] = useState(false);

	// Switch demo state
	const [controlledSwitch, setControlledSwitch] = useState(false);
	const [themeSwitch, setThemeSwitch] = useState(true);
	const [successSwitch, setSuccessSwitch] = useState(false);
	const [warningSwitch, setWarningSwitch] = useState(false);
	const [dangerSwitch, setDangerSwitch] = useState(false);

	const [selectedTheme, setSelectedTheme] = useState("default");
	const [selectedColor, setSelectedColor] = useState<"theme" | "white" | "danger" | "warning" | "success" | "">("theme");

	return (
		<Vertical gap={24} padding={24} widthFull heightFull overflowAuto>
			<Title order={1} icon={<Music size={24} />}>
				UI Component Library Demo
			</Title>

			{/* Theme Selector */}
			<ThemeSelector />

			{/* Button Demo */}
			<Card>
				<Title order={2} icon={<Play size={20} />}>
					Button Component
				</Title>

				<Vertical gap={16}>
					{/* Variants */}
					<div>
						<Text size="md" color="theme">
							Variants
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Button variant="filled">Filled Button</Button>
							<Button variant="light">Light Button</Button>
						</Horizontal>
					</div>

					{/* Sizes */}
					<div>
						<Text size="md" color="theme">
							Sizes
						</Text>
						<Horizontal gap={8} marginTop={8} alignItems="center">
							<Button size="sm">Small</Button>
							<Button size="md">Medium</Button>
							<Button size="lg">Large</Button>
						</Horizontal>
					</div>

					{/* Colors */}
					<div>
						<Text size="md" color="theme">
							Colors
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Text size="sm" color="theme">
								Filled Variant
							</Text>
							<Horizontal gap={8}>
								<Button color="theme">Theme</Button>
								<Button color="success">Success</Button>
								<Button color="warning">Warning</Button>
								<Button color="danger">Danger</Button>
							</Horizontal>
							<Text size="sm" color="theme">
								Light Variant
							</Text>
							<Horizontal gap={8}>
								<Button variant="light" color="theme">
									Theme
								</Button>
								<Button variant="light" color="success">
									Success
								</Button>
								<Button variant="light" color="warning">
									Warning
								</Button>
								<Button variant="light" color="danger">
									Danger
								</Button>
							</Horizontal>
						</Vertical>
					</div>

					{/* With Icons */}
					<div>
						<Text size="md" color="theme">
							With Icons
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Button icon={<Play size={16} />}>Play</Button>
							<Button icon={<Heart size={16} />} variant="light">
								Like
							</Button>
							<Button icon={<Download size={16} />} color="success">
								Download
							</Button>
							<Button icon={<Share2 size={16} />} color="warning">
								Share
							</Button>
						</Horizontal>
					</div>

					{/* Circular Buttons */}
					<div>
						<Text size="md" color="theme">
							Circular Buttons
						</Text>
						<Horizontal gap={8} marginTop={8} alignItems="center">
							<Button circular size="sm" icon={<Play size={12} />} />
							<Button circular size="md" icon={<Play size={16} />} />
							<Button circular size="lg" icon={<Play size={20} />} />
							<Button circular variant="light" icon={<Heart size={16} />} />
							<Button circular color="success" icon={<Download size={16} />} />
							<Button circular color="danger" icon={<Settings size={16} />} />
						</Horizontal>
					</div>

					{/* Border Radius Sizes */}
					<div>
						<Text size="md" color="theme">
							Border Radius Sizes
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Button borderRadiusSize="none">No Radius</Button>
							<Button borderRadiusSize="sm">Small Radius</Button>
							<Button borderRadiusSize="md">Medium Radius</Button>
							<Button borderRadiusSize="lg">Large Radius</Button>
						</Horizontal>
					</div>

					{/* Full Width */}
					<div>
						<Text size="md" color="theme">
							Full Width
						</Text>
						<Vertical marginTop={8}>
							<Button fullWidth icon={<Play size={16} />}>
								Full Width Button
							</Button>
						</Vertical>
					</div>

					{/* Shadow Options */}
					<div>
						<Text size="md" color="theme">
							Shadow Options
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Button>With Shadow (Default)</Button>
							<Button noShadow>No Shadow</Button>
							<Button variant="light">Light No Shadow</Button>
							<Button variant="light" shadow>
								Light With Shadow
							</Button>
						</Horizontal>
					</div>

					{/* Disabled State */}
					<div>
						<Text size="md" color="theme">
							Disabled State
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Button disabled>Disabled Button</Button>
							<Button disabled variant="light">
								Disabled Light
							</Button>
							<Button disabled color="success">
								Disabled Success
							</Button>
							<Button disabled color="warning">
								Disabled Warning
							</Button>
							<Button disabled color="danger">
								Disabled Danger
							</Button>
						</Horizontal>
					</div>

					{/* Custom Border Radius */}
					<div>
						<Text size="md" color="theme">
							Custom Border Radius
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Button borderRadius={["top-left", "bottom-right"]}>Top Left + Bottom Right</Button>
							<Button borderRadius={["top-left", "top-right"]}>Top Corners Only</Button>
							<Button borderRadius={["bottom-left", "bottom-right"]}>Bottom Corners Only</Button>
						</Horizontal>
					</div>

					{/* Loading State */}
					<div>
						<Text size="md" color="theme">
							Loading State
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Horizontal gap={8}>
								<Button
									isLoading={isLoading}
									onClick={() => {
										setIsLoading(true);
										setTimeout(() => setIsLoading(false), 2000);
									}}
								>
									{isLoading ? "Loading..." : "Click to Load"}
								</Button>
								<Button
									variant="light"
									isLoading={isLoading}
									onClick={() => {
										setIsLoading(true);
										setTimeout(() => setIsLoading(false), 2000);
									}}
								>
									{isLoading ? "Processing..." : "Light Loading"}
								</Button>
								<Button
									color="success"
									isLoading={isLoading}
									onClick={() => {
										setIsLoading(true);
										setTimeout(() => setIsLoading(false), 2000);
									}}
								>
									{isLoading ? "Saving..." : "Save Data"}
								</Button>
							</Horizontal>
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* Card Demo */}
			<Card>
				<Title order={2} icon={<Settings size={20} />}>
					Card Component
				</Title>

				<Horizontal gap={16} marginTop={16}>
					<Card borderRadiusSize="none">
						<Vertical padding={16}>
							<Text>No Border Radius</Text>
						</Vertical>
					</Card>
					<Card borderRadiusSize="sm">
						<Vertical padding={16}>
							<Text>Small Border Radius</Text>
						</Vertical>
					</Card>
					<Card borderRadiusSize="md">
						<Vertical padding={16}>
							<Text>Medium Border Radius</Text>
						</Vertical>
					</Card>
					<Card borderRadiusSize="lg">
						<Vertical padding={16}>
							<Text>Large Border Radius</Text>
						</Vertical>
					</Card>
				</Horizontal>

				{/* Scrollable Examples */}
				<div style={{ marginTop: "24px" }}>
					<Text size="md" color="theme">
						Scrollable Variants
					</Text>
					<Horizontal gap={16} marginTop={16}>
						{/* Vertical Scrollable */}
						<Card scrollable="y" style={{ height: "200px" }}>
							<Vertical padding={16} gap={8}>
								<Text>Vertical Scrollable</Text>
								{Array.from({ length: 20 }, (_, i) => (
									<Text key={i} size="sm">
										Line {i + 1} - This is a long line of text to demonstrate vertical scrolling
									</Text>
								))}
							</Vertical>
						</Card>

						{/* Horizontal Scrollable */}
						<Card scrollable="x" style={{ width: "300px" }}>
							<Horizontal padding={16} gap={8} style={{ minWidth: "600px" }}>
								<Text>Horizontal Scrollable</Text>
								{Array.from({ length: 10 }, (_, i) => (
									<Card key={i} style={{ minWidth: "120px", padding: "8px" }}>
										<Text size="sm">Item {i + 1}</Text>
									</Card>
								))}
							</Horizontal>
						</Card>

						{/* Both Directions Scrollable */}
						<Card scrollable="xy" style={{ height: "200px", width: "300px" }}>
							<Vertical padding={16} gap={8} style={{ minWidth: "600px" }}>
								<Text>Both Directions Scrollable</Text>
								{Array.from({ length: 15 }, (_, i) => (
									<Horizontal key={i} gap={8} style={{ minWidth: "600px" }}>
										<Text size="sm">Row {i + 1}:</Text>
										{Array.from({ length: 8 }, (_, j) => (
											<Text key={j} size="sm">
												Col {j + 1}
											</Text>
										))}
									</Horizontal>
								))}
							</Vertical>
						</Card>
					</Horizontal>
				</div>
			</Card>

			{/* Divider Demo */}
			<Card>
				<Title order={2} icon={<Settings size={20} />}>
					Divider Component
				</Title>

				<Vertical gap={16}>
					{/* Basic Divider */}
					<div>
						<Text size="md" color="theme">
							Basic Divider
						</Text>
						<Vertical marginTop={8}>
							<Divider />
						</Vertical>
					</div>

					{/* With Text */}
					<div>
						<Text size="md" color="theme">
							With Text
						</Text>
						<Vertical marginTop={8}>
							<Divider>Or</Divider>
						</Vertical>
					</div>

					{/* With Icon and Text */}
					<div>
						<Text size="md" color="theme">
							With Icon and Text
						</Text>
						<Vertical marginTop={8}>
							<Divider>
								<Text icon={<Settings size={16} />}>Settings</Text>
							</Divider>
						</Vertical>
					</div>

					{/* Size Variants */}
					<div>
						<Text size="md" color="theme">
							Size Variants
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Divider size="sm" />
							<Divider size="md" />
							<Divider size="lg" />
						</Vertical>
					</div>

					{/* Color Variants */}
					<div>
						<Text size="md" color="theme">
							Color Variants
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Divider color="theme" />
							<Divider color="success" />
							<Divider color="warning" />
							<Divider color="danger" />
						</Vertical>
					</div>

					{/* Content Position */}
					<div>
						<Text size="md" color="theme">
							Content Position
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Divider contentPosition={0}>Left (0)</Divider>
							<Divider contentPosition={0.1}>Left (0.1)</Divider>
							<Divider contentPosition={0.2}>Left (0.2)</Divider>
							<Divider contentPosition={0.5}>Center (0.5)</Divider>
							<Divider contentPosition={0.8}>Right (0.8)</Divider>
							<Divider contentPosition={0.9}>Right (0.9)</Divider>
							<Divider contentPosition={1}>Right (1)</Divider>
						</Vertical>
					</div>

					{/* Vertical Orientation */}
					<div>
						<Text size="md" color="theme">
							Vertical Orientation
						</Text>
						<Horizontal gap={16} marginTop={8} alignItems="center" height={200}>
							<Divider orientation="vertical" />
							<Divider orientation="vertical">
								<Text>Center</Text>
							</Divider>
							<Divider orientation="vertical" contentPosition={0.8}>
								<Text>Bottom</Text>
							</Divider>
						</Horizontal>
					</div>
				</Vertical>
			</Card>

			{/* Tag Demo */}
			<Card>
				<Title order={2} icon={<TextIcon size={20} />}>
					Tag Component
				</Title>

				<Vertical gap={16}>
					{/* Static Tags (no onClick) */}
					<div>
						<Text size="md" color="theme">
							Static Tags (No onClick)
						</Text>
						<Text size="sm" color="white">
							Default cursor, no hover effects, no translation
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Tag>React</Tag>
							<Tag color="success">TypeScript</Tag>
							<Tag color="warning">JavaScript</Tag>
							<Tag color="danger">CSS</Tag>
							<Tag variant="light">HTML</Tag>
						</Horizontal>
					</div>

					{/* Interactive Tags (with onClick) */}
					<div>
						<Text size="md" color="theme">
							Interactive Tags (With onClick)
						</Text>
						<Text size="sm" color="white">
							Pointer cursor, hover effects, translation enabled
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Tag onClick={() => alert("React tag clicked!")}>React</Tag>
							<Tag color="success" onClick={() => alert("TypeScript tag clicked!")}>
								TypeScript
							</Tag>
							<Tag color="warning" onClick={() => alert("JavaScript tag clicked!")}>
								JavaScript
							</Tag>
							<Tag color="danger" onClick={() => alert("CSS tag clicked!")}>
								CSS
							</Tag>
							<Tag variant="light" onClick={() => alert("HTML tag clicked!")}>
								HTML
							</Tag>
						</Horizontal>
					</div>

					{/* Tag Variants */}
					<div>
						<Text size="md" color="theme">
							Tag Variants
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Tag variant="filled">Filled</Tag>
							<Tag variant="light">Light</Tag>
							<Tag variant="filled" color="success">
								Success
							</Tag>
							<Tag variant="light" color="warning">
								Warning
							</Tag>
							<Tag variant="filled" color="danger">
								Danger
							</Tag>
						</Horizontal>
					</div>

					{/* Tag with Icons */}
					<div>
						<Text size="md" color="theme">
							Tags with Icons
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Tag icon={<Music size={12} />}>Music</Tag>
							<Tag icon={<Heart size={12} />} color="success">
								Favorites
							</Tag>
							<Tag icon={<Play size={12} />} color="warning">
								Playing
							</Tag>
							<Tag icon={<Settings size={12} />} color="danger">
								Settings
							</Tag>
						</Horizontal>
					</div>
				</Vertical>
			</Card>

			{/* CardButton Demo */}
			<Card>
				<Title order={2} icon={<Heart size={20} />}>
					CardButton Component
				</Title>

				<Vertical gap={16}>
					{/* Basic CardButton */}
					<div>
						<Text size="md" color="theme">
							Basic CardButton
						</Text>
						<Horizontal gap={16} marginTop={8}>
							<CardButton>
								<Vertical padding={16}>
									<Text>Clickable Card</Text>
								</Vertical>
							</CardButton>
							<CardButton isActive>
								<Vertical padding={16}>
									<Text>Active Card</Text>
								</Vertical>
							</CardButton>
						</Horizontal>
					</div>

					{/* CardButton with Different Border Radius */}
					<div>
						<Text size="md" color="theme">
							Border Radius Variants
						</Text>
						<Horizontal gap={16} marginTop={8}>
							<CardButton borderRadiusSize="none">
								<Vertical padding={16}>
									<Text>No Radius</Text>
								</Vertical>
							</CardButton>
							<CardButton borderRadiusSize="sm">
								<Vertical padding={16}>
									<Text>Small Radius</Text>
								</Vertical>
							</CardButton>
							<CardButton borderRadiusSize="md">
								<Vertical padding={16}>
									<Text>Medium Radius</Text>
								</Vertical>
							</CardButton>
							<CardButton borderRadiusSize="lg">
								<Vertical padding={16}>
									<Text>Large Radius</Text>
								</Vertical>
							</CardButton>
						</Horizontal>
					</div>

					{/* CardButton with Icons */}
					<div>
						<Text size="md" color="theme">
							With Icons
						</Text>
						<Horizontal gap={16} marginTop={8}>
							<CardButton>
								<Horizontal gap={12} padding={16} alignItems="center">
									<Music size={20} />
									<Vertical>
										<Text>Music Library</Text>
										<Text size="sm" color="theme">
											Browse your collection
										</Text>
									</Vertical>
								</Horizontal>
							</CardButton>
							<CardButton isActive>
								<Horizontal gap={12} padding={16} alignItems="center">
									<Heart size={20} />
									<Vertical>
										<Text>Favorites</Text>
										<Text size="sm" color="theme">
											Your liked songs
										</Text>
									</Vertical>
								</Horizontal>
							</CardButton>
							<CardButton>
								<Horizontal gap={12} padding={16} alignItems="center">
									<Settings size={20} />
									<Vertical>
										<Text>Settings</Text>
										<Text size="sm" color="theme">
											Configure app
										</Text>
									</Vertical>
								</Horizontal>
							</CardButton>
						</Horizontal>
					</div>

					{/* Disabled State */}
					<div>
						<Text size="md" color="theme">
							Disabled State
						</Text>
						<Horizontal gap={16} marginTop={8}>
							<CardButton disabled>
								<Vertical padding={16}>
									<Text>Disabled Card</Text>
								</Vertical>
							</CardButton>
							<CardButton disabled isActive>
								<Vertical padding={16}>
									<Text>Disabled Active Card</Text>
								</Vertical>
							</CardButton>
							<CardButton disabled>
								<Horizontal gap={12} padding={16} alignItems="center">
									<Settings size={20} />
									<Vertical>
										<Text>Disabled Settings</Text>
										<Text size="sm" color="theme">
											Unavailable
										</Text>
									</Vertical>
								</Horizontal>
							</CardButton>
						</Horizontal>
					</div>
				</Vertical>
			</Card>

			{/* Input Demo */}

			{/* SearchInput Demo */}
			<Card>
				<Title order={2} icon={<Search size={20} />}>
					SearchInput Component
				</Title>

				<Vertical gap={16}>
					<div>
						<Text size="md" color="theme">
							Search Input
						</Text>
						<Vertical marginTop={8}>
							<SearchInput value={searchValue} setValue={setSearchValue} placeholder="Search for music..." />
						</Vertical>
					</div>

					{/* Color Variants */}
					<div>
						<Text size="md" color="theme">
							Color Variants
						</Text>
						<Vertical gap={8} marginTop={8}>
							<SearchInput color="theme" placeholder="Theme color (default)" />
							<SearchInput color="white" placeholder="White color" />
							<SearchInput color="success" placeholder="Success color" />
							<SearchInput color="warning" placeholder="Warning color" />
							<SearchInput color="danger" placeholder="Danger color" />
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* Slider Demo */}
			<Card>
				<Title order={2} icon={<Volume2 size={20} />}>
					Slider Component
				</Title>

				<Vertical gap={16}>
					<div>
						<Text size="md" color="theme">
							Volume Slider
						</Text>
						<Vertical marginTop={8}>
							<Slider value={sliderValue} setValue={setSliderValue} min={0} max={100} />
						</Vertical>
						<Text size="sm" color="theme">
							Value: {sliderValue}
						</Text>
					</div>

					<div>
						<Text size="md" color="theme">
							Thick Slider
						</Text>
						<Vertical marginTop={8}>
							<Slider value={sliderValue} setValue={setSliderValue} min={0} max={100} thick />
						</Vertical>
					</div>

					<div>
						<Text size="md" color="theme">
							Custom Range
						</Text>
						<Vertical marginTop={8}>
							<Slider initialValue={50} min={0} max={200} step={10} />
						</Vertical>
						<Text size="sm" color="theme">
							Range: 0-200, Step: 10
						</Text>
					</div>
				</Vertical>
			</Card>

			{/* Switch Demo */}
			<Card>
				<Title order={2} icon={<Settings size={20} />}>
					Switch Component
				</Title>

				<Vertical gap={16}>
					{/* Basic Usage */}
					<div>
						<Text size="md" color="theme">
							Basic Usage
						</Text>
						<Horizontal gap={24} marginTop={8}>
							<Switch label="Default Switch" />
							<Switch label="Disabled Switch" disabled />
							<Switch label="Checked by Default" defaultChecked />
						</Horizontal>
					</div>

					{/* Controlled vs Uncontrolled */}
					<div>
						<Text size="md" color="theme">
							Controlled vs Uncontrolled
						</Text>
						<Horizontal gap={24} marginTop={8}>
							<Switch label="Controlled Switch" checked={controlledSwitch} onCheckedChange={setControlledSwitch} />
							<Text size="sm" color="theme">
								State: {controlledSwitch ? "ON" : "OFF"}
							</Text>
						</Horizontal>
						<Horizontal gap={24} marginTop={8}>
							<Switch label="Uncontrolled Switch" defaultChecked />
							<Text size="sm" color="theme">
								Uses internal state
							</Text>
						</Horizontal>
					</div>

					{/* Size Variants */}
					<div>
						<Text size="md" color="theme">
							Size Variants
						</Text>
						<Horizontal gap={24} marginTop={8}>
							<Switch label="Small" size="sm" defaultChecked />
							<Switch label="Medium" size="md" defaultChecked />
							<Switch label="Large" size="lg" defaultChecked />
						</Horizontal>
					</div>

					{/* Color Themes */}
					<div>
						<Text size="md" color="theme">
							Color Themes
						</Text>
						<Horizontal gap={24} marginTop={8}>
							<Switch label="Theme Color" color="theme" checked={themeSwitch} onCheckedChange={setThemeSwitch} />
							<Switch label="Success Color" color="success" checked={successSwitch} onCheckedChange={setSuccessSwitch} />
							<Switch label="Warning Color" color="warning" checked={warningSwitch} onCheckedChange={setWarningSwitch} />
							<Switch label="Danger Color" color="danger" checked={dangerSwitch} onCheckedChange={setDangerSwitch} />
						</Horizontal>
					</div>

					{/* Label Positioning */}
					<div>
						<Text size="md" color="theme">
							Label Positioning
						</Text>
						<Horizontal gap={24} marginTop={8}>
							<Switch label="Label on Right" defaultChecked />
							<Switch label="Label on Left" labelPosition="left" defaultChecked />
						</Horizontal>
					</div>

					{/* Interactive Examples */}
					<div>
						<Text size="md" color="theme">
							Interactive Examples
						</Text>
						<Horizontal gap={24} marginTop={8}>
							<Switch label="Notifications" color="success" defaultChecked />
							<Switch label="Dark Mode" color="theme" defaultChecked />
							<Switch label="Auto-save" color="warning" defaultChecked />
						</Horizontal>
					</div>
				</Vertical>
			</Card>

			{/* Tab Demo */}
			<Card>
				<Title order={2} icon={<Home size={20} />}>
					Tab Component
				</Title>

				<Vertical gap={16}>
					{/* Horizontal Tabs */}
					<div>
						<Text size="md" color="theme">
							Horizontal Tabs
						</Text>
						<div className="tab-container">
							<Horizontal widthFull>
								<Tab
									isActive={activeTab === 0}
									tabCount={3}
									onClick={() => setActiveTab(0)}
									borderRadius={["top-left", "bottom-left"]}
									color="success"
								>
									Home
								</Tab>
								<Tab isActive={activeTab === 1} tabCount={3} onClick={() => setActiveTab(1)} color="success">
									Library
								</Tab>
								<Tab
									isActive={activeTab === 2}
									tabCount={3}
									onClick={() => setActiveTab(2)}
									borderRadius={["top-right", "bottom-right"]}
									color="success"
								>
									Settings
								</Tab>
							</Horizontal>
						</div>
						<Card style={{ marginTop: 16 }}>
							<Vertical padding={16}>
								<Text>Active Tab: {activeTab}</Text>
							</Vertical>
						</Card>
					</div>

					{/* Vertical Tabs */}
					<div>
						<Text size="md" color="theme">
							Vertical Tabs
						</Text>
						<Horizontal gap={16}>
							<Vertical>
								<Tab isActive={activeTab === 0} tabCount={3} orientation="vertical" onClick={() => setActiveTab(0)}>
									Home
								</Tab>
								<Tab isActive={activeTab === 1} tabCount={3} orientation="vertical" onClick={() => setActiveTab(1)}>
									Library
								</Tab>
								<Tab isActive={activeTab === 2} tabCount={3} orientation="vertical" onClick={() => setActiveTab(2)}>
									Settings
								</Tab>
							</Vertical>
							<Vertical flexGrow>
								<Card>
									<Vertical padding={16}>
										<Text>Active Tab: {activeTab}</Text>
									</Vertical>
								</Card>
							</Vertical>
						</Horizontal>
					</div>
				</Vertical>
			</Card>

			{/* TabGroup Demo */}
			<Card>
				<Title order={2} icon={<Home size={20} />}>
					TabGroup Component
				</Title>

				<Vertical gap={16}>
					{/* Basic Horizontal TabGroup */}
					<div>
						<Text size="md" color="theme">
							Basic Horizontal TabGroup
						</Text>
						<Vertical marginTop={8}>
							<TabGroup
								items={asTabItems(["home", "library", "settings"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								fullWidth
							/>
						</Vertical>
						<Card style={{ marginTop: 16 }}>
							<Vertical padding={16}>
								<Text>Active Tab: {tabGroupValue}</Text>
							</Vertical>
						</Card>
					</div>

					{/* TabGroup with Icons */}
					<div>
						<Text size="md" color="theme">
							TabGroup with Icons
						</Text>
						<Vertical marginTop={8}>
							<TabGroup
								items={asTabItems([
									{ value: "home", icon: <Home size={16} />, children: "Home" },
									{ value: "library", icon: <Music size={16} />, children: "Library" },
									{ value: "settings", icon: <Settings size={16} />, children: "Settings" },
								])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								fullWidth
							/>
						</Vertical>
					</div>

					{/* Vertical TabGroup */}
					<div>
						<Text size="md" color="theme">
							Vertical TabGroup
						</Text>
						<Horizontal gap={16}>
							<TabGroup
								items={asTabItems([
									{ value: "home", icon: <Home size={16} />, children: "Home" },
									{ value: "library", icon: <Music size={16} />, children: "Library" },
									{ value: "playlists", icon: <Heart size={16} />, children: "Playlists" },
									{ value: "settings", icon: <Settings size={16} />, children: "Settings" },
								])}
								value={verticalTabGroupValue}
								onValueChange={setVerticalTabGroupValue}
								orientation="vertical"
								fullHeight
							/>
							<Vertical flexGrow>
								<Card>
									<Vertical padding={16}>
										<Text>Active Tab: {verticalTabGroupValue}</Text>
										{verticalTabGroupValue === "home" && <Text>Welcome to your music library!</Text>}
										{verticalTabGroupValue === "library" && <Text>Browse your music collection</Text>}
										{verticalTabGroupValue === "playlists" && <Text>Manage your playlists</Text>}
										{verticalTabGroupValue === "settings" && <Text>Configure your preferences</Text>}
									</Vertical>
								</Card>
							</Vertical>
						</Horizontal>
					</div>

					{/* TabGroup Color Variants */}
					<div>
						<Text size="md" color="theme">
							Color Variants
						</Text>
						<Vertical gap={8} marginTop={8}>
							<TabGroup
								items={asTabItems(["theme", "success", "warning", "danger"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								color="theme"
								fullWidth
							/>
							<TabGroup
								items={asTabItems(["theme", "success", "warning", "danger"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								color="success"
								fullWidth
							/>
							<TabGroup
								items={asTabItems(["theme", "success", "warning", "danger"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								color="warning"
								fullWidth
							/>
							<TabGroup
								items={asTabItems(["theme", "success", "warning", "danger"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								color="danger"
								fullWidth
							/>
						</Vertical>
					</div>

					{/* TabGroup Sizes */}
					<div>
						<Text size="md" color="theme">
							Size Variants
						</Text>
						<Vertical gap={8} marginTop={8}>
							<TabGroup
								items={asTabItems(["sm", "md", "lg"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								size="sm"
								fullWidth
							/>
							<TabGroup
								items={asTabItems(["sm", "md", "lg"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								size="md"
								fullWidth
							/>
							<TabGroup
								items={asTabItems(["sm", "md", "lg"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								size="lg"
								fullWidth
							/>
						</Vertical>
					</div>

					{/* TabGroup with Custom Gap */}
					<div>
						<Text size="md" color="theme">
							Custom Gap
						</Text>
						<Vertical marginTop={8}>
							<TabGroup
								items={asTabItems(["home", "library", "settings"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								gap={8}
								fullWidth
							/>
						</Vertical>
					</div>

					{/* TabGroup without Shadow */}
					<div>
						<Text size="md" color="theme">
							Without Shadow
						</Text>
						<Vertical marginTop={8}>
							<TabGroup
								items={asTabItems(["home", "library", "settings"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								shadow={false}
								fullWidth
							/>
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* Text Demo */}
			<Card>
				<Title order={2} icon={<TextIcon size={20} />}>
					Text Component
				</Title>

				<Vertical gap={16}>
					{/* Sizes */}
					<div>
						<Text size="md" color="theme">
							Sizes
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Text size="sm">Small text</Text>
							<Text size="md">Medium text</Text>
							<Text size="lg">Large text</Text>
						</Vertical>
					</div>

					{/* Colors */}
					<div>
						<Text size="md" color="theme">
							Colors
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Text color="white">White text</Text>
							<Text color="theme">Theme text</Text>
							<Text color="success">Success text</Text>
							<Text color="warning">Warning text</Text>
							<Text color="danger">Danger text</Text>
						</Vertical>
					</div>

					{/* With Icons */}
					<div>
						<Text size="md" color="theme">
							With Icons
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Text icon={<Heart size={16} />}>Liked song</Text>
							<Text icon={<Share2 size={16} />}>Share track</Text>
							<Text icon={<Download size={16} />}>Download</Text>
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* Title Demo */}
			<Card>
				<Title order={2} icon={<Settings size={20} />}>
					Title Component
				</Title>

				<Vertical gap={16}>
					{/* Orders */}
					<div>
						<Text size="md" color="theme">
							Heading Orders
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Title order={1}>Heading 1</Title>
							<Title order={2}>Heading 2</Title>
							<Title order={3}>Heading 3</Title>
							<Title order={4}>Heading 4</Title>
							<Title order={5}>Heading 5</Title>
							<Title order={6}>Heading 6</Title>
						</Vertical>
					</div>

					{/* Colors */}
					<div>
						<Text size="md" color="theme">
							Colors
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Title order={3} color="white">
								White title
							</Title>
							<Title order={3} color="theme">
								Theme title
							</Title>
							<Title order={3} color="success">
								Success title
							</Title>
							<Title order={3} color="warning">
								Warning title
							</Title>
							<Title order={3} color="danger">
								Danger title
							</Title>
						</Vertical>
					</div>

					{/* With Icons */}
					<div>
						<Text size="md" color="theme">
							With Icons
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Title order={3} icon={<Music size={20} />}>
								Music Player
							</Title>
							<Title order={4} icon={<Play size={16} />}>
								Now Playing
							</Title>
							<Title order={5} icon={<Heart size={14} />}>
								Favorites
							</Title>
						</Vertical>
					</div>

					{/* No Margin */}
					<div>
						<Text size="md" color="theme">
							No Margin
						</Text>
						<Card style={{ padding: 16, marginTop: 8 }}>
							<Title order={4} noMargin>
								Title without margin
							</Title>
							<Text>Content right after title</Text>
						</Card>
					</div>
				</Vertical>
			</Card>

			{/* Modal Demo */}
			<Card>
				<Title order={2} icon={<Settings size={20} />}>
					Modal Component
				</Title>

				<Vertical gap={16}>
					<Button variant="filled" icon={<Settings size={16} />} onClick={() => setModalOpen(true)}>
						Open Modal
					</Button>
				</Vertical>

				<Modal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					title="Settings Modal"
					icon={<Settings size={20} />}
					closeOnClickOutside
				>
					<Text>This is a modal dialog with settings.</Text>
					<Text>You can click outside to close it.</Text>

					<Horizontal gap={8} marginTop={16}>
						<Button variant="filled" onClick={() => setModalOpen(false)}>
							Save
						</Button>
						<Button variant="light" onClick={() => setModalOpen(false)}>
							Cancel
						</Button>
					</Horizontal>
				</Modal>
			</Card>

			{/* LoadingOverlay Demo */}
			<Card>
				<Title order={2} icon={<Loader2 size={20} />}>
					LoadingOverlay Component
				</Title>

				<Vertical gap={16}>
					{/* Basic LoadingOverlay */}
					<div>
						<Text size="md" color="theme">
							Basic LoadingOverlay
						</Text>
						<Vertical marginTop={8}>
							<Card style={{ minHeight: "200px", padding: "24px" }}>
								<Vertical gap={16}>
									<Text>This card has a loading overlay that can be toggled.</Text>
									<Text>When active, it shows a spinning loader over the content.</Text>
									<Button
										variant="filled"
										onClick={() => {
											setIsLoading(true);
											setTimeout(() => setIsLoading(false), 3000);
										}}
									>
										Show Loading for 3 seconds
									</Button>
								</Vertical>
								<LoadingOverlay isVisible={isLoading} />
							</Card>
						</Vertical>
					</div>

					{/* LoadingOverlay with Custom Content */}
					<div>
						<Text size="md" color="theme">
							LoadingOverlay with Custom Content
						</Text>
						<Vertical marginTop={8}>
							<Card style={{ minHeight: "200px", padding: "24px" }}>
								<LoadingOverlay isVisible={isLoading}>
									<Vertical gap={12} alignItems="center">
										<Loader2 size={32} className="animate-spin" />
										<Text>Loading your music...</Text>
										<Text size="sm" color="theme">
											Please wait
										</Text>
									</Vertical>
								</LoadingOverlay>
								<Vertical gap={16}>
									<Text>This loading overlay has custom content instead of the default spinner.</Text>
									<Text>It includes a larger spinner, text, and a subtitle.</Text>
									<Button
										variant="light"
										onClick={() => {
											setIsLoading(true);
											setTimeout(() => setIsLoading(false), 4000);
										}}
									>
										Show Custom Loading for 4 seconds
									</Button>
								</Vertical>
							</Card>
						</Vertical>
					</div>

					<Text size="sm" color="theme">
						Current state: {isLoading ? "Loading..." : "Ready"}
					</Text>
				</Vertical>
			</Card>

			{/* NodeCompare Demo */}
			<Card>
				<Title order={2} icon={<Settings size={20} />}>
					NodeCompare Component
				</Title>

				<Vertical gap={16}>
					<div>
						<Text size="md" color="theme">
							Before/After Comparison
						</Text>
						<Vertical marginTop={4}>
							<Text size="sm" color="theme">
								Drag the slider to compare the before and after states
							</Text>
						</Vertical>
						<Vertical marginTop={8}>
							<NodeCompare
								beforeNode={
									<Card style={{ padding: "24px", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
										<Vertical gap={16} alignItems="center" justifyContent="center" heightFull>
											<Title order={3} color="danger">
												Before
											</Title>
											<Text>Original design</Text>
											<Button variant="light" color="danger">
												Old Button
											</Button>
										</Vertical>
									</Card>
								}
								afterNode={
									<Card style={{ padding: "24px", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
										<Vertical gap={16} alignItems="center" justifyContent="center" heightFull>
											<Title order={3} color="success">
												After
											</Title>
											<Text>Improved design</Text>
											<Button variant="filled" color="success">
												New Button
											</Button>
										</Vertical>
									</Card>
								}
								beforeLabel="Before"
								afterLabel="After"
								beforeLabelColor="danger"
								afterLabelColor="success"
								height={300}
							/>
						</Vertical>
					</div>

					<div>
						<Text size="md" color="theme">
							Custom Labels and Colors
						</Text>
						<Vertical marginTop={4}>
							<Text size="sm" color="theme">
								Using light variant labels with custom colors
							</Text>
						</Vertical>
						<Vertical marginTop={8}>
							<NodeCompare
								beforeNode={
									<Card style={{ padding: "24px", height: "100%", backgroundColor: "rgba(255, 193, 7, 0.1)" }}>
										<Vertical gap={16} alignItems="center" justifyContent="center" heightFull>
											<Title order={3} color="warning">
												Version 1.0
											</Title>
											<Text>Basic functionality</Text>
											<Button variant="light" color="warning">
												Legacy
											</Button>
										</Vertical>
									</Card>
								}
								afterNode={
									<Card style={{ padding: "24px", height: "100%", backgroundColor: "rgba(76, 175, 80, 0.1)" }}>
										<Vertical gap={16} alignItems="center" justifyContent="center" heightFull>
											<Title order={3} color="success">
												Version 2.0
											</Title>
											<Text>Enhanced features</Text>
											<Button variant="filled" color="success">
												Modern
											</Button>
										</Vertical>
									</Card>
								}
								beforeLabel="Legacy"
								afterLabel="Modern"
								beforeLabelColor="warning"
								afterLabelColor="success"
								labelVariant="light"
								height={300}
							/>
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* Carousel Demo */}
			<Card>
				<Title order={2} icon={<SkipForward size={20} />}>
					Carousel Component
				</Title>

				<Vertical gap={16}>
					<div>
						<Text size="md" color="theme">
							Basic Horizontal Carousel
						</Text>
						<Vertical marginTop={8}>
							<Carousel
								Component={({ title, description, color }: { title: string; description: string; color: string }) => (
									<Card
										style={{
											height: "100%",
											backgroundColor: color,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											padding: "24px",
										}}
									>
										<Title order={3} color="white" noMargin>
											{title}
										</Title>
										<Text color="white" size="sm">
											{description}
										</Text>
									</Card>
								)}
								items={[
									{ key: "1", title: "Slide 1", description: "First carousel item", color: "rgba(76, 175, 80, 0.8)" },
									{ key: "2", title: "Slide 2", description: "Second carousel item", color: "rgba(33, 150, 243, 0.8)" },
									{ key: "3", title: "Slide 3", description: "Third carousel item", color: "rgba(156, 39, 176, 0.8)" },
									{ key: "4", title: "Slide 4", description: "Fourth carousel item", color: "rgba(255, 193, 7, 0.8)" },
									{ key: "5", title: "Slide 5", description: "Fifth carousel item", color: "rgba(244, 67, 54, 0.8)" },
								]}
								itemToDisplayCount={3}
								gap={16}
								onItemChange={(index) => console.log(`Carousel moved to index: ${index}`)}
								style={{ height: "200px" }}
							/>
						</Vertical>
					</div>

					<div>
						<Text size="md" color="theme">
							Vertical Carousel
						</Text>
						<Vertical marginTop={8}>
							<Carousel
								Component={({ icon, title, description }: { icon: ReactNode; title: string; description: string }) => (
									<Card
										style={{
											height: "100%",
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											padding: "24px",
										}}
									>
										<div style={{ fontSize: "32px", marginBottom: "16px" }}>{icon}</div>
										<Title order={4} noMargin>
											{title}
										</Title>
										<Text size="sm" color="theme">
											{description}
										</Text>
									</Card>
								)}
								items={[
									{ key: "1", icon: <Music size={32} />, title: "Music", description: "Browse your library" },
									{ key: "2", icon: <Heart size={32} />, title: "Favorites", description: "Your liked songs" },
									{ key: "3", icon: <Play size={32} />, title: "Now Playing", description: "Current track" },
									{ key: "4", icon: <Settings size={32} />, title: "Settings", description: "Configure app" },
								]}
								itemToDisplayCount={2}
								gap={16}
								orientation="vertical"
								style={{ height: "300px", width: "200px" }}
							/>
						</Vertical>
					</div>

					<div>
						<Text size="md" color="theme">
							Single Item Display
						</Text>
						<Vertical marginTop={8}>
							<Carousel
								Component={({ number, color }: { number: number; color: string }) => (
									<Card
										style={{
											height: "100%",
											backgroundColor: color,
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											padding: "24px",
										}}
									>
										<Title order={1} color="white" noMargin>
											{number}
										</Title>
									</Card>
								)}
								items={[
									{ key: "1", number: 1, color: "rgba(76, 175, 80, 0.8)" },
									{ key: "2", number: 2, color: "rgba(33, 150, 243, 0.8)" },
									{ key: "3", number: 3, color: "rgba(156, 39, 176, 0.8)" },
									{ key: "4", number: 4, color: "rgba(255, 193, 7, 0.8)" },
									{ key: "5", number: 5, color: "rgba(244, 67, 54, 0.8)" },
									{ key: "6", number: 6, color: "rgba(0, 188, 212, 0.8)" },
								]}
								itemToDisplayCount={1}
								gap={0}
								showArrows
								showDots
								style={{ height: "150px" }}
							/>
						</Vertical>
					</div>

					<div>
						<Text size="md" color="theme">
							No Arrows
						</Text>
						<Vertical marginTop={8}>
							<Carousel
								Component={({ emoji, text }: { emoji: string; text: string }) => (
									<Card
										style={{
											height: "100%",
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											textAlign: "center",
											padding: "24px",
										}}
									>
										<div style={{ fontSize: "48px", marginBottom: "16px" }}>{emoji}</div>
										<Text size="sm">{text}</Text>
									</Card>
								)}
								items={[
									{ key: "1", emoji: "🎵", text: "Music" },
									{ key: "2", emoji: "🎧", text: "Headphones" },
									{ key: "3", emoji: "🎤", text: "Microphone" },
									{ key: "4", emoji: "🎹", text: "Piano" },
								]}
								itemToDisplayCount={3}
								gap={12}
								showArrows={false}
								style={{ height: "180px" }}
							/>
						</Vertical>
					</div>

					<div>
						<Text size="md" color="theme">
							No Dots
						</Text>
						<Vertical marginTop={8}>
							<Carousel
								Component={({ emoji, text }: { emoji: string; text: string }) => (
									<Card
										style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "24px" }}
									>
										<div style={{ fontSize: "48px", marginBottom: "16px" }}>{emoji}</div>
										<Text size="sm">{text}</Text>
									</Card>
								)}
								items={[
									{ key: "1", emoji: "🎵", text: "Music" },
									{ key: "2", emoji: "🎧", text: "Headphones" },
									{ key: "3", emoji: "🎤", text: "Microphone" },
									{ key: "4", emoji: "🎹", text: "Piano" },
								]}
								itemToDisplayCount={3}
								gap={12}
								showDots={false}
								style={{ height: "180px" }}
							/>
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* Input Demo */}
			<Card>
				<Title order={2} icon={<TextIcon size={20} />}>
					Input Component
				</Title>

				<Vertical gap={16}>
					{/* Basic Usage */}
					<div>
						<Text size="md" color="theme">
							Basic Usage
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input placeholder="Enter text here..." />
							<Input placeholder="Disabled input" disabled />
							<Input placeholder="Required field" required />
						</Vertical>
					</div>

					{/* With Labels */}
					<div>
						<Text size="md" color="theme">
							With Labels
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input label="Username" placeholder="Enter username" />
							<Input label="Email" placeholder="Enter email" type="email" required />
							<Input label="Password" placeholder="Enter password" type="password" />
						</Vertical>
					</div>

					{/* Floating Labels */}
					<div>
						<Text size="md" color="theme">
							Floating Labels
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input label="Floating Label" placeholder="Type here..." floating />
							<Input label="Floating Required" placeholder="Required field" floating required />
						</Vertical>
					</div>

					{/* With Descriptions */}
					<div>
						<Text size="md" color="theme">
							With Descriptions
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input label="Username" placeholder="Enter username" description="Must be at least 3 characters long" />
							<Input label="Email" placeholder="Enter email" type="email" description="We'll never share your email" />
						</Vertical>
					</div>

					{/* With Error Descriptions */}
					<div>
						<Text size="md" color="theme">
							With Error Descriptions
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input label="Username" placeholder="Enter username" errorDescription="Username is already taken" />
							<Input label="Email" placeholder="Enter email" type="email" errorDescription="Please enter a valid email address" />
							<Input
								label="Password"
								placeholder="Enter password"
								type="password"
								errorDescription="Password must be at least 8 characters"
							/>
						</Vertical>
					</div>

					{/* With Both Description and Error Description */}
					<div>
						<Text size="md" color="theme">
							With Both Description and Error Description
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input
								label="Username"
								placeholder="Enter username"
								description="Must be at least 3 characters long"
								errorDescription="Username is already taken"
							/>
							<Input
								label="Email"
								placeholder="Enter email"
								type="email"
								description="We'll never share your email"
								errorDescription="Please enter a valid email address"
							/>
						</Vertical>
					</div>

					{/* Clearable Inputs */}
					<div>
						<Text size="md" color="theme">
							Clearable Inputs
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input placeholder="Type and clear..." clearable value={inputValue} setValue={setInputValue} />
							<Text size="sm" color="theme">
								Current value: {inputValue || "empty"}
							</Text>
						</Vertical>
					</div>

					{/* Number Inputs */}
					<div>
						<Text size="md" color="theme">
							Number Inputs
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input
								label="Age"
								type="number"
								placeholder="Enter age"
								min={0}
								max={120}
								value={numberValue.toString()}
								setValue={(value) => setNumberValue(parseInt(value) || 0)}
								setNumberValue={setNumberValue}
							/>
							<Text size="sm" color="theme">
								Number value: {numberValue}
							</Text>
						</Vertical>
					</div>

					{/* Color Variants */}
					<div>
						<Text size="md" color="theme">
							Color Variants
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input label="Theme Color" placeholder="Default theme color" />
							<Input label="Success Color" placeholder="Success state" color="success" />
							<Input label="Warning Color" placeholder="Warning state" color="warning" />
							<Input label="Danger Color" placeholder="Error state" color="danger" />
							<Input label="White Color" placeholder="White variant" color="white" />
						</Vertical>
					</div>

					{/* Controlled Inputs */}
					<div>
						<Text size="md" color="theme">
							Controlled Inputs
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input label="Controlled Input" placeholder="Type here..." value={inputValue} setValue={setInputValue} clearable />
							<Text size="sm" color="theme">
								Current value: {inputValue || "empty"}
							</Text>
							<Horizontal gap={8}>
								<Button variant="light" size="sm" onClick={() => setInputValue("Hello World!")}>
									Set to "Hello World!"
								</Button>
								<Button variant="light" size="sm" onClick={() => setInputValue("")}>
									Clear
								</Button>
							</Horizontal>
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* NativeSelect Demo */}
			<Card>
				<Title order={2} icon={<Settings size={20} />}>
					NativeSelect Component
				</Title>

				<Vertical gap={16}>
					{/* Basic Usage */}
					<div>
						<Text size="md" color="theme">
							Basic Usage
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								placeholder="Choose a theme"
								options={["default", "ocean", "sunset", "neon", "forest", "light", "aurora", "galaxy"]}
								value={selectedTheme}
								setValue={setSelectedTheme}
							/>
							<NativeSelect
								placeholder="Choose a color variant"
								options={["theme", "white", "danger", "warning", "success"]}
								value={selectedColor}
								setValue={setSelectedColor}
							/>
						</Vertical>
					</div>

					{/* With Labels */}
					<div>
						<Text size="md" color="theme">
							With Labels
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								label="Select Theme"
								placeholder="Choose a theme"
								options={["default", "ocean", "sunset", "neon", "forest", "light", "aurora", "galaxy"]}
								value={selectedTheme}
								setValue={setSelectedTheme}
							/>
							<NativeSelect
								label="Select Color Variant"
								placeholder="Choose a color"
								options={["theme", "white", "danger", "warning", "success"]}
								value={selectedColor}
								setValue={setSelectedColor}
							/>
						</Vertical>
					</div>

					{/* With Descriptions */}
					<div>
						<Text size="md" color="theme">
							With Descriptions
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								label="Select Theme"
								placeholder="Choose a theme"
								options={["default", "ocean", "sunset", "neon", "forest", "light", "aurora", "galaxy"]}
								value={selectedTheme}
								setValue={setSelectedTheme}
								description="Choose your preferred color scheme"
							/>
							<NativeSelect
								label="Select Color Variant"
								placeholder="Choose a color"
								options={["theme", "white", "danger", "warning", "success"]}
								value={selectedColor}
								setValue={setSelectedColor}
								description="This changes the select's color scheme"
							/>
						</Vertical>
					</div>

					{/* Required Fields */}
					<div>
						<Text size="md" color="theme">
							Required Fields
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								label="Required Field"
								placeholder="Please select an option"
								options={["Option 1", "Option 2", "Option 3"]}
								required
							/>
							<NativeSelect
								label="Required with Error"
								placeholder="Please select an option"
								options={["Option 1", "Option 2", "Option 3"]}
								color="danger"
								required
								errorDescription="This field is required"
							/>
						</Vertical>
					</div>

					{/* Color Variants */}
					<div>
						<Text size="md" color="theme">
							Color Variants
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								label="Theme Color"
								placeholder="Default theme color"
								options={["Option 1", "Option 2", "Option 3"]}
								color="theme"
							/>
							<NativeSelect
								label="Success Color"
								placeholder="Success state"
								options={["Option 1", "Option 2", "Option 3"]}
								color="success"
							/>
							<NativeSelect
								label="Warning Color"
								placeholder="Warning state"
								options={["Option 1", "Option 2", "Option 3"]}
								color="warning"
							/>
							<NativeSelect
								label="Danger Color"
								placeholder="Error state"
								options={["Option 1", "Option 2", "Option 3"]}
								color="danger"
							/>
							<NativeSelect
								label="White Color"
								placeholder="White variant"
								options={["Option 1", "Option 2", "Option 3"]}
								color="white"
							/>
						</Vertical>
					</div>

					{/* Disabled Options */}
					<div>
						<Text size="md" color="theme">
							Disabled Options
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								label="With Disabled Options"
								placeholder="Select with disabled options"
								options={[
									{ value: "Enabled Option 1" },
									{ value: "Disabled Option 1", disabled: true },
									{ value: "Enabled Option 2" },
									{ value: "Disabled Option 2", disabled: true },
								]}
								color="warning"
								description="Some options are disabled"
							/>
						</Vertical>
					</div>

					{/* Full Width */}
					<div>
						<Text size="md" color="theme">
							Full Width
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								label="Full Width Select"
								placeholder="This select takes full width"
								options={["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]}
								fullWidth
								description="Using fullWidth prop for responsive layouts"
							/>
						</Vertical>
					</div>

					{/* Interactive Examples */}
					<div>
						<Text size="md" color="theme">
							Interactive Examples
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								label="Music Genre"
								placeholder="Select your favorite genre"
								options={["Rock", "Pop", "Jazz", "Classical", "Electronic", "Hip-Hop", "Country", "Blues"]}
								color="success"
								description="Choose your preferred music genre"
								onChange={(e) => console.log("Selected genre:", e.currentTarget.value)}
							/>
							<NativeSelect
								label="Audio Quality"
								placeholder="Select audio quality"
								options={["128 kbps", "256 kbps", "320 kbps", "Lossless", "Hi-Res"]}
								color="theme"
								description="Higher quality means larger file sizes"
								onChange={(e) => console.log("Selected quality:", e.currentTarget.value)}
							/>
						</Vertical>
					</div>

					{/* Controlled vs Uncontrolled */}
					<div>
						<Text size="md" color="theme">
							Controlled vs Uncontrolled
						</Text>
						<Vertical gap={8} marginTop={8}>
							<NativeSelect
								label="Controlled Select"
								placeholder="This is controlled"
								options={["Option 1", "Option 2", "Option 3"]}
								value={selectedTheme}
								setValue={setSelectedTheme}
								color="success"
								description="Value is controlled by React state"
							/>
							<NativeSelect
								label="Uncontrolled Select"
								placeholder="This is uncontrolled"
								options={["Option A", "Option B", "Option C"]}
								color="warning"
								description="Uses internal HTML select state"
							/>
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* File Browser Demo */}
			<FileBrowserDemo />

			{/* Interactive Demo */}
			<Card>
				<Title order={2} icon={<Play size={20} />}>
					Interactive Music Player Demo
				</Title>

				<Card style={{ padding: 24 }}>
					<Vertical gap={16}>
						{/* Player Header */}
						<Horizontal justifyContent="space-between" alignItems="center">
							<Title order={3} icon={<Music size={20} />} noMargin>
								Now Playing
							</Title>
							<Button variant="light" icon={<Heart size={16} />} circular />
						</Horizontal>

						{/* Search */}
						<SearchInput value={searchValue} setValue={setSearchValue} placeholder="Search your library..." />

						{/* Controls */}
						<Horizontal justifyContent="center" gap={16}>
							<Button variant="light" icon={<SkipBack size={20} />} circular />
							<Button variant="filled" icon={<Play size={20} />} circular />
							<Button variant="light" icon={<SkipForward size={20} />} circular />
						</Horizontal>

						{/* Volume Control */}
						<Horizontal gap={12} alignItems="center">
							<Volume2 size={16} />
							<Slider value={sliderValue} setValue={setSliderValue} min={0} max={100} />
							<Text size="sm">{sliderValue}%</Text>
						</Horizontal>

						{/* Navigation Tabs */}
						<div className="tab-container">
							<Tab isActive={activeTab === 0} tabCount={3} onClick={() => setActiveTab(0)}>
								Library
							</Tab>
							<Tab isActive={activeTab === 1} tabCount={3} onClick={() => setActiveTab(1)}>
								Playlists
							</Tab>
							<Tab isActive={activeTab === 2} tabCount={3} onClick={() => setActiveTab(2)}>
								Settings
							</Tab>
						</div>

						{/* Content Area */}
						<Card style={{ padding: 16 }}>
							{activeTab === 0 && (
								<Vertical gap={8}>
									<Text icon={<Music size={16} />}>Song 1 - Artist 1</Text>
									<Text icon={<Music size={16} />}>Song 2 - Artist 2</Text>
									<Text icon={<Music size={16} />}>Song 3 - Artist 3</Text>
								</Vertical>
							)}
							{activeTab === 1 && <Text>Your playlists will appear here</Text>}
							{activeTab === 2 && (
								<Button variant="filled" icon={<Settings size={16} />} onClick={() => setModalOpen(true)}>
									Open Settings
								</Button>
							)}
						</Card>
					</Vertical>
				</Card>
			</Card>
		</Vertical>
	);
};
