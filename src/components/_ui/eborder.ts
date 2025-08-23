export const BorderValues = [
	"top",
	"top-right",
	"right",
	"bottom-right",
	"bottom",
	"bottom-left",
	"left",
	"top-left",
	"all",
] as const;
export type BorderType = (typeof BorderValues)[number];

export type BorderFilter = "left" | "right" | "top" | "bottom" | "all";

export function getBorderRadiusClasses(flags: BorderType[], filter: BorderFilter) {
	const classes = new Set<string>();

	flags.forEach((flag) => {
		if ((flag === "top" || flag === "top-left" || flag === "left") && (filter === "top" || filter === "left" || filter === "all"))
			classes.add("border-tl");
		if (
			(flag === "top" || flag === "top-right" || flag === "right") &&
			(filter === "top" || filter === "right" || filter === "all")
		)
			classes.add("border-tr");
		if (
			(flag === "bottom" || flag === "bottom-left" || flag === "left") &&
			(filter === "bottom" || filter === "left" || filter === "all")
		)
			classes.add("border-bl");
		if (
			(flag === "bottom" || flag === "bottom-right" || flag === "right") &&
			(filter === "bottom" || filter === "right" || filter === "all")
		)
			classes.add("border-br");
		if (flag === "all") {
			if (filter === "all") classes.add("border-all");
			if (filter === "top") ["border-tl", "border-tr"].forEach((c) => classes.add(c));
			if (filter === "right") ["border-tr", "border-br"].forEach((c) => classes.add(c));
			if (filter === "bottom") ["border-bl", "border-br"].forEach((c) => classes.add(c));
			if (filter === "left") ["border-tl", "border-bl"].forEach((c) => classes.add(c));
		}
	});

	return Array.from(classes);
}
