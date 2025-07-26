import { setAppWithUpdate, songIdListMap } from "@/globalState";

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.dashboard.songFilter = filter));

const increaseSkipOdds = (filename: string) =>
	setAppWithUpdate((app) => {
		songIdListMap.get(filename)?.forEach(({ folderIndex, songIndex }) => {
			const song = app.folderList[folderIndex].songList[songIndex];
			song.skipOdds = Math.min(song.skipOdds + 0.05, 1);
		});
	});

const decreaseSkipOdds = (filename: string) =>
	setAppWithUpdate((app) => {
		songIdListMap.get(filename)?.forEach(({ folderIndex, songIndex }) => {
			const song = app.folderList[folderIndex].songList[songIndex];
			song.skipOdds = Math.max(song.skipOdds - 0.05, 0);
		});
	});

export const dashboard = {
	songFilter: { update: updateSongFilter },
	skipOdds: { increase: increaseSkipOdds, decrease: decreaseSkipOdds },
};
