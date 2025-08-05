import { actions } from "@/actions/actions";
import { appStore } from "@/globalState";
import { useEffect } from "react";

export const useKeyboardShortcuts = () => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

			switch (event.key.toLowerCase()) {
				case " ":
					event.preventDefault();
					actions.player.song.pressPlayFn(
						appStore.value.player.currentSong.song,
						appStore.value.player.currentSong.currentTime
					)();
					break;
				case "m":
					event.preventDefault();
					actions.player.isMuted.toggle();
					break;
				case "n":
					event.preventDefault();
					actions.player.song.next();
					break;
				case "p":
					event.preventDefault();
					actions.player.song.previous();
					break;
				case "+":
					event.preventDefault();
					actions.player.volume.increment();
					break;
				case "-":
					event.preventDefault();
					actions.player.volume.decrement();
					break;
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);
};
