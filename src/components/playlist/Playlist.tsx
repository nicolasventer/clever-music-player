import { Button, SearchInput, Tab, Title } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { FolderOpen, Music, Play, RefreshCw } from "lucide-react";

export const Playlist = () => {
	return (
		<Vertical alignItems="center" flexGrow>
			<Horizontal justifyContent="flex-end" positionAbsolute style={{ top: 0, right: 0, padding: "16px" }}>
				<Button text="Refresh" icon={<RefreshCw size={16} />} variant="light" />
			</Horizontal>
			<Horizontal width={400} gap={4}>
				<Tab isActive={true} tabCount={2} text="Songs" icon={<Music size={16} />} />
				<Tab isActive={false} tabCount={2} text="Folders" icon={<FolderOpen size={16} />} />
			</Horizontal>
			<Vertical className="playlist-container">
				<table>
					<thead>
						<tr>
							<th colSpan={2}>
								<Horizontal justifyContent="space-between">
									<Title order={3} text="Songs" icon={<Music size={20} />} />
									<SearchInput value="" placeholder="Search songs..." />
								</Horizontal>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th className="table-header-alphabet">A</th>
						</tr>
						<tr>
							<td>
								<h5>🎶 Bohemian Rhapsody</h5>
								<h6>👤 Queen • A Night at the Opera</h6>
							</td>
							<td>
								<Button text="Play" icon={<Play size={14} />} variant="filled" isCompact />
							</td>
						</tr>
						<tr>
							<td>
								<h5>🎶 Another One Bites the Dust</h5>
								<h6>👤 Queen • The Game</h6>
							</td>
							<td>
								<Button text="Play" icon={<Play size={14} />} variant="filled" isCompact />
							</td>
						</tr>
						<tr>
							<th className="table-header-alphabet">B</th>
						</tr>
						<tr>
							<td>
								<h5>🎶 Bohemian Rhapsody (Live)</h5>
								<h6>👤 Queen • Live at Wembley</h6>
							</td>
							<td>
								<Button text="Play" icon={<Play size={14} />} variant="filled" isCompact />
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th colSpan={2} className="table-footer">
								📊 Total: 420 songs, 2h35
							</th>
						</tr>
					</tfoot>
				</table>
			</Vertical>
		</Vertical>
	);
};
