import { Button, SearchInput, Tab, Title } from "@/components/ui";
import { EBorder } from "@/components/ui/eborder";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Ban, FolderOpen, Music, Play, RefreshCw } from "lucide-react";

export const Playlist = () => {
	return (
		<Vertical alignItems="center" flexGrow className="container">
			<Horizontal justifyContent="flex-end" positionAbsolute style={{ top: 0, right: 0, padding: 16 }}>
				<Button icon={<RefreshCw size={16} />} variant="light" />
			</Horizontal>
			<Horizontal gap={4} widthFull>
				<Tab isActive={true} tabCount={2} text="Songs" icon={<Music size={16} />} borderRadius={[EBorder.TOP]} />
				<Tab isActive={false} tabCount={2} text="Folders" icon={<FolderOpen size={16} />} borderRadius={[EBorder.TOP]} />
			</Horizontal>
			<Vertical widthFull>
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
		</Vertical>
	);
};
