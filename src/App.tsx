import { writeFolderInfo } from "@/actions/utils/folderInfoUtil";
import { updateSongSkipOdds } from "@/actions/utils/songUtil";
import { handleOpenFolder } from "@/appUtils";
import { DangerZone } from "@/components/dangerZone/DangerZone";
import { Dashboard } from "@/components/dashboard/Dashboard";
import type { PlayerProps } from "@/components/player/Player";
import { Player } from "@/components/player/Player";
import type { PlaylistProps } from "@/components/playlist/Playlist";
import { Playlist } from "@/components/playlist/Playlist";
import { TabGroup, Title } from "@/components/ui";
import { currentAudio, type Song } from "@/globalState";
import { FullViewport, Horizontal, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";
import { useMount } from "@/utils/useMount";
import { useViewportSize } from "@/utils/useViewportSize";
import { AlertTriangle, BarChart3, ListMusic, Music } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRegisterSW } from "virtual:pwa-register/react";

type AppTab = "Player" | "Playlist" | "Dashboard" | "Danger Zone";

type App = {
	currentTab: {
		value: AppTab;
		setValue: React.Dispatch<React.SetStateAction<AppTab>>;
	};
	isAboveMd: boolean;
	player: PlayerProps;
	playlist: PlaylistProps;
};

const AppDisplay = ({ app }: { app: App }) => (
	<FullViewport>
		<WriteToolboxClasses />
		<Toaster toastOptions={{ duration: 3000, position: "bottom-center" }} />
		<Vertical heightFull>
			<Vertical heightMaxContent overflowAuto paddingTop={16} paddingBottom={16} flexGrow>
				<Horizontal justifyContent="center">
					<Title order={1}>🎵 Clever Music Player</Title>
				</Horizontal>
				{app.currentTab.value === "Player" && <Player {...app.player} />}
				{app.currentTab.value === "Playlist" && <Playlist {...app.playlist} />}
				{app.currentTab.value === "Dashboard" && <Dashboard songList={app.playlist.songList} />}
				{app.currentTab.value === "Danger Zone" && <DangerZone songList={app.playlist.songList} />}
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

	const [folderName, setFolderName] = useState("");
	const [songList, setSongList] = useState<Song[]>([]);
	const [isFolderLoading, setIsFolderLoading] = useState(false);
	const [totalToLoadCount, setTotalToLoadCount] = useState(0);
	const [totalLoadedCount, setTotalLoadedCount] = useState(0);

	const [currentSong, setCurrentSong] = useState({
		song: null as Song | null,
		imgSrc: null as string | null,
		isConsideredAsPlayed: false,
	});

	const [isSongPlaying, setIsSongPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const updateCurrentTime = (value: number) =>
		setCurrentTime(() => {
			currentAudio.currentTime = (value * (currentAudio.duration || 0)) / 100;
			return value;
		});
	const [rollbackSongList, setRollbackSongList] = useState<Song[]>([]);

	useMount(() => {
		currentAudio.ontimeupdate = () => {
			setCurrentTime(currentAudio.currentTime);
			if (currentSong.isConsideredAsPlayed || currentAudio.currentTime < 60) return;
			setCurrentSong((prev) => ({ ...prev, isConsideredAsPlayed: true }));
			setSongList((songList) => {
				const newSongList = songList.map((song) =>
					song.filename === currentSong.song?.filename ? updateSongSkipOdds(song, "play") : song
				);
				writeFolderInfo({ folderName, songList: newSongList });
				return newSongList;
			});
		};
		// currentAudio.onended = () => actions.player.song.next();
		currentAudio.onplaying = () => setIsSongPlaying(true);
		currentAudio.onpause = () => setIsSongPlaying(false);
	});

	const openFolderFn = useCallback(
		(closeNoMusicModal: () => void) => () =>
			handleOpenFolder({
				setFolderName,
				setSongList,
				setIsFolderLoading,
				closeNoMusicModal,
				oldImgSrc: currentSong.imgSrc,
				setRollbackSongList,
				setCurrentSong,
				setTotalToLoadCount,
				setTotalLoadedCount,
			}),
		[currentSong.imgSrc]
	);

	const app = useMemo<App>(
		() => ({
			currentTab: { value: currentTab, setValue: setCurrentTab },
			isAboveMd,
			player: {
				currentSong,
				bCanRollbackSong: rollbackSongList.length >= 1,
				isSongPlaying,
				folder: { openFn: openFolderFn, isLoading: isFolderLoading, totalToLoadCount, totalLoadedCount },
				currentTime: { value: currentTime, update: updateCurrentTime },
			},
			playlist: {
				songList,
				currentSong,
				isSongPlaying,
				isFolderLoading,
			},
		}),
		[
			currentSong,
			currentTab,
			currentTime,
			isAboveMd,
			isFolderLoading,
			isSongPlaying,
			openFolderFn,
			rollbackSongList.length,
			songList,
			totalLoadedCount,
			totalToLoadCount,
		]
	);

	return <AppDisplay app={app} />;
};
