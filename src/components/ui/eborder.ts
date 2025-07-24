export enum EBorder {
	TOP,
	TOP_RIGHT,
	RIGHT,
	BOTTOM_RIGHT,
	BOTTOM,
	BOTTOM_LEFT,
	LEFT,
	TOP_LEFT,
}

export function getBorderRadiusStyle(flags: EBorder[], radius: string = "8px"): React.CSSProperties {
	const style: React.CSSProperties = {};

	flags.forEach((flag) => {
		if (flag === EBorder.TOP || flag === EBorder.TOP_LEFT || flag === EBorder.LEFT) style.borderTopLeftRadius = radius;
		if (flag === EBorder.TOP || flag === EBorder.TOP_RIGHT || flag === EBorder.RIGHT) style.borderTopRightRadius = radius;
		if (flag === EBorder.BOTTOM || flag === EBorder.BOTTOM_LEFT || flag === EBorder.LEFT) style.borderBottomLeftRadius = radius;
		if (flag === EBorder.BOTTOM || flag === EBorder.BOTTOM_RIGHT || flag === EBorder.RIGHT)
			style.borderBottomRightRadius = radius;
	});

	return style;
}
