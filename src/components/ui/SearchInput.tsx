import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

export type SearchInputProps = {
	value: string;
	onChange?: (newValue: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
};

export const SearchInput = ({
	value,
	onChange,
	placeholder = "Search...",
	className = "",
	disabled = false,
}: SearchInputProps) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange?.(event.target.value);
	};

	return (
		<div className={`search-input-container ${className}`}>
			<Search size={16} className="search-icon" />
			<input
				type="search"
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disabled}
				className="search-input"
			/>
		</div>
	);
};
