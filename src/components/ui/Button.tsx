import React from "react";

interface ButtonProps {
	text?: string;
	icon?: React.ReactNode;
	variant: "filled" | "light";
	isCompact?: boolean;
	color?: "theme" | "danger" | "warning";
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	text,
	icon,
	variant,
	isCompact = false,
	color = "theme",
	onClick,
	className = "",
	disabled = false,
}) => {
	const getButtonClasses = () => {
		const baseClasses = ["btn"];

		// Size classes
		if (isCompact) {
			baseClasses.push("btn-small");
		} else {
			baseClasses.push("btn-medium");
		}

		// Color classes
		if (color === "danger") {
			baseClasses.push("btn-danger");
		} else if (color === "warning") {
			baseClasses.push("btn-warning");
		}

		// Variant classes
		if (variant === "light") {
			baseClasses.push("btn-light");
		}

		// Icon spacing
		if (icon && text) {
			baseClasses.push("icon-with-text");
		} else if (icon && !text) {
			baseClasses.push("btn-icon-only");
		}

		return [...baseClasses, className].filter(Boolean).join(" ");
	};

	return (
		<button className={getButtonClasses()} onClick={onClick} disabled={disabled}>
			{icon && <span className="btn-icon">{icon}</span>}
			{text && <span className="btn-text">{text}</span>}
		</button>
	);
};
