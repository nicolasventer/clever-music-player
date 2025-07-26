import { Button, SearchInput, Title } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { BarChart3, Minus, Music, Plus } from "lucide-react";

export const Dashboard = () => (
	<Vertical alignItems="center" flexGrow className="container">
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
					<tr>
						<td>
							<Title order={5} text="🎶 Bohemian Rhapsody" />
							<Title order={6} text="👤 Queen • A Night at the Opera" />
						</td>
						<td>
							<Horizontal justifyContent="center" gap={8}>
								<Button icon={<Minus size={16} />} variant="filled" isCompact />
								<div className="odds-text">13.5 %</div>
								<Button icon={<Plus size={16} />} variant="filled" isCompact />
							</Horizontal>
						</td>
					</tr>
					<tr>
						<td>
							<Title order={5} text="🎵 Another One Bites the Dust" />
							<Title order={6} text="👤 Queen • The Game" />
						</td>
						<td>
							<Horizontal justifyContent="center" gap={8}>
								<Button icon={<Minus size={16} />} variant="filled" isCompact />
								<div className="odds-text">11 %</div>
								<Button icon={<Plus size={16} />} variant="filled" isCompact />
							</Horizontal>
						</td>
					</tr>
					<tr>
						<td>
							<Title order={5} text="🎸 Back in Black" />
							<Title order={6} text="👤 AC/DC • Back in Black" />
						</td>
						<td>
							<Horizontal justifyContent="center" gap={8}>
								<Button icon={<Minus size={16} />} variant="filled" isCompact />
								<div className="odds-text">10 %</div>
								<Button icon={<Plus size={16} />} variant="filled" isCompact />
							</Horizontal>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th className="table-footer">📊 Mean score</th>
						<th className="table-footer" style={{ textAlign: "right" }}>
							11.5 %
						</th>
					</tr>
				</tfoot>
			</table>
		</Vertical>
	</Vertical>
);
