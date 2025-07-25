import { setAppWithUpdate } from "@/globalState";

const updateThreshold = (threshold: number) => setAppWithUpdate((app) => (app.dangerZone.threshold = threshold));

const toggleIsShowBelowEnabled = () =>
	setAppWithUpdate((app) => (app.dangerZone.isShowBelowEnabled = !app.dangerZone.isShowBelowEnabled));

export const dangerZone = {
	threshold: { update: updateThreshold },
	isShowBelowEnabled: { toggle: toggleIsShowBelowEnabled },
};
