import type { EBorder } from "@/components/ui/eborder";
import { getBorderRadiusStyle } from "@/components/ui/eborder";
import React from "react";

interface TabProps {
	isActive: boolean;
	tabCount: number;
	text?: string;
	icon?: React.ReactNode;
	onClick?: () => void;
	borderRadius?: EBorder[];
}

export const Tab: React.FC<TabProps> = ({ isActive, tabCount, text, icon, onClick, borderRadius }) => {
	return (
		<button
			className={`tab ${isActive ? "active" : ""}`}
			onClick={onClick}
			style={{ width: `${100 / tabCount}%`, ...getBorderRadiusStyle(borderRadius ?? [], "8px") }}
		>
			{icon && <span className="tab-icon">{icon}</span>}
			<span className="tab-text">{text}</span>
		</button>
	);
};
