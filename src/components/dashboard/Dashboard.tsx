import { Button, SearchInput, Title } from "@/components/ui";
import { Vertical } from "@/utils/ComponentToolbox";
import { AlertCircle, AlertTriangle, BarChart3, CheckCircle, Edit, Music } from "lucide-react";

export const Dashboard = () => {
	return (
		<Vertical alignItems="center" flexGrow>
			<Vertical className="dashboard-container">
				<Title order={3} text="Most Skipped Songs" icon={<BarChart3 size={24} />} />
				<table>
					<thead>
						<tr>
							<th className="table-col-60 icon-with-text">
								<Music size={18} />
								Song
							</th>
							<th className="table-col-20 icon-with-text">
								<BarChart3 size={18} />
								Score
							</th>
							<th className="table-col-20">⚙️ Actions</th>
						</tr>
						<tr>
							<td>
								<SearchInput value="" placeholder="Search songs..." />
							</td>
							<td></td>
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
							<td className="score-warning">2/7</td>
							<td>
								<Button text="Low Score" icon={<AlertTriangle size={12} />} variant="light" color="warning" isCompact />
							</td>
						</tr>
						<tr>
							<td>
								<h5>🎵 Another One Bites the Dust</h5>
								<h6>👤 Queen • The Game</h6>
							</td>
							<td className="score-danger">1/7</td>
							<td>
								<Button text="Very Low" icon={<AlertCircle size={12} />} variant="light" color="danger" isCompact />
							</td>
						</tr>
						<tr>
							<td>
								<h5>🎸 Back in Black</h5>
								<h6>👤 AC/DC • Back in Black</h6>
							</td>
							<td className="score-success">6/7</td>
							<td>
								<Button text="Good Score" icon={<CheckCircle size={12} />} variant="light" color="theme" isCompact />
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th colSpan={3} className="table-footer">
								📊 Mean score: 1.32/7.05
							</th>
						</tr>
					</tfoot>
				</table>
			</Vertical>
		</Vertical>
	);
};
