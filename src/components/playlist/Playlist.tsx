import { actions } from "@/actions/actions";
import { displayArtistAlbum, displayTitle } from "@/components/componentUtil";
import { Button, SearchInput, Title } from "@/components/ui";
import { currentAudio, type AppState, type Song } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Ban, FolderOpen, Music, Pause, Play, RefreshCw } from "lucide-react";

const PlaylistSongs = ({
	songFilter,
	filteredSongList,
	currentSong,
	isPlaying,
}: {
	songFilter: string;
	filteredSongList: Song[];
	currentSong: Song | null;
	isPlaying: boolean;
}) => (
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
				{filteredSongList.length === 0 && (
					<tr>
						<td colSpan={2}>
							<Title order={5} text="No songs found" />
						</td>
					</tr>
				)}
				{filteredSongList.map((song, index) => (
					<tr key={song.filename}>
						<td>
							<Title order={5} text={displayTitle(song)} />
							<Title order={6} text={displayArtistAlbum(song)} />
						</td>
						<td>
							<Horizontal gap={16} justifyContent="flex-end">
								{isPlaying && currentSong?.filename === song.filename ? (
									<Button icon={<Pause size={14} />} variant="filled" onClick={actions.player.song.pause} />
								) : (
									<Button
										icon={<Play size={14} />}
										variant="filled"
										onClick={actions.player.song.playFn(
											song,
											currentSong?.filename === song.filename ? currentAudio.currentTime : 0
										)}
									/>
								)}

								<Button
									icon={<Ban size={14} />}
									variant="filled"
									color="danger"
									onClick={actions.playlist.song.ban.toggleFn(index)}
								/>
							</Horizontal>
						</td>
					</tr>
				))}
				{/* <tr>
					<th className="table-header-alphabet" colSpan={2}>
						A
					</th>
				</tr> */}
			</tbody>
			<tfoot>
				<tr>
					<th colSpan={2} className="table-footer">
						📊 Total: {filteredSongList.length} songs, 2h35
					</th>
				</tr>
			</tfoot>
		</table>
	</Vertical>
);

export const Playlist = ({
	playlist,
	filteredSongList,
	currentSong,
	isPlaying,
}: {
	playlist: AppState["playlist"];
	filteredSongList: Song[];
	currentSong: Song | null;
	isPlaying: boolean;
}) => (
	<Vertical alignItems="center" flexGrow className="container" overflowAuto>
		<Horizontal justifyContent="space-between" gap={16} widthFull marginTop={12}>
			<Button icon={<RefreshCw size={16} />} text="Refresh" variant="light" onClick={actions.playlist.folder.refresh} />
			<Button icon={<FolderOpen size={16} />} text="Open Folder" variant="filled" onClick={actions.playlist.folder.handleOpen} />
		</Horizontal>
		<PlaylistSongs
			songFilter={playlist.songFilter}
			filteredSongList={filteredSongList}
			currentSong={currentSong}
			isPlaying={isPlaying}
		/>
	</Vertical>
);
