import { DangerZone, DangerZoneProps } from "@/components/dangerZone/DangerZone";
import { Dashboard } from "@/components/dashboard/Dashboard";
import type { PlayerProps } from "@/components/player/Player";
import { Player } from "@/components/player/Player";
import type { PlaylistProps } from "@/components/playlist/Playlist";
import { Playlist } from "@/components/playlist/Playlist";
import { TabGroup, Title } from "@/components/ui";
import { TodoFn } from "@/utils/clientUtils";
import { FullViewport, Horizontal, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";
import { useViewportSize } from "@/utils/useViewportSize";
import { AlertTriangle, BarChart3, ListMusic, Music } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRegisterSW } from "virtual:pwa-register/react";

type AppTab = "Player" | "Playlist" | "Dashboard" | "Danger Zone";

type App = {
	currentTab: {
		value: AppTab;
		setValue: React.Dispatch<React.SetStateAction<AppTab>>;
	};
	currentSong: PlayerProps["currentSong"];
	songList: PlaylistProps["songList"];
	isAboveMd: boolean;
	threshold: DangerZoneProps["threshold"];
};

const AppDisplay = ({ app }: { app: App }) => (
	<FullViewport>
		<WriteToolboxClasses />
		<Toaster toastOptions={{ duration: 3000, position: "bottom-center" }} />
		<Vertical heightFull>
			<Vertical heightFull paddingTop={16} paddingBottom={16}>
				<Horizontal justifyContent="center">
					<Title order={1}>🎵 Clever Music Player</Title>
				</Horizontal>
				{app.currentTab.value === "Player" && <Player currentSong={app.currentSong} />}
				{app.currentTab.value === "Playlist" && <Playlist songList={app.songList} currentSong={app.currentSong} />}
				{app.currentTab.value === "Dashboard" && <Dashboard songList={app.songList.value} />}
				{app.currentTab.value === "Danger Zone" && <DangerZone threshold={app.threshold} songList={app.songList.value} />}
			</Vertical>
			<TabGroup
				items={[
					{ value: "Player", icon: <Music size={16} /> },
					{ value: "Playlist", icon: <ListMusic size={16} /> },
					{ value: "Dashboard", icon: <BarChart3 size={16} /> },
					{ value: "Danger Zone", icon: <AlertTriangle size={16} /> },
				]}
				value={app.currentTab.value}
				onValueChange={app.currentTab.setValue}
				borderRadiusSize="none"
				fullWidth
				display={app.isAboveMd ? "both" : "icon"}
			/>
		</Vertical>
	</FullViewport>
);

export const App = () => {
	const { updateServiceWorker, needRefresh } = useRegisterSW({ immediate: true });
	useEffect(() => void (needRefresh && updateServiceWorker(true)), [needRefresh, updateServiceWorker]);

	const viewportSize = useViewportSize();
	const isAboveMd = useMemo(() => viewportSize.width >= 768, [viewportSize.width]);

	const [currentTab, setCurrentTab] = useState<AppTab>("Player");

	const currentSong: PlayerProps["currentSong"] = useMemo(
		() => ({
			song: null,
			currentTime: 0,
			imgSrc: null,
			isConsideredAsPlayed: false,
			rollbackSongListLength: 0,
			isPlaying: false,
			isLoading: false,
		}),
		[]
	);

	const songList: PlaylistProps["songList"] = useMemo(
		() => ({
			value: [],
			isLoading: false,
		}),
		[]
	);

	const threshold: DangerZoneProps["threshold"] = useMemo(
		() => ({ value: 0.5, update: (_value: number) => TodoFn("update threshold") }),
		[]
	);

	const app = useMemo(
		() => ({
			currentTab: { value: currentTab, setValue: setCurrentTab },
			currentSong,
			songList,
			isAboveMd,
			threshold,
		}),
		[currentTab, currentSong, isAboveMd, songList, threshold]
	);

	return <AppDisplay app={app} />;
};
