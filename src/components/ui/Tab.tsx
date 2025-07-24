import React from "react";

interface TabProps {
	isActive: boolean;
	tabCount: number;
	text?: string;
	icon?: React.ReactNode;
	onClick?: () => void;
}

export const Tab: React.FC<TabProps> = ({ isActive, tabCount, text, icon, onClick }) => {
	return (
		<button className={`tab ${isActive ? "active" : ""}`} onClick={onClick} style={{ width: `${100 / tabCount}%` }}>
			{icon && <span className="tab-icon">{icon}</span>}
			<span className="tab-text">{text}</span>
		</button>
	);
};
