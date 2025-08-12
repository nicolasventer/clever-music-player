import type { TypedOmit } from "@/components/typedOmit";
import { Search, X } from "lucide-react";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import { useRef, useState } from "react";

export type BaseSearchInputProps = {
	// Value/State props
	value?: string;
	setValue?: (value: string) => void;

	// Styling props
	color?: "theme" | "white" | "danger" | "warning" | "success";

	// Behavior props
	clearable?: boolean;
};

export type SearchInputProps = TypedOmit<InputHTMLAttributes<HTMLInputElement>, "value"> & BaseSearchInputProps;

export const SearchInput = ({
	// Value/State props
	value,
	setValue,

	// Styling props
	color = "theme",

	// Behavior props
	clearable = true,
	disabled,

	// HTML attributes
	className = "",
	onChange,
	...inputProps
}: SearchInputProps) => {
	const ref = useRef<HTMLInputElement>(null);
	const [privateValue, setPrivateValue] = useState(value);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange?.(event);
		setValue?.(event.target.value);
		setPrivateValue(event.target.value);
	};

	const handleClear = () => {
		setValue?.("");
		setPrivateValue("");
		if (ref.current) {
			ref.current.value = "";
			ref.current.focus();
		}
	};

	const colorClass = `search-input-${color}`;

	return (
		<div className={`search-input-container ${colorClass} ${className}`}>
			<input
				ref={ref}
				type="text"
				value={value ?? privateValue}
				disabled={disabled}
				onChange={handleChange}
				className="search-input"
				{...inputProps}
			/>
			<Search size={16} className="search-icon" />
			{clearable && (value ?? privateValue) && (
				<button type="button" onClick={handleClear} className="input-clear-btn" aria-label="Clear search" disabled={disabled}>
					<X size={16} />
				</button>
			)}
		</div>
	);
};
