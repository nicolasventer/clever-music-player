import React from "react";

interface SliderProps {
	value: number;
	onChange?: (newValue: number) => void;
	min?: number;
	max?: number;
	step?: number;
	className?: string;
	disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	className = "",
	disabled = false,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseFloat(event.target.value);
		onChange?.(newValue);
	};

	return (
		<div className={`slider-container ${className}`}>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				className="slider-input"
			/>
			<div className="slider-track">
				<div className="slider-fill" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
			</div>
		</div>
	);
};
