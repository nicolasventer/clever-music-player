import { actions } from "@/actions/actions";
import { Button, SearchInput, Title } from "@/components/ui";
import type { AppState } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Ban, FolderOpen, Music, Play, RefreshCw } from "lucide-react";

const PlaylistSongs = ({ songFilter, songList }: { songFilter: string; songList: AppState["songList"] }) => (
	<Vertical widthFull>
		<table>
			<thead>
				<tr>
					<th colSpan={2}>
						<Horizontal justifyContent="space-between">
							<Title order={3} text="Songs" icon={<Music size={20} style={{ marginTop: 4 }} />} noMargin />
							<SearchInput value={songFilter} placeholder="Search songs..." onChange={actions.playlist.songFilter.update} />
						</Horizontal>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th className="table-header-alphabet" colSpan={2}>
						A
					</th>
				</tr>
				<tr>
					<td>
						<Title order={5} text="🎶 Bohemian Rhapsody" />
						<Title order={6} text="👤 Queen • A Night at the Opera" />
					</td>
					<td>
						<Horizontal gap={16} justifyContent="flex-end">
							<Button icon={<Play size={14} />} variant="filled" />
							<Button icon={<Ban size={14} />} variant="filled" color="danger" />
						</Horizontal>
					</td>
				</tr>
				<tr>
					<td>
						<Title order={5} text="🎶 Another One Bites the Dust" />
						<Title order={6} text="👤 Queen • The Game" />
					</td>
					<td>
						<Horizontal gap={16} justifyContent="flex-end">
							<Button icon={<Play size={14} />} variant="filled" />
							<Button icon={<Ban size={14} />} variant="filled" color="danger" />
						</Horizontal>
					</td>
				</tr>
				<tr>
					<th className="table-header-alphabet" colSpan={2}>
						B
					</th>
				</tr>
				<tr>
					<td>
						<Title order={5} text="🎶 Bohemian Rhapsody (Live)" />
						<Title order={6} text="👤 Queen • Live at Wembley" />
					</td>
					<td>
						<Horizontal gap={16} justifyContent="flex-end">
							<Button icon={<Play size={14} />} variant="filled" />
							<Button icon={<Ban size={14} />} variant="filled" color="danger" />
						</Horizontal>
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
);

export const Playlist = ({ playlist, songList }: { playlist: AppState["playlist"]; songList: AppState["songList"] }) => (
	<Vertical alignItems="center" flexGrow className="container" overflowAuto>
		<Horizontal justifyContent="space-between" gap={16} widthFull marginTop={12}>
			<Button icon={<RefreshCw size={16} />} text="Refresh" variant="light" onClick={actions.playlist.folder.refresh} />
			<Button icon={<FolderOpen size={16} />} text="Open Folder" variant="filled" onClick={actions.playlist.folder.handleOpen} />
		</Horizontal>
		<PlaylistSongs songFilter={playlist.songFilter} songList={songList} />
	</Vertical>
);
