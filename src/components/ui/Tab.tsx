import type { EBorder } from "@/components/ui/eborder";
import { getBorderRadiusStyle } from "@/components/ui/eborder";
import type { ReactNode } from "react";

export type TabProps = {
	isActive: boolean;
	tabCount: number;
	text?: string;
	icon?: ReactNode;
	onClick?: () => void;
	borderRadius?: EBorder[];
};

export const Tab = ({ isActive, tabCount, text, icon, onClick, borderRadius }: TabProps) => (
	<button
		className={`tab ${isActive ? "active" : ""}`}
		onClick={onClick}
		style={{ width: `${100 / tabCount}%`, ...getBorderRadiusStyle(borderRadius ?? [], "8px") }}
	>
		{icon && <span className="tab-icon">{icon}</span>}
		<span className="tab-text">{text}</span>
	</button>
);
