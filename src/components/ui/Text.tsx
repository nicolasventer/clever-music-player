import type { HTMLAttributes, ReactNode } from "react";

export type BaseTextProps = {
	// Content props
	children?: ReactNode;
	icon?: ReactNode;

	// Styling props
	size?: "small" | "medium" | "large";
	color?: "white" | "theme" | "success" | "warning" | "danger";

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
	size = "medium",
	color = "white",

	// HTML attributes
	className,
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

		if (className) baseClasses.push(className);

		return baseClasses.join(" ");
	};

	return (
		<span className={getTextClasses()} {...spanProps}>
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
	);
};
