import { actions } from "@/actions/actions";
import { Button, SearchInput, Title } from "@/components/ui";
import type { Song } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { BarChart3, Minus, Music, Plus } from "lucide-react";

const displayOdds = (skipOdds: number) => (skipOdds * 100).toFixed(1);

export const Dashboard = ({ sortedSongList, meanSkipOdds }: { sortedSongList: Song[]; meanSkipOdds: number }) => (
	<Vertical alignItems="center" flexGrow className="container" overflowAuto>
		<Vertical widthFull>
			<Title order={3} text="Skip odds" icon={<BarChart3 size={24} />} />
			<table>
				<thead>
					<tr>
						<th colSpan={2}>
							<Horizontal justifyContent="space-between">
								<Title order={3} text="Songs" icon={<Music size={20} style={{ marginTop: 4 }} />} noMargin />
								<SearchInput value="" placeholder="Search songs..." />
							</Horizontal>
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedSongList.length === 0 && (
						<tr>
							<td colSpan={2}>
								<Title order={5} text="No songs found" />
							</td>
						</tr>
					)}
					{sortedSongList.map((song, index) => (
						<tr key={song.filename}>
							<td>
								<Title order={5} text={`🎶 ${song.title}`} />
								<Title order={6} text={`👤 ${song.artist} • ${song.album}`} />
							</td>
							<td>
								<Horizontal justifyContent="center" gap={8}>
									<Button
										icon={<Minus size={16} />}
										variant="filled"
										isCompact
										onClick={actions.dashboard.skipOdds.decreaseFn(index)}
									/>
									<div className="odds-text">{displayOdds(song.skipOdds)} %</div>
									<Button
										icon={<Plus size={16} />}
										variant="filled"
										isCompact
										onClick={actions.dashboard.skipOdds.increaseFn(index)}
									/>
								</Horizontal>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<th className="table-footer">📊 Mean score</th>
						<th className="table-footer" style={{ textAlign: "right" }}>
							{displayOdds(meanSkipOdds)} %
						</th>
					</tr>
				</tfoot>
			</table>
		</Vertical>
	</Vertical>
);
