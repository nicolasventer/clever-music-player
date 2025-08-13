import type { ChangeEvent } from "react";

export type SliderProps = {
	value: number;
	onChange?: (newValue: number) => void;
	min?: number;
	max?: number;
	step?: number;
	className?: string;
	disabled?: boolean;
	thick?: boolean;
};

export const Slider = ({
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	className = "",
	disabled = false,
	thick = false,
}: SliderProps) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = parseFloat(event.target.value);
		onChange?.(newValue);
	};

	return (
		<div className={`slider-container ${thick ? "slider-thick" : ""} ${className}`}>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				className={`slider-input ${thick ? "slider-input-thick" : ""}`}
			/>
			<div className={`slider-track ${thick ? "slider-track-thick" : ""}`}>
				<div
					className={`slider-fill ${thick ? "slider-fill-thick" : ""}`}
					style={{ width: `${((value - min) / (max - min)) * 100}%` }}
				/>
			</div>
		</div>
	);
};
