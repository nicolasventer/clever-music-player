import type { HTMLAttributes, ReactNode } from "react";

export type BaseTitleProps = {
	// Core props
	order: 1 | 2 | 3 | 4 | 5 | 6;

	// Content props
	children?: ReactNode;
	icon?: ReactNode;

	// Styling props
	color?: "white" | "theme" | "danger" | "warning" | "success";
	noMargin?: boolean;

	// HTML attributes
	iconProps?: HTMLAttributes<HTMLSpanElement>;
	textProps?: HTMLAttributes<HTMLSpanElement>;
};

export type TitleProps = HTMLAttributes<HTMLHeadingElement> & BaseTitleProps;

export const Title = ({
	// Core props
	order,

	// Content props
	children,
	icon,

	// Styling props
	color = "white",
	noMargin = false,

	// HTML attributes
	className,
	iconProps,
	textProps,
	...headingProps
}: TitleProps) => {
	const getTitleClasses = () => {
		const baseClasses = [`title-${order}`];

		baseClasses.push(`title-${color}`);

		if (icon) baseClasses.push("icon-with-text");

		if (noMargin) baseClasses.push("no-margin");

		if (className) baseClasses.push(className);

		return baseClasses.join(" ");
	};

	const renderTitle = () => {
		const content = (
			<>
				{icon && (
					<span className="title-icon" {...iconProps}>
						{icon}
					</span>
				)}
				{children && (
					<span className="title-text" {...textProps}>
						{children}
					</span>
				)}
			</>
		);

		if (order === 1)
			return (
				<h1 className={getTitleClasses()} {...headingProps}>
					{content}
				</h1>
			);
		if (order === 2)
			return (
				<h2 className={getTitleClasses()} {...headingProps}>
					{content}
				</h2>
			);
		if (order === 3)
			return (
				<h3 className={getTitleClasses()} {...headingProps}>
					{content}
				</h3>
			);
		if (order === 4)
			return (
				<h4 className={getTitleClasses()} {...headingProps}>
					{content}
				</h4>
			);
		if (order === 5)
			return (
				<h5 className={getTitleClasses()} {...headingProps}>
					{content}
				</h5>
			);
		if (order === 6)
			return (
				<h6 className={getTitleClasses()} {...headingProps}>
					{content}
				</h6>
			);
		return (
			<h1 className={getTitleClasses()} {...headingProps}>
				{content}
			</h1>
		);
	};

	return renderTitle();
};
