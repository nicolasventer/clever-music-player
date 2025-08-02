import type { BorderFilter, BorderType } from "@/components/ui/eborder";
import { getBorderRadiusClasses } from "@/components/ui/eborder";
import type { HTMLAttributes } from "react";

export type BaseCardProps = {
	// Layout props
	borderRadius?: BorderType[];
	borderRadiusFilter?: BorderFilter;
	borderRadiusSize?: "none" | "small" | "medium" | "large";
};

export type CardProps = HTMLAttributes<HTMLDivElement> & BaseCardProps;

export const Card = ({
	// Layout props
	borderRadius = ["all"],
	borderRadiusFilter = "all",
	borderRadiusSize = "medium",

	// HTML attributes
	className,
	...divProps
}: CardProps) => {
	// Border radius size classes
	const radiusSizeClass = `card-radius-${borderRadiusSize}`;

	const allClasses = ["card", radiusSizeClass, ...getBorderRadiusClasses(borderRadius, borderRadiusFilter)];
	if (className) allClasses.push(className);

	return <div className={allClasses.join(" ")} {...divProps} />;
};
