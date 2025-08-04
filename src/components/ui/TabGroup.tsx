import type { TypedOmit } from "@/components/typedOmit";
import type { TabProps } from "@/components/ui/Tab";
import { Tab } from "@/components/ui/Tab";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { useState } from "react";

export type TabItem<T extends string> =
	| T
	| {
			value: T;
			icon?: ReactNode;
			children?: ReactNode;
	  };

// eslint-disable-next-line react-refresh/only-export-components
export const asTabItems = <T extends string>(items: readonly TabItem<T>[]) => items;

export type BaseTabGroupProps<T extends string> = {
	// Core props
	items: readonly TabItem<T>[];

	// Value/State props
	value?: T;
	onValueChange?: (value: T) => void;
	initialValue?: T;

	// Styling props
	color?: TabProps["color"];

	// Layout props
	fullWidth?: boolean;
	fullHeight?: boolean;
	gap?: number;
	alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
	justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
};

export type TabGroupProps<T extends string> = TypedOmit<
	TypedOmit<TabProps, keyof ButtonHTMLAttributes<HTMLButtonElement>>,
	"circular" | "icon" | "isActive" | "tabCount" | "borderRadiusFilter" | "fullWidth"
> &
	BaseTabGroupProps<T> &
	HTMLAttributes<HTMLDivElement>;

const getBorderRadiusFilter = (orientation: "horizontal" | "vertical", index: number, length: number) =>
	orientation === "horizontal"
		? index === 0
			? "left"
			: index === length - 1
			? "right"
			: "all"
		: index === 0
		? "top"
		: index === length - 1
		? "bottom"
		: "all";

export const TabGroup = <T extends string>({
	// Core props
	items,

	// Value/State props
	value,
	onValueChange,
	initialValue,

	// Styling props
	shadow = true,
	size = "medium",
	color = "theme",
	borderRadiusSize = "large",
	borderRadius = ["all"],

	// Layout props
	fullWidth,
	fullHeight,
	orientation = "horizontal",
	gap = 1,
	alignItems,
	justifyContent,

	// Behavior props
	isLoading,
	display = "both",

	// HTML attributes
	className,
	...divProps
}: TabGroupProps<T>) => {
	const [privateValue, setPrivateValue] = useState<T>(
		value ?? initialValue ?? (typeof items[0] === "string" ? items[0] : items[0]?.value ?? "")
	);

	const handleTabClick = (tabValue: T) => {
		onValueChange?.(tabValue);
		setPrivateValue(tabValue);
	};

	const getContainerClasses = () => {
		const baseClasses = ["tab-group"];

		baseClasses.push(`tab-group-${orientation}`);

		if (fullWidth) baseClasses.push("tab-group-full-width");

		if (fullHeight) baseClasses.push("tab-group-full-height");

		if (className) baseClasses.push(className);

		return baseClasses.join(" ");
	};

	return (
		<div className={getContainerClasses()} style={{ gap, alignItems, justifyContent }} {...divProps}>
			{items
				.map((item) => (typeof item === "string" ? { value: item } : item))
				.map((item, index) => (
					<Tab
						key={item.value}
						isActive={(value ?? privateValue) === item.value}
						tabCount={items.length}
						orientation={orientation}
						size={size}
						color={color}
						shadow={shadow}
						onClick={() => handleTabClick(item.value)}
						icon={item.icon}
						borderRadius={borderRadius}
						borderRadiusSize={index === 0 || index === items.length - 1 ? borderRadiusSize : "none"}
						borderRadiusFilter={getBorderRadiusFilter(orientation, index, items.length)}
						isLoading={isLoading}
						display={display}
					>
						{item.children ?? item.value}
					</Tab>
				))}
		</div>
	);
};
