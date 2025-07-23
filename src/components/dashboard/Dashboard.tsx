import { Vertical } from "@/utils/ComponentToolbox";

export const Dashboard = () => (
	<Vertical alignItems="center" flexGrow>
		<h1>Dashboard</h1>
		<Vertical>
			<h3>Most skipped songs</h3>
			<table>
				<thead>
					<tr>
						<th>Song</th>
						<th>Score</th>
					</tr>
					<tr>
						<td>
							<input type="search" />
						</td>
						<td>
							<button>Edit</button>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<h5>Song 1</h5>
							<h6>Artist 1</h6>
						</td>
						<td>2/7</td>
					</tr>
					<tr>
						<td>
							<h5>Song 2</h5>
							<h6>Artist 2</h6>
						</td>
						<td>1/7</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th colSpan={2}>Mean score: 1.32/7.05</th>
					</tr>
				</tfoot>
			</table>
		</Vertical>
	</Vertical>
);
