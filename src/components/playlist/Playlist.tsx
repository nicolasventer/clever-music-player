import { actions } from "@/actions/actions";
import { displayArtistAlbum, displayTitle } from "@/components/componentUtil";
import { Button, SearchInput, Title } from "@/components/ui";
import type { AppState, Song } from "@/globalState";
import { currentAudio } from "@/globalState";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Ban, FolderOpen, Loader2, Music, Pause, Play, RefreshCw } from "lucide-react";

const PlaylistSongs = ({
	songFilter,
	filteredSongList,
	currentSong,
	isPlaying,
	isLoading,
	loadedCount,
	totalToLoadCount,
}: {
	songFilter: string;
	filteredSongList: Song[];
	currentSong: Song | null;
	isPlaying: boolean;
	isLoading: boolean;
	loadedCount: number;
	totalToLoadCount: number;
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
							{isLoading ? (
								<div className="loading-slide-in">
									<Vertical gap={8} alignItems="center">
										<Horizontal justifyContent="center" gap={8}>
											<div className="loading-pulse">
												<Loader2 size={16} className="animate-spin" />
											</div>
											<Title order={5} text="Loading songs..." />
										</Horizontal>
										{totalToLoadCount > 0 && (
											<div style={{ width: "100%", maxWidth: "300px" }}>
												<p style={{ color: "rgba(255, 255, 255, 0.6)", margin: 0, fontSize: "12px", textAlign: "center" }}>
													Loaded {loadedCount} of {totalToLoadCount} files
												</p>
												<div
													style={{
														width: "100%",
														height: "3px",
														backgroundColor: "rgba(255, 255, 255, 0.1)",
														borderRadius: "2px",
														marginTop: "4px",
														overflow: "hidden",
													}}
												>
													<div
														style={{
															width: `${totalToLoadCount > 0 ? (loadedCount / totalToLoadCount) * 100 : 0}%`,
															height: "100%",
															backgroundColor: "rgba(255, 255, 255, 0.6)",
															transition: "width 0.3s ease",
															borderRadius: "2px",
														}}
													/>
												</div>
											</div>
										)}
									</Vertical>
								</div>
							) : (
								<Title order={5} text="No songs found" />
							)}
						</td>
					</tr>
				)}
				{isLoading && filteredSongList.length === 0
					? // Loading skeleton rows
					  Array.from({ length: 3 }).map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<tr key={`skeleton-${index}`}>
								<td>
									<div
										className="loading-skeleton"
										style={{ height: "20px", width: "60%", borderRadius: "4px", marginBottom: "4px" }}
									/>
									<div className="loading-skeleton" style={{ height: "16px", width: "40%", borderRadius: "4px" }} />
								</td>
								<td>
									<Horizontal gap={16} justifyContent="flex-end">
										<div className="loading-skeleton" style={{ height: "32px", width: "32px", borderRadius: "50%" }} />
										<div className="loading-skeleton" style={{ height: "32px", width: "32px", borderRadius: "50%" }} />
									</Horizontal>
								</td>
							</tr>
					  ))
					: filteredSongList.map((song, index) => (
							<tr key={song.filename} className="loading-fade-in">
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
	isLoading,
	loadedCount = 0,
	totalToLoadCount = 0,
}: {
	playlist: AppState["playlist"];
	filteredSongList: Song[];
	currentSong: Song | null;
	isPlaying: boolean;
	isLoading: boolean;
	loadedCount?: number;
	totalToLoadCount?: number;
}) => (
	<Vertical alignItems="center" flexGrow className="container" overflowAuto>
		<Horizontal justifyContent="space-between" gap={16} widthFull marginTop={12}>
			<Button
				icon={isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
				text="Refresh"
				variant="light"
				onClick={actions.playlist.folder.refresh}
				disabled={isLoading}
				className={isLoading ? "loading-pulse" : ""}
			/>
			<Button
				icon={isLoading ? <Loader2 size={16} className="animate-spin" /> : <FolderOpen size={16} />}
				text="Open Folder"
				variant="filled"
				onClick={actions.playlist.folder.handleOpen}
				disabled={isLoading}
				className={isLoading ? "loading-pulse" : ""}
			/>
		</Horizontal>
		<PlaylistSongs
			songFilter={playlist.songFilter}
			filteredSongList={filteredSongList}
			currentSong={currentSong}
			isPlaying={isPlaying}
			isLoading={isLoading}
			loadedCount={loadedCount}
			totalToLoadCount={totalToLoadCount}
		/>
	</Vertical>
);
