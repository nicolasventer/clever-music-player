import React from "react";

interface TabProps {
	isActive: boolean;
	value: string;
	icon?: React.ReactNode;
	onClick?: () => void;
}

export const Tab: React.FC<TabProps> = ({ isActive, value, icon, onClick }) => {
	return (
		<button className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
			{icon && <span className="tab-icon">{icon}</span>}
			<span className="tab-text">{value}</span>
		</button>
	);
};
