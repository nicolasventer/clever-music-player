import { Loader2 } from "lucide-react";
import type { HTMLAttributes, Ref } from "react";

export type LoadingOverlayProps = {
	// Core props
	isVisible?: boolean;

	// Layout props
	className?: string;

	// HTML attributes
	ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

export const LoadingIcon = () => <Loader2 size={24} className="animate-spin" />;

export const PositionRelative = ({ className = "", ...divProps }: HTMLAttributes<HTMLDivElement>) => (
	<div className={`position-relative ${className}`.trim()} {...divProps} />
);

export const LoadingOverlay = ({
	// Core props
	isVisible,

	// Content props
	children,

	// Layout props
	className = "",

	// HTML attributes
	ref,
	...divProps
}: LoadingOverlayProps) => (
	<>
		{isVisible && (
			<div className={`loading-overlay ${className}`.trim()} ref={ref} {...divProps}>
				{children ?? <LoadingIcon />}
			</div>
		)}
	</>
);
