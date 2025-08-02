import type { TypedOmit } from "@/components/typedOmit";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import { useState } from "react";

export type BaseSliderProps = {
	// Value/State props
	value?: number;
	setValue?: (value: number) => void;
	initialValue?: number;

	// Range props
	min?: number;
	max?: number;
	step?: number;

	// Styling props
	thick?: boolean;
};

export type SliderProps = TypedOmit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "min" | "max" | "step"> &
	BaseSliderProps;

export const Slider = ({
	// Value/State props
	value,
	setValue,
	initialValue,

	// Range props
	min = 0,
	max = 100,
	step = 1,

	// Styling props
	thick,

	// HTML attributes
	onChange,
	className = "",
	...inputProps
}: SliderProps) => {
	const [privateValue, setPrivateValue] = useState(value ?? initialValue ?? 0);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e);
		const newValue = parseFloat(e.target.value);
		setValue?.(newValue);
		setPrivateValue(newValue);
	};

	return (
		<div className={`slider-container ${thick ? "slider-thick" : ""} ${className}`}>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value ?? privateValue}
				onChange={handleChange}
				className={`slider-input ${thick ? "slider-input-thick" : ""}`}
				{...inputProps}
			/>
			<div className={`slider-track ${thick ? "slider-track-thick" : ""}`}>
				<div
					className={`slider-fill ${thick ? "slider-fill-thick" : ""}`}
					style={{ width: `${(((value ?? privateValue) - min) / (max - min)) * 100}%` }}
				/>
			</div>
		</div>
	);
};
