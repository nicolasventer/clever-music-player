import type { BorderFilter, BorderType } from "@/components/_ui/eborder";
import { getBorderRadiusClasses } from "@/components/_ui/eborder";
import type { HTMLAttributes, ReactNode } from "react";

export type BaseCardProps = {
	// Layout props
	borderRadius?: BorderType[];
	borderRadiusFilter?: BorderFilter;
	borderRadiusSize?: "none" | "sm" | "md" | "lg";
	scrollable?: boolean | "x" | "y" | "xy"; // default false, true means "y"
	children?: ReactNode;
	scrollableDivProps?: HTMLAttributes<HTMLDivElement>;
};

export type CardProps = HTMLAttributes<HTMLDivElement> & BaseCardProps;

export const Card = ({
	// Layout props
	borderRadius = ["all"],
	borderRadiusFilter = "all",
	borderRadiusSize = "md",
	scrollable,
	// HTML attributes
	className,
	children,
	scrollableDivProps,
	...divProps
}: CardProps) => {
	// Border radius size classes
	const radiusSizeClass = `card-radius-${borderRadiusSize}`;

	const allClasses = ["card", radiusSizeClass, ...getBorderRadiusClasses(borderRadius, borderRadiusFilter)];
	if (className) allClasses.push(className);

	return (
		<div className={allClasses.join(" ")} {...divProps}>
			{scrollable ? (
				<div
					{...scrollableDivProps}
					className={`card-wrapper card-wrapper-${scrollable === true ? "y" : scrollable} ${scrollableDivProps?.className ?? ""}`}
				>
					{children}
				</div>
			) : (
				children
			)}
		</div>
	);
};
