import type { TypedOmit } from "@/components/_ui/typedOmit";
import type { Dispatch, HTMLAttributes, ReactNode, Ref, SetStateAction } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type BaseNodeCompareProps = {
	// Core props
	beforeNode: ReactNode;
	afterNode: ReactNode;

	// Value/State props
	sliderPosition?: number; // 0-100
	setSliderPosition?: Dispatch<SetStateAction<number>>;

	// Content props
	beforeLabel?: string;
	afterLabel?: string;

	// Styling props
	labelVariant?: "filled" | "light";
	beforeLabelColor?: "theme" | "danger" | "warning" | "success";
	afterLabelColor?: "theme" | "danger" | "warning" | "success";

	// Layout props
	width?: number | string;
	height?: number | string;

	// HTML attributes
	className?: string;
	ref?: Ref<HTMLDivElement>;
};

export type NodeCompareProps = BaseNodeCompareProps & TypedOmit<HTMLAttributes<HTMLDivElement>, "children">;

export const NodeCompare = ({
	// Core props
	beforeNode,
	afterNode,

	// Value/State props
	sliderPosition,
	setSliderPosition,

	// Content props
	beforeLabel,
	afterLabel,

	// Styling props
	labelVariant = "filled",
	beforeLabelColor = "danger",
	afterLabelColor = "success",

	// Layout props
	width = "100%",
	height = 400,

	// HTML attributes
	className = "",
	ref,
	...divProps
}: NodeCompareProps) => {
	const [sliderPosition_, setSliderPosition_] = useState(sliderPosition ?? 50);
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const setContainerRef = useCallback(
		(element: HTMLDivElement) => {
			containerRef.current = element;
			if (typeof ref === "function") ref(element);
			else if (ref) ref.current = element;
		},
		[containerRef, ref]
	);

	const setSliderPositionAll: typeof setSliderPosition_ = (value) => {
		setSliderPosition_(value);
		setSliderPosition?.(value);
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);
		updateSliderPosition(e);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging) {
			updateSliderPosition(e);
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		setIsDragging(true);
		updateSliderPositionTouch(e);
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (isDragging) {
			updateSliderPositionTouch(e);
		}
	};

	const updateSliderPosition = (e: MouseEvent | React.MouseEvent) => {
		if (!containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percentage = (x / rect.width) * 100;

		setSliderPositionAll(Math.max(0, Math.min(100, percentage)));
	};

	const updateSliderPositionTouch = (e: TouchEvent | React.TouchEvent) => {
		if (!containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const touch = e.touches[0];
		const x = touch.clientX - rect.left;
		const percentage = (x / rect.width) * 100;

		setSliderPositionAll(Math.max(0, Math.min(100, percentage)));
	};

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			document.addEventListener("touchmove", handleTouchMove);
			document.addEventListener("touchend", handleMouseUp);

			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
				document.removeEventListener("touchmove", handleTouchMove);
				document.removeEventListener("touchend", handleMouseUp);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDragging]);

	return (
		<div {...divProps} className={`node-compare ${className}`} style={{ ...divProps.style, width, height }} ref={setContainerRef}>
			{/* Before Node (Background) */}
			<div className="nc-node-container" style={{ clipPath: `inset(0 ${100 - sliderPosition_}% 0 0)` }}>
				{beforeNode}
				{/* Labels for background */}
				<div className="node-compare-labels">
					{beforeLabel && <div className={`nc-label nc-label-${beforeLabelColor}-${labelVariant}`}>{beforeLabel}</div>}
					<div />
				</div>
			</div>

			{/* After Node (Foreground with clip-path) */}
			<div className="node-compare-after-container" style={{ clipPath: `inset(0 0 0 ${sliderPosition_}%)` }}>
				<div className="nc-node-container">{afterNode}</div>
				{/* Labels for foreground */}
				<div className="node-compare-labels">
					<div />
					{afterLabel && <div className={`nc-label nc-label-${afterLabelColor}-${labelVariant}`}>{afterLabel}</div>}
				</div>
			</div>

			{/* Slider Handle */}
			<div
				className="node-compare-slider"
				style={{ left: `${sliderPosition_}%` }}
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
			>
				<div className="slider-handle">
					<div className="slider-line"></div>
					<div className="slider-arrow left">◀</div>
					<div className="slider-arrow right">▶</div>
				</div>
			</div>

			{/* Display Line */}
			<div className="node-compare-display-line" style={{ left: `${sliderPosition_}%` }}></div>
		</div>
	);
};

// Keep the old export for backward compatibility
export const ImageCompare: React.FC<NodeCompareProps> = NodeCompare;
