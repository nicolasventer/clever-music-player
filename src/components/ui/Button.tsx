import type { BorderType } from "@/components/ui/eborder";
import { getBorderRadiusClasses } from "@/components/ui/eborder";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type LightButtonProps = {
	variant: "light";
	// by default, the shadow is removed for light buttons, put shadow to keep the shadow
	shadow?: boolean;
	noShadow?: never;
};

export type FilledButtonProps = {
	variant?: "filled";
	shadow?: never;
	// by default, the shadow is added for filled buttons, put noShadow to remove the shadow
	noShadow?: boolean;
};

export type BaseButtonProps = (LightButtonProps | FilledButtonProps) & {
	// Content props
	icon?: ReactNode;
	children?: ReactNode;

	// Styling props
	size?: "small" | "medium" | "large";
	color?: "theme" | "danger" | "warning" | "success";

	// Layout props
	borderRadiusSize?: "none" | "small" | "medium" | "large";
	borderRadius?: BorderType[];
	borderRadiusFilter?: "left" | "right" | "top" | "bottom" | "all";
	circular?: boolean;
	fullWidth?: boolean;

	// Behavior props
	shadow?: boolean;
	noShadow?: boolean;
	isLoading?: boolean;
	display?: "icon" | "children" | "both";
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & BaseButtonProps;

export const Button = ({
	// Content props
	icon,
	children,

	// Styling props
	size = "medium",
	color = "theme",

	// Layout props
	borderRadiusSize = "large",
	borderRadius = ["all"],
	borderRadiusFilter = "all",
	circular,
	fullWidth,

	// Behavior props
	shadow,
	noShadow,
	disabled,
	isLoading,
	display = "both",

	// HTML attributes
	className,
	...buttonProps
}: ButtonProps) => {
	const getButtonClasses = () => {
		const baseClasses = ["btn"];

		// Size classes
		baseClasses.push(`btn-${size}`);

		// Color classes
		baseClasses.push(`btn-${color}`);

		// Variant classes (default is filled)
		if (buttonProps.variant === "light") baseClasses.push("btn-light");

		// Border radius classes (only for non-circular buttons)
		if (!circular) {
			// Border radius size classes
			baseClasses.push(`btn-radius-${borderRadiusSize}`);

			// Border radius classes
			if (borderRadius.length > 0) baseClasses.push(...getBorderRadiusClasses(borderRadius, borderRadiusFilter));
		}

		// Circular class
		if (circular) baseClasses.push("btn-circular");

		// Full width class
		if (fullWidth) baseClasses.push("btn-full-width");

		// Icon spacing
		if (icon && children) baseClasses.push("icon-with-text");

		// Shadow class
		if (buttonProps.variant === "light" ? !shadow : noShadow) baseClasses.push("no-shadow");

		if (className) baseClasses.push(className);

		return baseClasses.join(" ");
	};

	return (
		<button className={getButtonClasses()} disabled={isLoading || disabled} {...buttonProps}>
			{(display === "icon" || display === "both") && icon && <span className="btn-icon">{icon}</span>}
			{(display === "children" || display === "both") && children && <span className="btn-text">{children}</span>}
			<LoadingOverlay isVisible={isLoading} />
		</button>
	);
};
