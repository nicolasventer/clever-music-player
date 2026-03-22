import type { BorderFilter, BorderType } from "@/components/_ui/eborder";
import { getBorderRadiusClasses } from "@/components/_ui/eborder";
import type { HTMLAttributes, ReactNode, Ref } from "react";

export type BaseCardProps = {
	// Layout props
	borderRadius?: BorderType[];
	borderRadiusFilter?: BorderFilter;
	borderRadiusSize?: "none" | "sm" | "md" | "lg";
	scrollable?: boolean | "x" | "y" | "xy"; // default false, true means "y"
	noShadow?: boolean;
	children?: ReactNode;
	scrollableDivProps?: HTMLAttributes<HTMLDivElement>;
	ref?: Ref<HTMLDivElement>;
};

export type CardProps = HTMLAttributes<HTMLDivElement> & BaseCardProps;

export const Card = ({
	// Layout props
	borderRadius = ["all"],
	borderRadiusFilter = "all",
	borderRadiusSize = "md",
	scrollable,
	noShadow,

	// HTML attributes
	className,
	children,
	scrollableDivProps,
	ref,
	...divProps
}: CardProps) => {
	// Border radius size classes
	const radiusSizeClass = `card-radius-${borderRadiusSize}`;
	const allClasses = ["card", radiusSizeClass, ...getBorderRadiusClasses(borderRadius, borderRadiusFilter)];
	if (noShadow) allClasses.push("no-shadow");
	if (className) allClasses.push(className);

	return (
		<div className={allClasses.join(" ")} {...divProps} ref={ref}>
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
