import { writeFolderInfo } from "@/actions/folderInfoUtil";
import { setAppWithUpdate } from "@/globalState";

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.dashboard.songFilter = filter));

const increaseSkipOddsFn = (index: number) => () => {
	setAppWithUpdate((app) => (app.folder.songList[index].skipOdds = Math.min(app.folder.songList[index].skipOdds + 0.05, 1)));
	writeFolderInfo();
};

const decreaseSkipOddsFn = (index: number) => () => {
	setAppWithUpdate((app) => (app.folder.songList[index].skipOdds = Math.max(app.folder.songList[index].skipOdds - 0.05, 0)));
	writeFolderInfo();
};

export const dashboard = {
	songFilter: { update: updateSongFilter },
	skipOdds: { increaseFn: increaseSkipOddsFn, decreaseFn: decreaseSkipOddsFn },
};
