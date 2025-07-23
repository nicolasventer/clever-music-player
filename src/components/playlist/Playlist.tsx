import { Horizontal, Vertical } from "@/utils/ComponentToolbox";

export const Playlist = () => (
	<Vertical alignItems="center" flexGrow>
		<Horizontal justifyContent="center" positionRelative widthFull>
			<h1>Playlist</h1>
			<Horizontal justifyContent="flex-end" positionAbsolute widthFull>
				<button>Refresh</button>
			</Horizontal>
		</Horizontal>
		<Horizontal width={300}>
			<button className="tab" style={{ width: "50%" }}>
				Songs
			</button>
			<button className="tab" style={{ width: "50%" }}>
				Folders
			</button>
		</Horizontal>
		<Vertical>
			<table>
				<thead>
					<tr>
						<th colSpan={2}>
							<Horizontal justifyContent="space-between">
								<h3>Songs</h3>
								<input type="search" />
							</Horizontal>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>A</th>
					</tr>
					<tr>
						<td>
							<h5>Song 1</h5>
							<h6>Artist 1</h6>
						</td>
						<td>
							<button>Play</button>
						</td>
					</tr>
					<tr>
						<td>
							<h5>Song 2</h5>
							<h6>Artist 2</h6>
						</td>
						<td>
							<button>Play</button>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th colSpan={2}>Total: 420 songs, 2h35</th>
					</tr>
				</tfoot>
			</table>
		</Vertical>
	</Vertical>
);
