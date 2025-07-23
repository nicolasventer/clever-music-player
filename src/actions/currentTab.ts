import type { AppTab } from "@/globalState";
import { setAppWithUpdate } from "@/globalState";

const updateCurrentTab = (tab: AppTab) => setAppWithUpdate((app) => (app.currentTab = tab));

export const currentTab = {
	update: updateCurrentTab,
};
