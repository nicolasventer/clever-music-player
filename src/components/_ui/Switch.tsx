import type { TypedOmit } from "@/components/_ui/typedOmit";
import type { ChangeEvent, InputHTMLAttributes, Ref } from "react";
import { useState } from "react";

export type BaseSwitchProps = {
	// Value/State props
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	defaultChecked?: boolean;

	// Styling props
	size?: "sm" | "md" | "lg";
	color?: "theme" | "success" | "warning" | "danger";
	disabled?: boolean;

	// Label props
	label?: string;
	labelPosition?: "left" | "right";

	// HTML attributes
	ref?: Ref<HTMLInputElement>;
};

export type SwitchProps = TypedOmit<InputHTMLAttributes<HTMLInputElement>, "type" | "checked" | "color" | "size"> &
	BaseSwitchProps;

export const Switch = ({
	// Value/State props
	checked,
	onCheckedChange,
	defaultChecked,

	// Styling props
	size = "md",
	color = "theme",
	disabled,

	// Label props
	label,
	labelPosition = "right",

	// HTML attributes
	onChange,
	className = "",
	ref,
	...inputProps
}: SwitchProps) => {
	const [privateChecked, setPrivateChecked] = useState(checked ?? defaultChecked ?? false);
	const isControlled = checked !== undefined;
	const currentChecked = isControlled ? checked : privateChecked;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e);
		const newChecked = e.target.checked;
		onCheckedChange?.(newChecked);
		if (!isControlled) {
			setPrivateChecked(newChecked);
		}
	};

	const getSwitchClasses = () => {
		const baseClasses = ["switch", `switch-${size}`, `switch-${color}`];

		if (currentChecked) baseClasses.push("switch-checked");
		if (disabled) baseClasses.push("switch-disabled");
		if (className) baseClasses.push(className);

		return baseClasses.join(" ");
	};

	const getTrackClasses = () => {
		const baseClasses = ["switch-track"];
		if (currentChecked) baseClasses.push("switch-track-checked");
		return baseClasses.join(" ");
	};

	const getThumbClasses = () => {
		const baseClasses = ["switch-thumb"];
		if (currentChecked) baseClasses.push("switch-thumb-checked");
		return baseClasses.join(" ");
	};

	return (
		<label className="switch-container">
			{label && labelPosition === "left" && <span className="switch-label switch-label-left">{label}</span>}

			<div className={getSwitchClasses()}>
				<input
					type="checkbox"
					checked={currentChecked}
					onChange={handleChange}
					disabled={disabled}
					className="switch-input"
					ref={ref}
					{...inputProps}
				/>
				<div className={getTrackClasses()}>
					<div className={getThumbClasses()} />
				</div>
			</div>

			{label && labelPosition === "right" && <span className="switch-label switch-label-right">{label}</span>}
		</label>
	);
};
