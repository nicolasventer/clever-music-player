import type { TypedOmit } from "@/components/_ui/typedOmit";
import { X } from "lucide-react";
import type { InputHTMLAttributes, Ref } from "react";

export type BaseInputProps = {
	// Value/State props
	value?: string; // do not use numberValue.toString() to get the value, create an extra string state
	setValue?: (value: string) => void;
	setNumberValue?: (value: number) => void; // be sure to put "number" in the type prop
	min?: number;
	max?: number;

	// Styling props
	color?: "theme" | "white" | "danger" | "warning" | "success";
	labelColor?: "theme" | "white" | "danger" | "warning" | "success";

	// Behavior props
	clearable?: boolean;
	floating?: boolean;
	required?: boolean;

	// Content props
	label?: string;
	LabelRender?: (props: { labelDisplay: React.ReactNode }) => React.ReactNode;
	description?: string;
	errorDescription?: string;

	// HTML attributes
	ref?: Ref<HTMLInputElement>;
};

export type InputProps = TypedOmit<InputHTMLAttributes<HTMLInputElement>, "value" | "min" | "max" | "required"> & BaseInputProps;

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
	labelColor,

	// Behavior props
	clearable,
	floating,
	disabled,
	required,

	// Content props
	label,
	LabelRender = ({ labelDisplay }) => labelDisplay,
	description,
	errorDescription,

	// HTML attributes
	className = "",
	type,
	onChange,
	ref,
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
			type={type}
			onChange={handleChange}
			className={`input-bottom-line input-${color} ${className}`.trim()}
			disabled={disabled}
			ref={ref}
		/>
	);

	const computedLabelColor = labelColor ?? (color === "theme" ? "white" : color);

	const labelDisplay = (
		<label className={`${floating ? "input-label-floating" : "input-label"} input-label-${computedLabelColor}`}>
			{label}
			{required && <span className="input-required-asterisk">*</span>}
		</label>
	);

	const inputWithLabel = label ? (
		<div className={`${floating ? "input-with-label-floating" : "input-with-label"} input-${color}`}>
			<input
				{...inputProps}
				type={type}
				onChange={handleChange}
				className={`input-bottom-line ${className}`.trim()}
				disabled={disabled}
				ref={ref}
			/>
			<LabelRender labelDisplay={labelDisplay} />
		</div>
	) : (
		inputElement
	);

	const inputWithDescription =
		description || errorDescription ? (
			<div className="input-with-description">
				{inputWithLabel}
				{description && <div className={`input-description input-description-${color}`}>{description}</div>}
				{errorDescription && <div className="input-description input-description-danger">{errorDescription}</div>}
			</div>
		) : (
			inputWithLabel
		);

	return clearable && inputProps.value ? (
		<div className="input-container">
			{inputWithDescription}
			<button type="button" onClick={handleClear} className="input-clear-btn" aria-label="Clear input" disabled={disabled}>
				<X size={16} />
			</button>
		</div>
	) : (
		inputWithDescription
	);
};
