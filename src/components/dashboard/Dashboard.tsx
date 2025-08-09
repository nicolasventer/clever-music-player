import { Button, SearchInput, Title } from "@/components/ui";
import type { Song } from "@/globalState";
import { TodoFn } from "@/utils/clientUtils";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { BarChart3, Minus, Music, Plus } from "lucide-react";
import { useMemo } from "react";

const displayOdds = (skipOdds: number) => (skipOdds * 100).toFixed(1);

export const DashboardDisplay = ({ sortedSongList, meanSkipOdds }: { sortedSongList: Song[]; meanSkipOdds: number }) => (
	<Vertical heightFull widthFull alignItems="center" margin="auto" padding="0 24px" style={{ maxWidth: 800 }}>
		<Title order={3} icon={<BarChart3 size={24} />}>
			Skip odds
		</Title>
		<table>
			<thead>
				<tr>
					<th colSpan={2}>
						<Horizontal justifyContent="space-between">
							<Title order={3} icon={<Music size={20} style={{ marginTop: 4 }} />}>
								Songs
							</Title>
							<SearchInput value="" placeholder="Search songs..." />
						</Horizontal>
					</th>
				</tr>
			</thead>
			<tbody>
				{sortedSongList.length === 0 && (
					<tr>
						<td colSpan={2}>
							<Title order={5}>No songs found</Title>
						</td>
					</tr>
				)}
				{sortedSongList.map((song, index) => (
					<tr key={song.filename}>
						<td>
							<Title order={5}>{`🎶 ${song.title}`}</Title>
							<Title order={6}>{`👤 ${song.artist} • ${song.album}`}</Title>
						</td>
						<td>
							<Horizontal justifyContent="center" gap={8}>
								<Button icon={<Minus size={16} />} variant="filled" onClick={TodoFn(`decrease skip odds for ${index}`)} />
								<div>{displayOdds(song.skipOdds)} %</div>
								<Button icon={<Plus size={16} />} variant="filled" onClick={TodoFn(`increase skip odds for ${index}`)} />
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
);

export const Dashboard = ({ songList }: { songList: Song[] }) => {
	const sortedSongList = useMemo(() => songList.sort((a, b) => b.skipOdds - a.skipOdds), [songList]);

	const meanSkipOdds = useMemo(
		() => songList.reduce((acc, song) => acc + song.skipOdds, 0) / Math.max(songList.length, 1),
		[songList]
	);

	return <DashboardDisplay sortedSongList={sortedSongList} meanSkipOdds={meanSkipOdds} />;
};
