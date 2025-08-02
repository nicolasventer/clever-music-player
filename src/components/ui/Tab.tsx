import type { TypedOmit } from "@/components/typedOmit";
import type { ButtonProps } from "@/components/ui/Button";
import { Button } from "@/components/ui/Button";

export type BaseTabProps = {
	// Core props
	isActive: boolean;
	tabCount: number;

	// Layout props
	orientation?: "horizontal" | "vertical";
};

export type TabProps = TypedOmit<ButtonProps, "variant" | "noShadow"> & BaseTabProps;

export const Tab = ({
	// Core props
	isActive,
	tabCount,

	// Layout props
	orientation = "horizontal",

	// Styling props
	borderRadius = [],
	color = "theme",
	shadow,

	// HTML attributes
	style,
	...buttonProps
}: TabProps) =>
	isActive ? (
		<Button
			variant="filled"
			color={color}
			borderRadius={borderRadius}
			noShadow={!shadow}
			{...buttonProps}
			style={{
				width: orientation === "horizontal" ? `${100 / tabCount}%` : "auto",
				height: orientation === "vertical" ? `${100 / tabCount}%` : "auto",
				...style,
			}}
		/>
	) : (
		<Button
			variant="light"
			color={color}
			borderRadius={borderRadius}
			shadow={shadow}
			{...buttonProps}
			style={{
				width: orientation === "horizontal" ? `${100 / tabCount}%` : "auto",
				height: orientation === "vertical" ? `${100 / tabCount}%` : "auto",
				...style,
			}}
		/>
	);
