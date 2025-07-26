import { setAppWithUpdate } from "@/globalState";

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.dashboard.songFilter = filter));

const increaseSkipOdds = (index: number) =>
	setAppWithUpdate((app) => (app.songList[index].skipOdds = Math.min(app.songList[index].skipOdds + 0.05, 1)));

const decreaseSkipOdds = (index: number) =>
	setAppWithUpdate((app) => (app.songList[index].skipOdds = Math.max(app.songList[index].skipOdds - 0.05, 0)));

export const dashboard = {
	songFilter: { update: updateSongFilter },
	skipOdds: { increase: increaseSkipOdds, decrease: decreaseSkipOdds },
};
