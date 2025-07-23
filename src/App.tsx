import { actions } from "@/actions/actions";
import { DangerZone } from "@/components/dangerZone/DangerZone";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Player } from "@/components/player/Player";
import { Playlist } from "@/components/playlist/Playlist";
import { useApp } from "@/globalState";
import PWABadge from "@/PWABadge";
import { FullViewport, Horizontal, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";

export const App = () => {
	const app = useApp();

	return (
		<FullViewport>
			<WriteToolboxClasses />
			<Vertical heightFull>
				{app.currentTab === "Player" && <Player />}
				{app.currentTab === "Playlist" && <Playlist />}
				{app.currentTab === "Dashboard" && <Dashboard />}
				{app.currentTab === "Danger Zone" && <DangerZone />}
				<Horizontal>
					<button className="tab" style={{ width: "25%" }} onClick={() => actions.currentTab.update("Player")}>
						Player
					</button>
					<button className="tab" style={{ width: "25%" }} onClick={() => actions.currentTab.update("Playlist")}>
						Playlist
					</button>
					<button className="tab" style={{ width: "25%" }} onClick={() => actions.currentTab.update("Dashboard")}>
						Dashboard
					</button>
					<button className="tab" style={{ width: "25%" }} onClick={() => actions.currentTab.update("Danger Zone")}>
						Danger Zone
					</button>
				</Horizontal>
			</Vertical>
			<PWABadge />
		</FullViewport>
	);
};
