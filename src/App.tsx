import { actions } from "@/actions/actions";
import { DangerZone } from "@/components/dangerZone/DangerZone";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Player } from "@/components/player/Player";
import { Playlist } from "@/components/playlist/Playlist";
import { Tab } from "@/components/ui";
import { useApp } from "@/globalState";
import PWABadge from "@/PWABadge";
import { FullViewport, Horizontal, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";
import { useOs } from "@/utils/useOs";
import { AlertTriangle, BarChart3, ListMusic, Music } from "lucide-react";

export const App = () => {
	const app = useApp();
	const os = useOs();

	return (
		<FullViewport>
			<WriteToolboxClasses />
			<Vertical heightFull className={os === "android" || os === "ios" ? "mobile" : "not-mobile"}>
				<h1>🎵 Clever Music Player</h1>
				{app.currentTab === "Player" && <Player />}
				{app.currentTab === "Playlist" && <Playlist />}
				{app.currentTab === "Dashboard" && <Dashboard />}
				{app.currentTab === "Danger Zone" && <DangerZone />}
				<Horizontal gap={4}>
					<Tab
						isActive={app.currentTab === "Player"}
						tabCount={4}
						icon={<Music size={16} />}
						onClick={() => actions.currentTab.update("Player")}
					/>
					<Tab
						isActive={app.currentTab === "Playlist"}
						tabCount={4}
						icon={<ListMusic size={16} />}
						onClick={() => actions.currentTab.update("Playlist")}
					/>
					<Tab
						isActive={app.currentTab === "Dashboard"}
						tabCount={4}
						icon={<BarChart3 size={16} />}
						onClick={() => actions.currentTab.update("Dashboard")}
					/>
					<Tab
						isActive={app.currentTab === "Danger Zone"}
						tabCount={4}
						icon={<AlertTriangle size={16} />}
						onClick={() => actions.currentTab.update("Danger Zone")}
					/>
				</Horizontal>
			</Vertical>
			<PWABadge />
		</FullViewport>
	);
};
