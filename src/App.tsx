import { actions } from "@/actions/actions";
import { NoMusicModal } from "@/components/app/NoMusicModal";
import { AboveThresholdModal } from "@/components/dangerZone/AboveThresholdModal";
import { DangerZone } from "@/components/dangerZone/DangerZone";
import { DeleteConfirmationModal } from "@/components/dangerZone/DeleteConfirmationModal";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Player } from "@/components/player/Player";
import { Playlist } from "@/components/playlist/Playlist";
import { Tab, Title } from "@/components/ui";
import { LOCAL_STORAGE_KEY, localStorageStateStore, useApp } from "@/globalState";
import PWABadge from "@/PWABadge";
import { FullViewport, Horizontal, Vertical, WriteToolboxClasses } from "@/utils/ComponentToolbox";
import { useOs } from "@/utils/useOs";
import { AlertTriangle, BarChart3, ListMusic, Music } from "lucide-react";
import { useEffect, useMemo } from "react";

export const App = () => {
	const app = useApp();
	const os = useOs();

	const threshold = app.dangerZone.threshold;
	localStorageStateStore.useEffect((setLocalStorageState) => setLocalStorageState({ threshold }), [threshold]);

	// save the local storage state to the local storage
	const localStorageState = localStorageStateStore.use();
	useEffect(() => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageState)), [localStorageState]);

	useEffect(() => {
		if (app.folder.songList.length === 0 && !app.bShowNoFolderModal) actions.app.noFolderModal.open();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const filteredSongList = useMemo(
		() =>
			app.folder.songList.filter(({ title, artist, album }) =>
				[title, artist, album].some((x) => x.toLowerCase().includes(app.playlist.songFilter.toLowerCase()))
			),
		[app.playlist.songFilter, app.folder.songList]
	);

	const sortedSongList = useMemo(() => app.folder.songList.sort((a, b) => b.skipOdds - a.skipOdds), [app.folder.songList]);

	const meanSkipOdds = useMemo(
		() => sortedSongList.reduce((acc, song) => acc + song.skipOdds, 0) / Math.max(sortedSongList.length, 1),
		[sortedSongList]
	);

	const aboveThresholdSongList = useMemo(
		() => app.folder.songList.filter((song) => song.skipOdds > app.dangerZone.threshold),
		[app.folder.songList, app.dangerZone.threshold]
	);

	return (
		<FullViewport>
			<WriteToolboxClasses />
			<Vertical heightFull className={os === "android" || os === "ios" ? "mobile" : "not-mobile"} paddingTop={16}>
				<Title order={1} text="🎵 Clever Music Player" className="margin-bottom-16" />
				{app.currentTab === "Player" && <Player player={app.player} />}
				{app.currentTab === "Playlist" && (
					<Playlist
						playlist={app.playlist}
						filteredSongList={filteredSongList}
						currentSong={app.player.currentSong.song}
						isPlaying={app.player.isPlaying}
					/>
				)}
				{app.currentTab === "Dashboard" && <Dashboard sortedSongList={sortedSongList} meanSkipOdds={meanSkipOdds} />}
				{app.currentTab === "Danger Zone" && (
					<DangerZone dangerZone={app.dangerZone} aboveThresholdSongList={aboveThresholdSongList} />
				)}
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
			<AboveThresholdModal
				isOpen={app.dangerZone.bShowAboveModal}
				onClose={actions.dangerZone.aboveModal.close}
				songs={aboveThresholdSongList}
				threshold={app.dangerZone.threshold}
			/>
			<DeleteConfirmationModal
				isOpen={app.dangerZone.bShowDeleteModal}
				onClose={actions.dangerZone.deleteModal.close}
				songs={aboveThresholdSongList}
				threshold={app.dangerZone.threshold}
			/>
			<PWABadge />
		</FullViewport>
	);
};
