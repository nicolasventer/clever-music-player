import type { ButtonProps } from "./Button";
import { Button } from "./Button";

export type TagProps = ButtonProps;

export const Tag = ({ onClick, className, ...buttonProps }: TagProps) => {
	const tagClasses = ["tag"];
	if (!onClick) tagClasses.push("tag-static");
	if (className) tagClasses.push(className);

	return <Button {...buttonProps} className={tagClasses.join(" ")} onClick={onClick} />;
};
