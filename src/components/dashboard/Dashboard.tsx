import { Button, SearchInput, Title } from "@/components/ui";
import { Vertical } from "@/utils/ComponentToolbox";
import { BarChart3, Edit, Music } from "lucide-react";

export const Dashboard = () => {
	return (
		<Vertical alignItems="center" flexGrow>
			<Vertical className="dashboard-container">
				<Title order={3} text="Most Skipped Songs" icon={<BarChart3 size={24} />} />
				<table>
					<thead>
						<tr>
							<th>
								<div className="icon-with-text">
									<Music size={18} />
									Song
								</div>
							</th>
							<th>
								<div className="icon-with-text">
									<BarChart3 size={18} />
									Score
								</div>
							</th>
						</tr>
						<tr>
							<td>
								<SearchInput value="" placeholder="Search songs..." />
							</td>
							<td>
								<Button text="Edit" icon={<Edit size={14} />} variant="filled" isCompact />
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<h5>🎶 Bohemian Rhapsody</h5>
								<h6>👤 Queen • A Night at the Opera</h6>
							</td>
							<td>2/7</td>
						</tr>
						<tr>
							<td>
								<h5>🎵 Another One Bites the Dust</h5>
								<h6>👤 Queen • The Game</h6>
							</td>
							<td>1/7</td>
						</tr>
						<tr>
							<td>
								<h5>🎸 Back in Black</h5>
								<h6>👤 AC/DC • Back in Black</h6>
							</td>
							<td>6/7</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th colSpan={2} className="table-footer">
								📊 Mean score: 1.32/7.05
							</th>
						</tr>
					</tfoot>
				</table>
			</Vertical>
		</Vertical>
	);
};
