import { setAppWithUpdate } from "@/globalState";

const updateSongFilter = (filter: string) => setAppWithUpdate((app) => (app.dashboard.songFilter = filter));

const toggleIsEditModeEnabled = () =>
	setAppWithUpdate((app) => (app.dashboard.isEditModeEnabled = !app.dashboard.isEditModeEnabled));

export const dashboard = {
	songFilter: { update: updateSongFilter },
	isEditModeEnabled: { toggle: toggleIsEditModeEnabled },
};
