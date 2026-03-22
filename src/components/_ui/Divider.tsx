import { getBorderRadiusClasses } from "@/components/_ui/eborder";
import type { HTMLAttributes, ReactNode, Ref } from "react";

export type BaseDividerProps = {
	// Content props
	children?: ReactNode;

	// Behavior props
	orientation?: "horizontal" | "vertical";
	contentPosition?: number; // default 0.5

	// Styling props
	size?: "sm" | "md" | "lg"; // default md
	color?: "theme" | "danger" | "warning" | "success";

	// HTML attributes
	margin?: number | string | undefined;
	ref?: Ref<HTMLDivElement>;
};

export type DividerProps = BaseDividerProps & HTMLAttributes<HTMLDivElement>;

export const Divider = ({
	// Content props
	children,

	// Behavior props
	orientation = "horizontal",
	contentPosition = 0.5,

	// Styling props
	size = "md",
	color = "theme",

	// HTML attributes
	margin,
	style,
	ref,
	...divProps
}: DividerProps) => {
	const getDividerClasses = () => {
		const baseClasses = ["divider"];

		// Orientation classes
		baseClasses.push(`divider-${orientation}`);

		// Size classes
		baseClasses.push(`divider-${size}`);

		// Color classes
		baseClasses.push(`divider-${color}`);

		// Border radius classes - now depends on size
		baseClasses.push(`divider-radius-${size}`);

		baseClasses.push(...getBorderRadiusClasses(["all"], "all"));

		return baseClasses.join(" ");
	};

	return children ? (
		<div className={getDividerClasses()} style={{ ...style, margin }} {...divProps} ref={ref}>
			<div className="divider-line divider-line-start" style={{ flex: contentPosition }} />
			<div className="divider-content">{children}</div>
			<div className="divider-line divider-line-end" style={{ flex: 1 - contentPosition }} />
		</div>
	) : (
		<div className={getDividerClasses()} style={{ ...style, margin }} {...divProps} ref={ref} />
	);
};
