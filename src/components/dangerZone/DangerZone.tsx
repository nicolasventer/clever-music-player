import { Horizontal, Vertical } from "@/utils/ComponentToolbox";

export const DangerZone = () => (
	<Vertical alignItems="center" flexGrow>
		<h1>Danger Zone</h1>
		<Vertical>
			<Horizontal justifyContent="space-between">
				<Horizontal>
					<div>Threshold:</div>
					<input type="number" />
				</Horizontal>
				<div>5 songs below</div>
			</Horizontal>
			<Horizontal justifyContent="space-between">
				<button>Show</button>
				<button>Delete</button>
			</Horizontal>
			<button>Reset all skip counts</button>
			<button>Reset skip count for a folder</button>
		</Vertical>
	</Vertical>
);
