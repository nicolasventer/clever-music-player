import { setAppWithUpdate } from "@/globalState";

const updateThreshold = (threshold: number) => setAppWithUpdate((app) => (app.dangerZone.threshold = threshold));
const toggleIsShowBelowEnabled = () =>
	setAppWithUpdate((app) => (app.dangerZone.isShowBelowEnabled = !app.dangerZone.isShowBelowEnabled));
const toggleIsEditModeEnabled = () =>
	setAppWithUpdate((app) => (app.dangerZone.isEditModeEnabled = !app.dangerZone.isEditModeEnabled));

export const dangerZone = {
	threshold: { update: updateThreshold },
	isShowBelowEnabled: { toggle: toggleIsShowBelowEnabled },
	isEditModeEnabled: { toggle: toggleIsEditModeEnabled },
};
