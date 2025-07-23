import { actions } from "@/actions/actions";
import { useApp } from "@/globalState";
import PWABadge from "@/PWABadge";

const AppContent = ({ isPlaying }: { isPlaying: boolean }) => (
	<button onClick={actions.player.isPlaying.toggle}>{isPlaying ? "Pause" : "Play"}</button>
);

export const App = () => {
	const app = useApp();

	return (
		<div>
			<AppContent isPlaying={app.player.isPlaying} />
			<PWABadge />
		</div>
	);
};
