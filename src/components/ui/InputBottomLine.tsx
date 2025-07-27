import type { InputHTMLAttributes } from "react";

export type InputBottomLineProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "max"> & {
	className?: string;
	max?: number;
	value?: string;
	setValue?: (value: string) => void;
};

export const InputBottomLine = ({ className = "", max, type = "text", value, setValue, ...props }: InputBottomLineProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value.replace(/[^0-9]/g, "");
		if (max !== undefined && val) {
			if (parseInt(val, 10) > max) {
				val = String(max);
			}
		}
		setValue?.(val);
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
