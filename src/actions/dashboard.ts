import { actions } from "@/actions/actions";
import { setAppWithUpdate } from "@/globalState";

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.dashboard.songFilter = filter));

const increaseSkipOddsFn = (index: number) => () => {
	setAppWithUpdate((app) => (app.folder.songList[index].skipOdds = Math.min(app.folder.songList[index].skipOdds + 0.05, 1)));
	actions.playlist.folder.writeInfo();
};

const decreaseSkipOddsFn = (index: number) => () => {
	setAppWithUpdate((app) => (app.folder.songList[index].skipOdds = Math.max(app.folder.songList[index].skipOdds - 0.05, 0)));
	actions.playlist.folder.writeInfo();
};

export const dashboard = {
	songFilter: { update: updateSongFilter },
	skipOdds: { increaseFn: increaseSkipOddsFn, decreaseFn: decreaseSkipOddsFn },
};
