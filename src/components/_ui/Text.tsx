import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

export type BaseTextProps = {
	// Content props
	children?: ReactNode;
	icon?: ReactNode;

	// Styling props
	size?: "sm" | "md" | "lg";
	color?: "white" | "theme" | "success" | "warning" | "danger";

	// Behavior props
	br?: boolean;
	link?: boolean | string;

	// HTML attributes
	iconProps?: HTMLAttributes<HTMLSpanElement>;
	textProps?: HTMLAttributes<HTMLSpanElement>;
};

export type TextProps = HTMLAttributes<HTMLSpanElement> & BaseTextProps;

export const Text = ({
	// Content props
	children,
	icon,

	// Styling props
	size = "md",
	color = "white",

	// Behavior props
	br,
	link,

	// HTML attributes
	className,
	onClick,
	iconProps,
	textProps,
	...spanProps
}: TextProps) => {
	const getTextClasses = () => {
		const baseClasses = ["text"];

		// Size classes
		baseClasses.push(`text-${size}`);

		// Color classes
		baseClasses.push(`text-${color}`);

		// Icon spacing
		if (icon && children) baseClasses.push("text-with-icon");

		// Link classes
		if (link) baseClasses.push("text-link");

		// Clickable classes
		if (onClick) baseClasses.push("text-clickable");

		if (className) baseClasses.push(className);

		return baseClasses.join(" ");
	};

	const handleClick: MouseEventHandler<HTMLSpanElement> = (e) => {
		if (typeof link === "string") window.location.href = link;
		else onClick?.(e);
	};

	return (
		<>
			{br && <br />}
			<span className={getTextClasses()} onClick={handleClick} {...spanProps}>
				{icon && (
					<span className="text-icon" {...iconProps}>
						{icon}
					</span>
				)}
				{children && (
					<span className="text-content" {...textProps}>
						{children}
					</span>
				)}
			</span>
		</>
	);
};
