import "@/components/index.css";
import { FileBrowserDemo } from "@/components/ui/FileBrowserDemo";
import {
	asTabItems,
	Button,
	Card,
	CardButton,
	Input,
	LoadingOverlay,
	Modal,
	SearchInput,
	Slider,
	Tab,
	TabGroup,
	Text,
	Title,
} from "@/components/ui/index";
import { ThemeSelector } from "@/ThemeSelector";
import { Horizontal, Vertical, WriteClasses } from "@/utils/ComponentToolbox";
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
	User,
	Volume2,
} from "lucide-react";
import { useState } from "react";

// Write demo styles
WriteClasses("component-demo", {
	".demo-section": {
		marginBottom: "2rem",
		padding: "1rem",
		borderRadius: "8px",
		backgroundColor: "rgba(255, 255, 255, 0.05)",
	},
	".demo-grid": {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: "1rem",
		marginTop: "1rem",
	},
	".demo-item": {
		padding: "1rem",
		borderRadius: "8px",
		backgroundColor: "rgba(255, 255, 255, 0.02)",
		border: "1px solid rgba(255, 255, 255, 0.1)",
	},
	".demo-label": {
		fontSize: "0.875rem",
		color: "rgba(255, 255, 255, 0.6)",
		marginBottom: "0.5rem",
		fontWeight: "500",
	},
	".tab-container": {
		display: "flex",
		gap: "0.25rem",
		marginBottom: "1rem",
	},
	".vertical-tab-container": {
		display: "flex",
		flexDirection: "column",
		gap: "0.25rem",
		width: "200px",
	},
});

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

	return (
		<Vertical gap={24} padding={24} widthFull heightFull overflowAuto>
			<Title order={1} icon={<Music size={24} />}>
				UI Component Library Demo
			</Title>

			{/* Theme Selector */}
			<ThemeSelector />

			{/* Button Demo */}
			<Card className="demo-section">
				<Title order={2} icon={<Play size={20} />}>
					Button Component
				</Title>

				<Vertical gap={16}>
					{/* Variants */}
					<div>
						<Text size="medium" color="theme">
							Variants
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Button variant="filled">Filled Button</Button>
							<Button variant="light">Light Button</Button>
						</Horizontal>
					</div>

					{/* Sizes */}
					<div>
						<Text size="medium" color="theme">
							Sizes
						</Text>
						<Horizontal gap={8} marginTop={8} alignItems="center">
							<Button size="small">Small</Button>
							<Button size="medium">Medium</Button>
							<Button size="large">Large</Button>
						</Horizontal>
					</div>

					{/* Colors */}
					<div>
						<Text size="medium" color="theme">
							Colors
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Text size="small" color="theme">
								Filled Variant
							</Text>
							<Horizontal gap={8}>
								<Button color="theme">Theme</Button>
								<Button color="success">Success</Button>
								<Button color="warning">Warning</Button>
								<Button color="danger">Danger</Button>
							</Horizontal>
							<Text size="small" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
							Circular Buttons
						</Text>
						<Horizontal gap={8} marginTop={8} alignItems="center">
							<Button circular size="small" icon={<Play size={12} />} />
							<Button circular size="medium" icon={<Play size={16} />} />
							<Button circular size="large" icon={<Play size={20} />} />
							<Button circular variant="light" icon={<Heart size={16} />} />
							<Button circular color="success" icon={<Download size={16} />} />
							<Button circular color="danger" icon={<Settings size={16} />} />
						</Horizontal>
					</div>

					{/* Border Radius Sizes */}
					<div>
						<Text size="medium" color="theme">
							Border Radius Sizes
						</Text>
						<Horizontal gap={8} marginTop={8}>
							<Button borderRadiusSize="none">No Radius</Button>
							<Button borderRadiusSize="small">Small Radius</Button>
							<Button borderRadiusSize="medium">Medium Radius</Button>
							<Button borderRadiusSize="large">Large Radius</Button>
						</Horizontal>
					</div>

					{/* Full Width */}
					<div>
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
			<Card className="demo-section">
				<Title order={2} icon={<Settings size={20} />}>
					Card Component
				</Title>

				<Horizontal gap={16} marginTop={16}>
					<Card borderRadiusSize="none">
						<Vertical padding={16}>
							<Text>No Border Radius</Text>
						</Vertical>
					</Card>
					<Card borderRadiusSize="small">
						<Vertical padding={16}>
							<Text>Small Border Radius</Text>
						</Vertical>
					</Card>
					<Card borderRadiusSize="medium">
						<Vertical padding={16}>
							<Text>Medium Border Radius</Text>
						</Vertical>
					</Card>
					<Card borderRadiusSize="large">
						<Vertical padding={16}>
							<Text>Large Border Radius</Text>
						</Vertical>
					</Card>
				</Horizontal>
			</Card>

			{/* CardButton Demo */}
			<Card className="demo-section">
				<Title order={2} icon={<Heart size={20} />}>
					CardButton Component
				</Title>

				<Vertical gap={16}>
					{/* Basic CardButton */}
					<div>
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
							Border Radius Variants
						</Text>
						<Horizontal gap={16} marginTop={8}>
							<CardButton borderRadiusSize="none">
								<Vertical padding={16}>
									<Text>No Radius</Text>
								</Vertical>
							</CardButton>
							<CardButton borderRadiusSize="small">
								<Vertical padding={16}>
									<Text>Small Radius</Text>
								</Vertical>
							</CardButton>
							<CardButton borderRadiusSize="medium">
								<Vertical padding={16}>
									<Text>Medium Radius</Text>
								</Vertical>
							</CardButton>
							<CardButton borderRadiusSize="large">
								<Vertical padding={16}>
									<Text>Large Radius</Text>
								</Vertical>
							</CardButton>
						</Horizontal>
					</div>

					{/* CardButton with Icons */}
					<div>
						<Text size="medium" color="theme">
							With Icons
						</Text>
						<Horizontal gap={16} marginTop={8}>
							<CardButton>
								<Horizontal gap={12} padding={16} alignItems="center">
									<Music size={20} />
									<Vertical>
										<Text>Music Library</Text>
										<Text size="small" color="theme">
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
										<Text size="small" color="theme">
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
										<Text size="small" color="theme">
											Configure app
										</Text>
									</Vertical>
								</Horizontal>
							</CardButton>
						</Horizontal>
					</div>

					{/* Disabled State */}
					<div>
						<Text size="medium" color="theme">
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
										<Text size="small" color="theme">
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
			<Card className="demo-section">
				<Title order={2} icon={<User size={20} />}>
					Input Component
				</Title>

				<Vertical gap={16}>
					{/* Basic Input */}
					<div>
						<Text size="medium" color="theme">
							Basic Input
						</Text>
						<Vertical marginTop={8}>
							<Input value={inputValue} setValue={setInputValue} placeholder="Enter text..." />
						</Vertical>
					</div>

					{/* Number Input */}
					<div>
						<Text size="medium" color="theme">
							Number Input
						</Text>
						<Vertical marginTop={8}>
							<Input
								type="number"
								value={numberValue.toString()}
								setValue={(value) => setNumberValue(parseFloat(value) || 0)}
								setNumberValue={setNumberValue}
								min={0}
								max={100}
								placeholder="Enter number..."
							/>
						</Vertical>
					</div>

					{/* Clearable Input */}
					<div>
						<Text size="medium" color="theme">
							Clearable Input
						</Text>
						<Vertical marginTop={8}>
							<Input value={inputValue} setValue={setInputValue} clearable placeholder="Type and clear..." />
						</Vertical>
					</div>

					{/* Colors */}
					<div>
						<Text size="medium" color="theme">
							Colors
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Input color="theme" placeholder="Theme color" />
							<Input color="white" placeholder="White color" />
							<Input color="success" placeholder="Success color" />
							<Input color="warning" placeholder="Warning color" />
							<Input color="danger" placeholder="Danger color" />
						</Vertical>
					</div>
				</Vertical>
			</Card>

			{/* SearchInput Demo */}
			<Card className="demo-section">
				<Title order={2} icon={<Search size={20} />}>
					SearchInput Component
				</Title>

				<Vertical gap={16}>
					<div>
						<Text size="medium" color="theme">
							Search Input
						</Text>
						<Vertical marginTop={8}>
							<SearchInput value={searchValue} setValue={setSearchValue} placeholder="Search for music..." />
						</Vertical>
					</div>

					{/* Color Variants */}
					<div>
						<Text size="medium" color="theme">
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
			<Card className="demo-section">
				<Title order={2} icon={<Volume2 size={20} />}>
					Slider Component
				</Title>

				<Vertical gap={16}>
					<div>
						<Text size="medium" color="theme">
							Volume Slider
						</Text>
						<Vertical marginTop={8}>
							<Slider value={sliderValue} setValue={setSliderValue} min={0} max={100} />
						</Vertical>
						<Text size="small" color="theme">
							Value: {sliderValue}
						</Text>
					</div>

					<div>
						<Text size="medium" color="theme">
							Thick Slider
						</Text>
						<Vertical marginTop={8}>
							<Slider value={sliderValue} setValue={setSliderValue} min={0} max={100} thick />
						</Vertical>
					</div>

					<div>
						<Text size="medium" color="theme">
							Custom Range
						</Text>
						<Vertical marginTop={8}>
							<Slider initialValue={50} min={0} max={200} step={10} />
						</Vertical>
						<Text size="small" color="theme">
							Range: 0-200, Step: 10
						</Text>
					</div>
				</Vertical>
			</Card>

			{/* Tab Demo */}
			<Card className="demo-section">
				<Title order={2} icon={<Home size={20} />}>
					Tab Component
				</Title>

				<Vertical gap={16}>
					{/* Horizontal Tabs */}
					<div>
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
			<Card className="demo-section">
				<Title order={2} icon={<Home size={20} />}>
					TabGroup Component
				</Title>

				<Vertical gap={16}>
					{/* Basic Horizontal TabGroup */}
					<div>
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
							Size Variants
						</Text>
						<Vertical gap={8} marginTop={8}>
							<TabGroup
								items={asTabItems(["small", "medium", "large"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								size="small"
								fullWidth
							/>
							<TabGroup
								items={asTabItems(["small", "medium", "large"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								size="medium"
								fullWidth
							/>
							<TabGroup
								items={asTabItems(["small", "medium", "large"])}
								value={tabGroupValue}
								onValueChange={setTabGroupValue}
								size="large"
								fullWidth
							/>
						</Vertical>
					</div>

					{/* TabGroup with Custom Gap */}
					<div>
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
			<Card className="demo-section">
				<Title order={2} icon={<TextIcon size={20} />}>
					Text Component
				</Title>

				<Vertical gap={16}>
					{/* Sizes */}
					<div>
						<Text size="medium" color="theme">
							Sizes
						</Text>
						<Vertical gap={8} marginTop={8}>
							<Text size="small">Small text</Text>
							<Text size="medium">Medium text</Text>
							<Text size="large">Large text</Text>
						</Vertical>
					</div>

					{/* Colors */}
					<div>
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
			<Card className="demo-section">
				<Title order={2} icon={<Settings size={20} />}>
					Title Component
				</Title>

				<Vertical gap={16}>
					{/* Orders */}
					<div>
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
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
			<Card className="demo-section">
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
			<Card className="demo-section">
				<Title order={2} icon={<Loader2 size={20} />}>
					LoadingOverlay Component
				</Title>

				<Vertical gap={16}>
					{/* Basic LoadingOverlay */}
					<div>
						<Text size="medium" color="theme">
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
						<Text size="medium" color="theme">
							LoadingOverlay with Custom Content
						</Text>
						<Vertical marginTop={8}>
							<Card style={{ minHeight: "200px", padding: "24px" }}>
								<LoadingOverlay isVisible={isLoading}>
									<Vertical gap={12} alignItems="center">
										<Loader2 size={32} className="animate-spin" />
										<Text>Loading your music...</Text>
										<Text size="small" color="theme">
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

					<Text size="small" color="theme">
						Current state: {isLoading ? "Loading..." : "Ready"}
					</Text>
				</Vertical>
			</Card>

			{/* File Browser Demo */}
			<FileBrowserDemo />

			{/* Interactive Demo */}
			<Card className="demo-section">
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
							<Text size="small">{sliderValue}%</Text>
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
