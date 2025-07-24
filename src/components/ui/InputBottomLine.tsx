import type { InputHTMLAttributes } from "react";
import { useState } from "react";

export type InputBottomLineProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "max"> & {
	className?: string;
	max?: number;
};

export const InputBottomLine = ({ className = "", max, type = "text", ...props }: InputBottomLineProps) => {
	const [value, setValue] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value.replace(/[^0-9]/g, "");
		if (max !== undefined && val) {
			if (parseInt(val, 10) > max) {
				val = String(max);
			}
		}
		setValue(val);
	};

	return (
		<input
			{...props}
			type={type}
			value={value}
			onChange={handleChange}
			className={`input-bottom-line ${className}`.trim()}
			max={max}
		/>
	);
};
