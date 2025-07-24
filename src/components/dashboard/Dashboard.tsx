import { Button, SearchInput, Title } from "@/components/ui";
import { Vertical } from "@/utils/ComponentToolbox";
import { BarChart3, Edit, Music } from "lucide-react";

export const Dashboard = () => {
	return (
		<Vertical alignItems="center" flexGrow className="container">
			<Vertical widthFull>
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
							<th className="score-col">
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
							<td className="score-col">
								<Button text="Edit" icon={<Edit size={14} />} variant="filled" isCompact />
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<Title order={5} text="🎶 Bohemian Rhapsody" />
								<Title order={6} text="👤 Queen • A Night at the Opera" />
							</td>
							<td className="score-col">2 / 7</td>
						</tr>
						<tr>
							<td>
								<Title order={5} text="🎵 Another One Bites the Dust" />
								<Title order={6} text="👤 Queen • The Game" />
							</td>
							<td className="score-col">1 / 7</td>
						</tr>
						<tr>
							<td>
								<Title order={5} text="🎸 Back in Black" />
								<Title order={6} text="👤 AC/DC • Back in Black" />
							</td>
							<td className="score-col">6 / 7</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th className="table-footer">📊 Mean score</th>
							<th className="table-footer score-col">1.32 / 7.05</th>
						</tr>
					</tfoot>
				</table>
			</Vertical>
		</Vertical>
	);
};
