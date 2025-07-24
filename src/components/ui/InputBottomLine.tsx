import React, { useState } from "react";

export interface InputBottomLineProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "max"> {
	className?: string;
	max?: number;
}

export const InputBottomLine: React.FC<InputBottomLineProps> = ({ className = "", max, type = "text", ...props }) => {
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
