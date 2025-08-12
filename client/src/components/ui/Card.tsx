import type { ReactNode } from "react";

export type CardProps = {
	children?: ReactNode;
	className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => <div className={`card ${className}`}>{children}</div>;
