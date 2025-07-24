import React from "react";

interface TitleProps {
	order: 1 | 2 | 3 | 4 | 5 | 6;
	text?: string;
	icon?: React.ReactNode;
	color?: "theme" | "danger" | "warning";
	className?: string;
}

export const Title: React.FC<TitleProps> = ({ order, text, icon, color = "theme", className = "" }) => {
	const getTitleClasses = () => {
		const baseClasses = [`title-${order}`];

		if (color === "danger") {
			baseClasses.push("title-danger");
		} else if (color === "warning") {
			baseClasses.push("title-warning");
		}

		if (icon) {
			baseClasses.push("icon-with-text");
		}

		return [...baseClasses, className].filter(Boolean).join(" ");
	};

	const renderTitle = () => {
		const content = (
			<>
				{icon && <span className="title-icon">{icon}</span>}
				{text && <span className="title-text">{text}</span>}
			</>
		);

		switch (order) {
			case 1:
				return <h1 className={getTitleClasses()}>{content}</h1>;
			case 2:
				return <h2 className={getTitleClasses()}>{content}</h2>;
			case 3:
				return <h3 className={getTitleClasses()}>{content}</h3>;
			case 4:
				return <h4 className={getTitleClasses()}>{content}</h4>;
			case 5:
				return <h5 className={getTitleClasses()}>{content}</h5>;
			case 6:
				return <h6 className={getTitleClasses()}>{content}</h6>;
			default:
				return <h1 className={getTitleClasses()}>{content}</h1>;
		}
	};

	return renderTitle();
};
