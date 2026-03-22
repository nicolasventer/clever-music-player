import type { TypedOmit } from "@/components/_ui/typedOmit";
import type { ReactNode, Ref } from "react";
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

	// HTML attributes
	ref?: Ref<HTMLDivElement>;
};

export type ButtonBreadcrumbsProps = BaseButtonBreadcrumbsProps & TypedOmit<ButtonProps, "icon" | "children" | "onClick" | "ref">;

export const ButtonBreadcrumbs = ({
	items,
	separator = "/",
	onClick,
	editable = false,
	ref,
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
				<div className="button-breadcrumbs-editor" ref={ref}>
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
						<Button variant="light" size="sm" onClick={handleSaveEdit} color="success">
							Save
						</Button>
						<Button variant="light" size="sm" onClick={handleCancelEdit} color="danger">
							Cancel
						</Button>
					</div>
				</div>
			) : (
				<div className="button-breadcrumbs" ref={ref}>
					<div className="breadcrumbs-navigation">
						{items.map((item, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<div key={index} className="breadcrumb-item">
								{/* @ts-expect-error cannot get the variant from the buttonProps */}
								<Button {...buttonProps} size="sm" onClick={() => handleItemClick(index)} icon={item.icon}>
									{item.children || item.text}
								</Button>
								{index < items.length - 1 && <Text className="breadcrumb-separator">{separator}</Text>}
							</div>
						))}
					</div>
					{editable && (
						<Button variant="light" size="sm" onClick={handleEditClick}>
							Edit
						</Button>
					)}
				</div>
			)}
		</>
	);
};
