import type { TypedOmit } from "@/components/typedOmit";
import { X } from "lucide-react";
import type { InputHTMLAttributes } from "react";

export type BaseInputProps = {
	// Value/State props
	value?: string; // do not use numberValue.toString() to get the value, create an extra string state
	setValue?: (value: string) => void;
	setNumberValue?: (value: number) => void; // be sure to put "number" in the type prop
	min?: number;
	max?: number;

	// Styling props
	color?: "theme" | "white" | "danger" | "warning" | "success";

	// Behavior props
	clearable?: boolean;
};

export type InputProps = TypedOmit<InputHTMLAttributes<HTMLInputElement>, "value" | "min" | "max"> & BaseInputProps;

const numStr = (value: string) => value.replace(/[^0-9\-eE.]/g, "");

const stringToNumber = (value: string, { min, max }: { min?: number; max?: number } = {}) => {
	const num = parseFloat(value);
	if (min !== undefined && num < min) return min;
	if (max !== undefined && num > max) return max;
	return num; // return NaN if the value is not a number
};

export const Input = ({
	// Value/State props
	setValue,
	setNumberValue,
	min,
	max,

	// Styling props
	color = "theme",

	// Behavior props
	clearable,
	disabled,

	// HTML attributes
	className = "",
	type,
	onChange,
	...inputProps
}: InputProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e);
		if (type === "number") {
			setValue?.(numStr(e.target.value));
			const num = stringToNumber(e.target.value, { min, max });
			if (num) setNumberValue?.(num);
		} else setValue?.(e.target.value);
	};

	const handleClear = () => setValue?.("");

	const inputElement = (
		<input
			{...inputProps}
			onChange={handleChange}
			className={`input-bottom-line input-${color} ${className}`.trim()}
			disabled={disabled}
		/>
	);

	return clearable && inputProps.value ? (
		<div className="input-container">
			{inputElement}
			<button type="button" onClick={handleClear} className="input-clear-btn" aria-label="Clear input" disabled={disabled}>
				<X size={16} />
			</button>
		</div>
	) : (
		inputElement
	);
};
