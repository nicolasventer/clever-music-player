import type { TypedOmit } from "@/components/_ui/typedOmit";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

export type BaseCarouselProps<T> = {
	// Core props
	items: ({ key: string } & T)[];
	itemToDisplayCount: number;

	// Content props
	Component: (props: Omit<T, "key">) => ReactNode;

	// Value/State props
	onItemChange?: (index: number) => void;

	// Layout props
	gap?: number;
	orientation?: "horizontal" | "vertical";

	// Behavior props
	showArrows?: boolean; // default true
	showDots?: boolean; // default true

	// HTML attributes
	ref?: Ref<HTMLDivElement>;
};

export type CarouselProps<T> = BaseCarouselProps<T> & TypedOmit<HTMLAttributes<HTMLDivElement>, "children">;

export const Carousel = <T,>({
	// Core props
	items,
	itemToDisplayCount,

	// Content props
	Component,

	// Value/State props
	onItemChange,

	// Layout props
	gap = 0,
	orientation = "horizontal",

	// Behavior props
	showArrows = true,
	showDots = true,

	// HTML attributes
	style,
	ref,
	...divProps
}: CarouselProps<T>) => {
	if (itemToDisplayCount < 1) throw new Error("itemToDisplayCount must be greater than 0");

	const [carouselRef, setCarouselRef_] = useState<HTMLDivElement | null>(null);
	const setCarouselRef = useCallback(
		(element: HTMLDivElement) => {
			setCarouselRef_(element);
			if (typeof ref === "function") ref(element);
			else if (ref) ref.current = element;
		},
		[ref]
	);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [startPos, setStartPos] = useState(0);
	const [startTranslateValue, setStartTranslateValue] = useState(0);
	const [animationId, setAnimationId] = useState<number | null>(null);

	const carouselSize = useMemo(
		() => carouselRef?.getBoundingClientRect()[orientation === "horizontal" ? "width" : "height"] ?? 0,
		[carouselRef, orientation]
	);

	const itemSize = useMemo(
		() => (carouselSize - (itemToDisplayCount - 1) * gap) / itemToDisplayCount,
		[carouselSize, itemToDisplayCount, gap]
	);

	const containerSize = useMemo(() => (itemSize + gap) * items.length - gap, [itemSize, gap, items.length]);

	const containerStyle = useMemo(
		() => (orientation === "horizontal" ? { width: containerSize, height: "100%" } : { width: "100%", height: containerSize }),
		[containerSize, orientation]
	);

	const itemStyle = useMemo(
		() => (orientation === "horizontal" ? { width: itemSize, height: "100%" } : { width: "100%", height: itemSize }),
		[itemSize, orientation]
	);

	const maxIndex = Math.max(0, items.length - itemToDisplayCount);

	const getTranslateValue = useCallback((index: number) => -(index * (itemSize + gap)), [itemSize, gap]);

	const [translateValue, setTranslateValue] = useState(0);

	const animateToIndex = useCallback(
		(targetIndex: number, duration: number = 300) => {
			if (animationId) cancelAnimationFrame(animationId);

			const startTranslate = translateValue;
			const targetTranslate = getTranslateValue(targetIndex);
			const startTime = performance.now();

			const animate = (currentTime: number) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const easeOut = 1 - Math.pow(1 - progress, 3);
				const currentTranslate = startTranslate + (targetTranslate - startTranslate) * easeOut;
				setTranslateValue(currentTranslate);

				if (progress < 1) {
					const newAnimationId = requestAnimationFrame(animate);
					setAnimationId(newAnimationId);
				} else {
					setCurrentIndex(targetIndex);
					setAnimationId(null);
					onItemChange?.(targetIndex);
				}
			};

			const newAnimationId = requestAnimationFrame(animate);
			setAnimationId(newAnimationId);
		},
		[animationId, translateValue, getTranslateValue, onItemChange]
	);

	const handleStart = useCallback(
		(clientPos: number) => {
			setIsDragging(true);
			setStartPos(clientPos);
			setStartTranslateValue(translateValue);

			if (animationId) {
				cancelAnimationFrame(animationId);
				setAnimationId(null);
			}
		},
		[animationId, translateValue]
	);

	const handleMove = useCallback(
		(clientPos: number) => {
			if (!isDragging) return;
			const delta = clientPos - startPos;
			const newTranslate = startTranslateValue + delta;
			const maxTranslate = 0;
			const minTranslate = getTranslateValue(maxIndex);
			const clampedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
			setTranslateValue(clampedTranslate);
		},
		[isDragging, startPos, startTranslateValue, getTranslateValue, maxIndex]
	);

	const handleEnd = useCallback(() => {
		if (!isDragging) return;
		setIsDragging(false);
		const itemStep = itemSize + gap;
		let targetIndex = Math.round(-translateValue / itemStep);
		const startIndex = Math.round(-startTranslateValue / itemStep);
		if (startIndex === targetIndex) targetIndex += translateValue - startTranslateValue > 0 ? -1 : 1;
		targetIndex = Math.max(0, Math.min(maxIndex, targetIndex));
		animateToIndex(targetIndex);
	}, [isDragging, itemSize, gap, translateValue, startTranslateValue, maxIndex, animateToIndex]);

	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			const touch = e.touches[0];
			const clientPos = orientation === "horizontal" ? touch.clientX : touch.clientY;
			handleStart(clientPos);
		},
		[orientation, handleStart]
	);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			e.preventDefault();
			const touch = e.touches[0];
			const clientPos = orientation === "horizontal" ? touch.clientX : touch.clientY;
			handleMove(clientPos);
		},
		[orientation, handleMove]
	);

	const handleTouchEnd = useCallback(() => {
		handleEnd();
	}, [handleEnd]);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			const clientPos = orientation === "horizontal" ? e.clientX : e.clientY;
			handleStart(clientPos);
		},
		[orientation, handleStart]
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging) return;
			const clientPos = orientation === "horizontal" ? e.clientX : e.clientY;
			handleMove(clientPos);
		},
		[isDragging, orientation, handleMove]
	);

	const handleMouseUp = useCallback(() => {
		handleEnd();
	}, [handleEnd]);

	const goToNext = useCallback(() => {
		if (currentIndex < maxIndex) animateToIndex(currentIndex + 1);
	}, [currentIndex, maxIndex, animateToIndex]);

	const goToPrevious = useCallback(() => {
		if (currentIndex > 0) {
			animateToIndex(currentIndex - 1);
		}
	}, [currentIndex, animateToIndex]);

	const goToIndex = useCallback(
		(index: number) => {
			const clampedIndex = Math.max(0, Math.min(maxIndex, index));
			animateToIndex(clampedIndex);
		},
		[maxIndex, animateToIndex]
	);

	// Update translate value when currentIndex changes
	useEffect(() => setTranslateValue(getTranslateValue(currentIndex)), [currentIndex, getTranslateValue]);

	// Cleanup animation on unmount
	useEffect(() => {
		return () => {
			if (animationId) cancelAnimationFrame(animationId);
		};
	}, [animationId]);

	useEffect(() => {
		if (isDragging) {
			const handleGlobalMouseMove = (e: MouseEvent) => {
				const clientPos = orientation === "horizontal" ? e.clientX : e.clientY;
				handleMove(clientPos);
			};

			const handleGlobalMouseUp = () => {
				handleEnd();
			};

			document.addEventListener("mousemove", handleGlobalMouseMove);
			document.addEventListener("mouseup", handleGlobalMouseUp);

			return () => {
				document.removeEventListener("mousemove", handleGlobalMouseMove);
				document.removeEventListener("mouseup", handleGlobalMouseUp);
			};
		}
	}, [isDragging, orientation, handleMove, handleEnd]);

	const Items = useMemo(
		() =>
			items.map(({ key, ...item }) => (
				<div key={key} style={itemStyle}>
					<Component {...item} />
				</div>
			)),
		[Component, items, itemStyle]
	);

	const transformStyle = useMemo(() => {
		const transform = orientation === "horizontal" ? `translateX(${translateValue}px)` : `translateY(${translateValue}px)`;
		return { transform };
	}, [orientation, translateValue]);

	return (
		<div ref={setCarouselRef} className="carousel" style={style} {...divProps}>
			<div
				className={`carousel-items-container ${isDragging ? "dragging" : ""}`}
				style={{
					...containerStyle,
					...transformStyle,
					gap,
					flexDirection: orientation === "horizontal" ? "row" : "column",
				}}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			>
				{Items}
			</div>

			{/* Navigation Dots */}
			{showDots && maxIndex > 0 && (
				<div className={`carousel-navigation-dots ${orientation}`}>
					{Array.from({ length: maxIndex + 1 }, (_, index) => (
						<button key={index} onClick={() => goToIndex(index)} className="carousel-dot-button">
							<div className={`carousel-dot ${index === currentIndex ? "active" : ""}`} />
						</button>
					))}
				</div>
			)}

			{/* Navigation Arrows */}
			{showArrows && maxIndex > 0 && (
				<>
					{currentIndex > 0 && (
						<button onClick={goToPrevious} className={`carousel-arrow ${orientation} prev`}>
							{orientation === "horizontal" ? "‹" : "‹"}
						</button>
					)}
					{currentIndex < maxIndex && (
						<button onClick={goToNext} className={`carousel-arrow ${orientation} next`}>
							{orientation === "horizontal" ? "›" : "›"}
						</button>
					)}
				</>
			)}
		</div>
	);
};
