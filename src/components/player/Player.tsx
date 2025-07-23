import { Horizontal, Vertical } from "@/utils/ComponentToolbox";

export const Player = () => (
	<Vertical alignItems="center" flexGrow>
		<h1>Player</h1>
		<img src="cover.jpg" alt="cover" />
		<h4>Title</h4>
		<h6>Artist</h6>
		<Vertical width={300}>
			<Horizontal justifyContent="space-between">
				<div>01:21</div>
				<div>03:45</div>
			</Horizontal>
			<input type="range" />
			<Horizontal justifyContent="center">
				<button>Previous</button>
				<button>Play</button>
				<button>Next</button>
			</Horizontal>
		</Vertical>
	</Vertical>
);
