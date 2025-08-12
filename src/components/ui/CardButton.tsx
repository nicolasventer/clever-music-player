import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import type { CardProps } from "./Card";
import { Card } from "./Card";

export type CardButtonProps = {
	// Core props
	isActive?: boolean;
	disabled?: boolean;

	// Behavior props
	isLoading?: boolean;
} & CardProps;

export const CardButton = ({
	// Core props
	isActive = false,
	disabled = false,

	// Behavior props
	isLoading = false,

	// HTML attributes
	className,

	// Content props
	children,

	// Card props
	...cardProps
}: CardButtonProps) => {
	const allClasses = ["card-button"];
	if (isActive) allClasses.push("card-button-active");
	if (disabled) allClasses.push("card-button-disabled");
	if (className) allClasses.push(className);

	return (
		<Card className={allClasses.join(" ")} {...cardProps}>
			<LoadingOverlay isVisible={isLoading} />
			{children}
		</Card>
	);
};
