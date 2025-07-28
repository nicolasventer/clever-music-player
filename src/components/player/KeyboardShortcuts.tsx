import { Title } from "@/components/ui";
import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { Keyboard } from "lucide-react";

export const KeyboardShortcuts = () => (
	<Vertical
		alignItems="center"
		style={{ marginTop: "24px", padding: "16px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "8px" }}
	>
		<Horizontal alignItems="center" style={{ gap: "8px", marginBottom: "12px" }}>
			<Keyboard size={16} />
			<Title order={5} text="Keyboard Shortcuts" noMargin />
		</Horizontal>
		<Horizontal style={{ gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
			<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
				<kbd
					style={{
						padding: "2px 6px",
						backgroundColor: "#f0f0f0",
						border: "1px solid #ccc",
						borderRadius: "4px",
						fontSize: "12px",
						color: "#333",
					}}
				>
					Space
				</kbd>
				<span style={{ fontSize: "12px", color: "#666" }}>Play/Pause</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
				<kbd
					style={{
						padding: "2px 6px",
						backgroundColor: "#f0f0f0",
						border: "1px solid #ccc",
						borderRadius: "4px",
						fontSize: "12px",
						color: "#333",
					}}
				>
					M
				</kbd>
				<span style={{ fontSize: "12px", color: "#666" }}>Mute</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
				<kbd
					style={{
						padding: "2px 6px",
						backgroundColor: "#f0f0f0",
						border: "1px solid #ccc",
						borderRadius: "4px",
						fontSize: "12px",
						color: "#333",
					}}
				>
					N
				</kbd>
				<span style={{ fontSize: "12px", color: "#666" }}>Next</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
				<kbd
					style={{
						padding: "2px 6px",
						backgroundColor: "#f0f0f0",
						border: "1px solid #ccc",
						borderRadius: "4px",
						fontSize: "12px",
						color: "#333",
					}}
				>
					P
				</kbd>
				<span style={{ fontSize: "12px", color: "#666" }}>Previous</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
				<kbd
					style={{
						padding: "2px 6px",
						backgroundColor: "#f0f0f0",
						border: "1px solid #ccc",
						borderRadius: "4px",
						fontSize: "12px",
						color: "#333",
					}}
				>
					+/-
				</kbd>
				<span style={{ fontSize: "12px", color: "#666" }}>Change volume</span>
			</div>
		</Horizontal>
	</Vertical>
);
