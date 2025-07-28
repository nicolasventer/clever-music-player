import { actions } from "@/actions/actions";
import { appStore } from "@/globalState";
import { useEffect } from "react";

export const useKeyboardShortcuts = () => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

			event.preventDefault();
			switch (event.key.toLowerCase()) {
				case " ":
					actions.player.song.pressPlayFn(
						appStore.value.player.currentSong.song,
						appStore.value.player.currentSong.currentTime
					)();
					break;
				case "m":
					actions.player.isMuted.toggle();
					break;
				case "n":
					actions.player.song.next();
					break;
				case "p":
					actions.player.song.previous();
					break;
				case "+":
					actions.player.volume.increment();
					break;
				case "-":
					actions.player.volume.decrement();
					break;
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);
};
