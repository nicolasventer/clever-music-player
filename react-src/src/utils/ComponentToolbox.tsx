/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import type { ComponentPropsWithoutRef, CSSProperties, ForwardedRef, JSX, ReactNode } from "react";
import { createElement, forwardRef, useEffect } from "react";

/**
 * Sets the viewport to be full height and width
 * @param props
 * @param {string} [props.selector="#root"] the selector to set to full viewport (default: "#root")
 * @param props.children the children to render
 */
export const FullViewport = ({ selector = "#root", children }: { selector?: string; children?: ReactNode }) => {
	useEffect(() => {
		WriteSelectors("full-viewport-css", {
			[`html, body, ${selector}`]: {
				height: "100%",
				margin: "0",
				padding: "0",
			},
		});
	}, [selector]);
	return <>{children}</>;
};

const _styleTmpEl = document.createElement("div");

/** The type of a css value */
export type CustomCSSStyleValue =
	| string
	| {
			/** The value of the css property */
			value: string;
			/** Whether the css property is marked as important */
			important: boolean;
	  };

/**
 * Make a css value important
 * @param value the value to make important
 * @returns the value
 */
// eslint-disable-next-line react-refresh/only-export-components
export const important = (value: string): CustomCSSStyleValue => ({ value, important: true });

/** The type of a css style declaration */
export type CustomCSSStyleDeclaration = {
	[K in keyof CSSStyleDeclaration]: CustomCSSStyleValue;
};

const camelToKebabCase = (str: string) => str.replace(/([A-Z])/g, "-$1").toLowerCase();

/**
 * Converts a css object to a css string
 * @param css the css object
 * @returns the css string
 */
export const Style = (css: Partial<CustomCSSStyleDeclaration>) => {
	try {
		_styleTmpEl.style.cssText = "";
		Object.entries(css).forEach(([key, value]) => {
			if (value && typeof value === "object")
				_styleTmpEl.style.setProperty(camelToKebabCase(key), value.value, value.important ? "important" : "");
			else _styleTmpEl.style.setProperty(camelToKebabCase(key), value ?? "");
		});
		return _styleTmpEl.style.cssText;
	} catch {
		console.warn(`css error with: ${JSON.stringify(css)}`);
		return css.cssText ?? "";
	}
};

/**
 * Writes the selectors to the style element
 * @param styleId the id of the style element
 * @param selectors the selectors to write
 * @param scopeEnd the end of the scope
 */
export const WriteSelectors = (
	styleId: string,
	selectors: Record<string, Partial<CustomCSSStyleDeclaration>>,
	scopeEnd?: string
) => {
	let classStyleEl = document.getElementById(styleId);
	if (!classStyleEl) {
		classStyleEl = document.createElement("style");
		classStyleEl.id = styleId;
		document.head.appendChild(classStyleEl);
	}
	let innerHTML = Object.entries(selectors).reduce((allStyles, [selector, style]) => {
		allStyles += `${selector} { ${Style(style)} }\n`;
		return allStyles;
	}, "");
	if (scopeEnd) innerHTML = `@scope (:root) to (${scopeEnd}) { ${innerHTML} }`;
	classStyleEl.innerHTML = innerHTML;
};

/**
 * Writes the classes to the style element
 * @param styleId the id of the style element
 * @param classes the classes to write
 * @param scopeEnd the end of the scope
 * @returns an object with the classes
 */
export const WriteClasses = <T extends string>(
	styleId: string,
	classes: Record<T, Partial<CustomCSSStyleDeclaration>>,
	scopeEnd?: string
) => {
	const selectors = Object.fromEntries(
		Object.entries(classes).map(([className, style]) => [`.${className}`, style as Partial<CustomCSSStyleDeclaration>])
	);
	WriteSelectors(styleId, selectors, scopeEnd);
	const classesObj = Object.fromEntries(Object.keys(classes).map((key) => [key, key])) as { [K in T]: K };
	return classesObj;
};

/** Writes the toolbox classes, needs to use the component toolbox */
export const WriteToolboxClasses = () => {
	useEffect(() => {
		WriteClasses("toolbox-css", {
			horizontal: { display: "flex", flexDirection: "row", alignItems: "center" },
			vertical: { display: "flex", flexDirection: "column" },
		});
	}, []);
	return <></>;
};

/** Justify content values */
export const JustifyContentValues = [
	"normal",
	"center",
	"flex-start",
	"flex-end",
	"space-between",
	"space-around",
	"space-evenly",
] as const;
/** Justify content type */
export type JustifyContentType = (typeof JustifyContentValues)[number];

/** Align items values */
export const AlignItemsValues = ["normal", "center", "flex-start", "flex-end", "stretch", "baseline"] as const;
/** Align items type */
export type AlignItemsType = (typeof AlignItemsValues)[number];

/** Layout values */
export const LayoutValues = ["horizontal", "vertical"] as const;
/** Layout type */
export type LayoutType = (typeof LayoutValues)[number];

/**
 * Get the padding properties
 * @param param
 * @param param.padding the padding value
 * @param param.paddingTop the padding top value
 * @param param.paddingBottom the padding bottom value
 * @param param.paddingLeft the padding left value
 * @param param.paddingRight the padding right value
 * @returns the padding properties
 */
const getPadding = ({
	padding,
	paddingTop,
	paddingBottom,
	paddingLeft,
	paddingRight,
}: {
	paddingTop?: CssProperty;
	paddingBottom?: CssProperty;
	paddingLeft?: CssProperty;
	paddingRight?: CssProperty;
	padding?: CssProperty;
}) => (padding ? { padding } : { paddingTop, paddingBottom, paddingLeft, paddingRight });

/**
 * Get the margin properties
 * @param param
 * @param param.margin the margin value
 * @param param.marginTop the margin top value
 * @param param.marginBottom the margin bottom value
 * @param param.marginLeft the margin left value
 * @param param.marginRight the margin right value
 * @returns the margin properties
 */
const getMargin = ({
	margin,
	marginTop,
	marginBottom,
	marginLeft,
	marginRight,
}: {
	marginTop?: CssProperty;
	marginBottom?: CssProperty;
	marginLeft?: CssProperty;
	marginRight?: CssProperty;
	margin?: CssProperty;
}) => (margin ? { margin } : { marginTop, marginBottom, marginLeft, marginRight });

/** The base properties of the box component */
type BoxBaseProps = {
	/** the width of the layout */
	width?: CssProperty;
	/** whether to set the width to max content */
	widthMaxContent?: boolean;
	/** whether to set the width to full */
	widthFull?: boolean;
	/** the height of the layout */
	height?: CssProperty;
	/** whether to set the height to max content */
	heightMaxContent?: boolean;
	/** whether to set the height to full */
	heightFull?: boolean;
	/** the padding top */
	paddingTop?: CssProperty;
	/** the padding bottom */
	paddingBottom?: CssProperty;
	/** the padding left */
	paddingLeft?: CssProperty;
	/** the padding right */
	paddingRight?: CssProperty;
	/** the padding */
	padding?: CssProperty;
	/** the margin top */
	marginTop?: CssProperty;
	/** the margin bottom */
	marginBottom?: CssProperty;
	/** the margin left */
	marginLeft?: CssProperty;
	/** the margin right */
	marginRight?: CssProperty;
	/** the margin */
	margin?: CssProperty;
	/** the flex grow */
	flexGrow?: boolean | CssProperty;
	/** whether to set the overflow to auto */
	overflowAuto?: boolean;
	/** whether to set the position to absolute */
	positionAbsolute?: boolean;
	/** whether to set the position to relative */
	positionRelative?: boolean;
	/** whether to set top and left to 0 */
	topLeft?: boolean;
	/** whether to set the border to solid */
	borderSolid?: boolean | string;
};

/**
 * Compute the box base style
 * @param param the box base properties
 * @returns the computed style
 */
const computeBoxBaseStyle = ({
	width,
	widthMaxContent,
	widthFull,
	height,
	heightMaxContent,
	heightFull,
	padding,
	paddingTop,
	paddingBottom,
	paddingLeft,
	paddingRight,
	margin,
	marginTop,
	marginBottom,
	marginLeft,
	marginRight,
	flexGrow,
	overflowAuto,
	positionAbsolute,
	positionRelative,
	topLeft,
	borderSolid,
}: BoxBaseProps): CSSProperties => ({
	width: widthMaxContent ? "max-content" : widthFull ? "100%" : width,
	height: heightMaxContent ? "max-content" : heightFull ? "100%" : height,
	...getPadding({ padding, paddingTop, paddingBottom, paddingLeft, paddingRight }),
	...getMargin({ margin, marginTop, marginBottom, marginLeft, marginRight }),
	flexGrow: typeof flexGrow === "boolean" ? (flexGrow ? 1 : undefined) : flexGrow,
	overflow: overflowAuto ? "auto" : undefined,
	position: positionAbsolute ? "absolute" : positionRelative ? "relative" : undefined,
	top: topLeft ? 0 : undefined,
	left: topLeft ? 0 : undefined,
	border: borderSolid ? (typeof borderSolid === "string" ? `solid ${borderSolid}` : "solid") : undefined,
});

/** The base properties of the layout component */
type LayoutBaseProps = {
	// layout: LayoutType; // for unknown reason, Omit<LayoutProps, "layout"> does not work
	/** the alignment of the items */
	alignItems?: AlignItemsType;
	/** the justification of the content */
	justifyContent?: JustifyContentType;
	/** the gap between the items */
	gap?: CssProperty;
} & BoxBaseProps;

/** The properties of the layout component */
type LayoutProps = LayoutBaseProps & ComponentPropsWithoutRef<"div">;

/**
 * A flex box that can be horizontal or vertical
 * @param props Layout props
 * @returns a div with the flex box properties
 */
export const Layout = forwardRef(function Layout(
	{
		width,
		widthMaxContent,
		widthFull,
		height,
		heightMaxContent,
		heightFull,
		padding,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
		margin,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		flexGrow,
		overflowAuto,
		positionAbsolute,
		positionRelative,
		topLeft,
		borderSolid,

		alignItems,
		justifyContent,
		gap,

		layout,
		className,
		...divProps
	}: LayoutProps & {
		/** The layout of the layout component */
		layout: LayoutType;
	},
	ref: ForwardedRef<HTMLDivElement>
) {
	return (
		<div
			{...divProps}
			ref={ref}
			className={clsx(layout, className)}
			style={{
				alignItems,
				justifyContent,
				gap,
				...computeBoxBaseStyle({
					width,
					widthMaxContent,
					widthFull,
					height,
					heightMaxContent,
					heightFull,
					padding,
					paddingTop,
					paddingBottom,
					paddingLeft,
					paddingRight,
					margin,
					marginTop,
					marginBottom,
					marginLeft,
					marginRight,
					flexGrow,
					overflowAuto,
					positionAbsolute,
					positionRelative,
					topLeft,
					borderSolid,
				}),
				...(typeof divProps.style === "object" ? divProps.style : {}),
			}}
		/>
	);
});

/**
 * A horizontal flex box
 * @see {@link Layout}
 * @param props div props
 * @returns a div with the horizontal flex box properties
 */
export const Horizontal = forwardRef(function Horizontal(props: LayoutProps, ref: ForwardedRef<HTMLDivElement>) {
	return <Layout ref={ref} {...props} layout="horizontal" />;
});

/**
 * A vertical flex box
 * @see {@link Layout}
 * @param props Vertical props
 * @returns a div with the vertical flex box properties
 */
export const Vertical = forwardRef(function Vertical(props: LayoutProps, ref: ForwardedRef<HTMLDivElement>) {
	return <Layout ref={ref} {...props} layout="vertical" />;
});

/** The type of the parameters of a function */
type Params<T> = T extends (...args: [infer U]) => any ? U : Record<string, never>;

/** The type of a css property */
type CssProperty = number | string | undefined;

/**
 * Create a component with a flex grow property set
 * @template T the component type
 * @param props
 * @param props.Comp the component to wrap
 * @param {CssProperty} [props.flexGrow=1] the flex grow value (default: 1)
 * @returns a component with a flex grow property set
 */
export const FlexGrow = <T extends (...args: any) => any>({
	Comp,
	flexGrow = 1,
	...divProps
}: { Comp: T; flexGrow?: CssProperty } & Params<T>) => (
	<Comp {...divProps} style={{ flexGrow, ...(typeof divProps.style === "object" ? divProps.style : {}) }} />
);

/**
 * Create a component with a tag
 * @param tag the tag to use
 * @returns a component with the tag
 */
export const GetIntrinsicComp = <T extends keyof JSX.IntrinsicElements>(tag: T) =>
	function GetIntrinsicComp(props: JSX.IntrinsicElements[T]) {
		return createElement(tag as any, props);
	};

/** The properties of the layout component */
type BoxProps = LayoutBaseProps & ComponentPropsWithoutRef<"div">;

/**
 * A box component that have properties like width, height
 * @param props Box props
 * @returns a div with the specified properties
 */
export const Box = forwardRef(function Box(
	{
		width,
		widthMaxContent,
		widthFull,
		height,
		heightMaxContent,
		heightFull,
		padding,
		paddingTop,
		paddingLeft,
		margin,
		marginTop,
		marginLeft,
		flexGrow,
		overflowAuto,
		positionAbsolute,
		positionRelative,
		topLeft,
		borderSolid,
		...divProps
	}: BoxProps,
	ref: ForwardedRef<HTMLDivElement>
) {
	return (
		<div
			ref={ref}
			{...divProps}
			style={{
				...computeBoxBaseStyle({
					width,
					widthMaxContent,
					widthFull,
					height,
					heightMaxContent,
					heightFull,
					padding,
					paddingTop,
					paddingLeft,
					margin,
					marginTop,
					marginLeft,
					flexGrow,
					overflowAuto,
					positionAbsolute,
					positionRelative,
					topLeft,
					borderSolid,
				}),
				...(typeof divProps.style === "object" ? { ...divProps.style } : {}),
			}}
		/>
	);
});
