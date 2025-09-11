import type { TypedOmit } from "@/components/_ui/typedOmit";
import type { SelectHTMLAttributes } from "react";
import { useMemo } from "react";

export type SelectOption<T extends string> = T | { value: T; disabled?: boolean; label?: string };

export type RequiredNativeSelectProps<T extends string> = {
	// Value/State props
	value?: T;
	setValue?: (value: T) => void;

	// Behavior props
	required: true;

	// Content props
	placeholder?: string;
};

export type OptionalNoPlaceholderNativeSelectProps<T extends string> = {
	// Value/State props
	value?: T;
	setValue?: (value: T) => void;

	// Behavior props
	required?: false;

	// Content props
	placeholder?: never;
};

export type OptionalWithPlaceholderNativeSelectProps<T extends string> = {
	// Value/State props
	value?: T | "";
	setValue?: (value: T | "") => void;

	// Behavior props
	required?: false;

	// Content props
	placeholder: string;
};

export type BaseNativeSelectProps<T extends string> = (
	| RequiredNativeSelectProps<T>
	| OptionalNoPlaceholderNativeSelectProps<T>
	| OptionalWithPlaceholderNativeSelectProps<T>
) & {
	// Core props
	options: SelectOption<T>[];

	// Styling props
	color?: "theme" | "white" | "danger" | "warning" | "success";
	labelColor?: "theme" | "white" | "danger" | "warning" | "success";
	fullWidth?: boolean;

	// Content props
	label?: string;
	description?: string;
	errorDescription?: string;
	placeholder?: string;
};

export type NativeSelectProps<T extends string> = TypedOmit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "required"> &
	BaseNativeSelectProps<T>;

export const NativeSelect = <T extends string>({
	// Core props
	options,

	// Value/State props
	setValue,

	// Styling props
	color = "theme",
	labelColor,
	fullWidth,

	// Behavior props
	disabled,
	required,

	// Content props
	label,
	description,
	errorDescription,
	placeholder,

	// HTML attributes
	className = "",
	onChange,
	...selectProps
}: NativeSelectProps<T>) => {
	const getSelectClasses = () => {
		const baseClasses = ["native-select"];
		baseClasses.push(`select-${color}`);
		if (className) baseClasses.push(className);
		return baseClasses.join(" ");
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e);
		setValue?.(e.target.value as T);
	};

	const transformedOptions = useMemo(
		() => options.map((option) => (typeof option === "string" ? { value: option, disabled: false, label: option } : option)),
		[options]
	);

	const selectElement = (
		<select {...selectProps} onChange={handleChange} className={getSelectClasses()} disabled={disabled}>
			{placeholder && (
				<option value="" disabled>
					{placeholder}
				</option>
			)}
			{transformedOptions.map((option) => (
				<option key={option.value} value={option.value} disabled={option.disabled}>
					{option.label ?? option.value}
				</option>
			))}
		</select>
	);

	const computedLabelColor = labelColor ?? (color === "theme" ? "white" : color);

	const selectWithLabel = label ? (
		<div className={`select-with-label select-${color} ${fullWidth ? "select-full-width" : ""}`}>
			<select {...selectProps} onChange={handleChange} className={getSelectClasses()} disabled={disabled}>
				{placeholder && (
					<option value="" disabled={required}>
						{placeholder}
					</option>
				)}
				{transformedOptions.map((option) => (
					<option key={option.value} value={option.value} disabled={option.disabled}>
						{option.label ?? option.value}
					</option>
				))}
			</select>
			<label className={`select-label select-label-${computedLabelColor} ${fullWidth ? "select-full-width" : ""}`}>
				{label}
				{required && <span className="select-required-asterisk">*</span>}
			</label>
		</div>
	) : (
		selectElement
	);

	const selectWithDescription =
		description || errorDescription ? (
			<div className="select-with-description">
				{selectWithLabel}
				{description && <div className={`select-description select-description-${color}`}>{description}</div>}
				{errorDescription && <div className="select-description select-description-danger">{errorDescription}</div>}
			</div>
		) : (
			selectWithLabel
		);

	return selectWithDescription;
};
