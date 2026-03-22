import type { TypedOmit } from "@/components/_ui/typedOmit";
import { Search, X } from "lucide-react";
import type { ChangeEvent, InputHTMLAttributes, Ref } from "react";
import { useCallback, useRef, useState } from "react";

export type BaseSearchInputProps = {
	// Value/State props
	value?: string;
	setValue?: (value: string) => void;

	// Styling props
	color?: "theme" | "white" | "danger" | "warning" | "success";

	// Behavior props
	clearable?: boolean;

	// HTML attributes
	ref?: Ref<HTMLInputElement>;
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
	ref,
	...inputProps
}: SearchInputProps) => {
	const internalRef = useRef<HTMLInputElement>(null);
	const setInternalRef = useCallback(
		(element: HTMLInputElement) => {
			internalRef.current = element;
			if (typeof ref === "function") ref(element);
			else if (ref) ref.current = element;
		},
		[internalRef, ref]
	);
	const [privateValue, setPrivateValue] = useState(value);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange?.(event);
		setValue?.(event.target.value);
		setPrivateValue(event.target.value);
	};

	const handleClear = () => {
		setValue?.("");
		setPrivateValue("");
		if (internalRef.current) {
			internalRef.current.value = "";
			internalRef.current.focus();
		}
	};

	const colorClass = `search-input-${color}`;

	return (
		<div className={`search-input-container ${colorClass} ${className}`}>
			<input
				ref={setInternalRef}
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
