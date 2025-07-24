import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
	value: string;
	onChange?: (newValue: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
	value,
	onChange,
	placeholder = "Search...",
	className = "",
	disabled = false,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
