import type { TypedOmit } from "@/components/typedOmit";
import type { ReactNode } from "react";
import { useState } from "react";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";
import { Input } from "./Input";
import { Text } from "./Text";

export type BaseButtonBreadcrumbsProps = {
	// Content props
	items: {
		text: string;
		icon?: ReactNode;
		children?: ReactNode;
	}[];

	// Behavior props
	separator?: string;
	onClick?: (textArray: string[]) => void;
	editable?: boolean;
};

export type ButtonBreadcrumbsProps = BaseButtonBreadcrumbsProps & TypedOmit<ButtonProps, "icon" | "children" | "onClick">;

export const ButtonBreadcrumbs = ({
	items,
	separator = "/",
	onClick,
	editable = false,
	...buttonProps
}: ButtonBreadcrumbsProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editingText, setEditingText] = useState("");

	const handleItemClick = (index: number) => {
		const textArray = items.slice(0, index + 1).map((item) => item.text);
		onClick?.(textArray);
	};

	const handleEditClick = () => {
		setIsEditing(true);
		setEditingText(items.map((item) => item.text).join(separator));
	};

	const handleSaveEdit = () => {
		setIsEditing(false);
		const textArray = editingText.split(separator).filter(Boolean);
		onClick?.(textArray);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditingText("");
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSaveEdit();
		} else if (e.key === "Escape") {
			handleCancelEdit();
		}
	};

	return (
		<>
			{isEditing ? (
				<div className="button-breadcrumbs-editor">
					<div className="breadcrumbs-input-container">
						<Input
							value={editingText}
							setValue={setEditingText}
							onKeyDown={handleKeyPress}
							placeholder="Enter path..."
							autoFocus
						/>
					</div>
					<div className="breadcrumbs-actions">
						<Button variant="light" size="small" onClick={handleSaveEdit} color="success">
							Save
						</Button>
						<Button variant="light" size="small" onClick={handleCancelEdit} color="danger">
							Cancel
						</Button>
					</div>
				</div>
			) : (
				<div className="button-breadcrumbs">
					<div className="breadcrumbs-navigation">
						{items.map((item, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<div key={index} className="breadcrumb-item">
								{/* @ts-expect-error cannot get the variant from the buttonProps */}
								<Button {...buttonProps} size="small" onClick={() => handleItemClick(index)} icon={item.icon}>
									{item.children || item.text}
								</Button>
								{index < items.length - 1 && <Text className="breadcrumb-separator">{separator}</Text>}
							</div>
						))}
					</div>
					{editable && (
						<Button variant="light" size="small" onClick={handleEditClick}>
							Edit
						</Button>
					)}
				</div>
			)}
		</>
	);
};
