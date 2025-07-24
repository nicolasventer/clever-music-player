import type { PlaylistTab } from "@/globalState";
import { setAppWithUpdate } from "@/globalState";

const updateCurrentTab = (tab: PlaylistTab) => setAppWithUpdate((app) => (app.playlist.currentTab = tab));

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.playlist.songFilter = filter));

const updateSongIsBanned = (songIndex: number, isBanned: boolean) =>
	setAppWithUpdate((app) => (app.songList[songIndex].isBanned = isBanned));

export const playlist = {
	currentTab: { update: updateCurrentTab },
	songFilter: { update: updateSongFilter },
	song: { ban: { update: updateSongIsBanned } },
};
