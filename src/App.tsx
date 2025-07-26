import { actions } from "@/actions/actions";
import { NoMusicModal } from "@/components/app/NoMusicModal";
import { DangerZone } from "@/components/dangerZone/DangerZone";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Player } from "@/components/player/Player";
import { Playlist } from "@/components/playlist/Playlist";
import { Tab, Title } from "@/components/ui";
import { useApp } from "@/globalState";
import PWABadge from "@/PWABadge";
import { FullViewport, Horizontal, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";
import { useOs } from "@/utils/useOs";
import { AlertTriangle, BarChart3, ListMusic, Music } from "lucide-react";
import { useEffect } from "react";

export const App = () => {
	const app = useApp();
	const os = useOs();

	useEffect(() => {
		if (app.songList.length === 0 && !app.bShowNoFolderModal) actions.app.noFolderModal.open();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<FullViewport>
			<WriteToolboxClasses />
			<Vertical heightFull className={os === "android" || os === "ios" ? "mobile" : "not-mobile"} paddingTop={16}>
				<Title order={1} text="🎵 Clever Music Player" className="margin-bottom-16" />
				{app.currentTab === "Player" && <Player player={app.player} />}
				{app.currentTab === "Playlist" && <Playlist playlist={app.playlist} songList={app.songList} />}
				{app.currentTab === "Dashboard" && <Dashboard />}
				{app.currentTab === "Danger Zone" && <DangerZone />}
				<Horizontal gap={4}>
					<Tab
						isActive={app.currentTab === "Player"}
						tabCount={4}
						icon={<Music size={16} />}
						onClick={() => actions.app.currentTab.update("Player")}
					/>
					<Tab
						isActive={app.currentTab === "Playlist"}
						tabCount={4}
						icon={<ListMusic size={16} />}
						onClick={() => actions.app.currentTab.update("Playlist")}
					/>
					<Tab
						isActive={app.currentTab === "Dashboard"}
						tabCount={4}
						icon={<BarChart3 size={16} />}
						onClick={() => actions.app.currentTab.update("Dashboard")}
					/>
					<Tab
						isActive={app.currentTab === "Danger Zone"}
						tabCount={4}
						icon={<AlertTriangle size={16} />}
						onClick={() => actions.app.currentTab.update("Danger Zone")}
					/>
				</Horizontal>
			</Vertical>
			<NoMusicModal isOpen={app.bShowNoFolderModal} onClose={actions.app.noFolderModal.close} />
			<PWABadge />
		</FullViewport>
	);
};
