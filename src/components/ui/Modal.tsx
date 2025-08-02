import type { TypedOmit } from "@/components/typedOmit";
import type { CardProps } from "@/components/ui/Card";
import { Button, Card, Title } from "@/components/ui/index";
import { X } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";

export type BaseModalProps = {
	// Core props
	isOpen?: boolean;
	onClose?: () => void;

	// Content props
	title?: string;
	children?: ReactNode;
	icon?: ReactNode;

	// Behavior props
	closeOnClickOutside?: boolean;

	// Layout props
	cardProps?: TypedOmit<CardProps, "children">;
};

export type ModalProps = HTMLAttributes<HTMLDivElement> & BaseModalProps;

export const Modal = ({
	// Core props
	isOpen,
	onClose,

	// Content props
	title,
	children,
	icon,

	// Behavior props
	closeOnClickOutside,

	// Layout props
	cardProps,

	// HTML attributes
	className = "",
	...divProps
}: ModalProps) => {
	const ref = useClickOutside(() => closeOnClickOutside && onClose?.());

	return (
		<>
			{isOpen ? (
				<div className="modal-overlay">
					<div ref={ref} className={`modal-card ${className}`.trim()} {...divProps}>
						<Card {...cardProps} className={`modal-card-inner ${cardProps?.className ?? ""}`.trim()}>
							<div className="modal-header">
								<Title order={3} icon={icon} noMargin>
									{title}
								</Title>
								<Button icon={<X size={16} />} variant="light" onClick={onClose} className="modal-close-btn" />
							</div>
							<div className="modal-content">{children}</div>
						</Card>
					</div>
				</div>
			) : null}
		</>
	);
};

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useClickOutside<T extends HTMLElement = any>(
	callback: () => void,
	events?: string[] | null,
	nodes?: (HTMLElement | null)[]
) {
	const ref = useRef<T>(null);
	const eventsList = events || DEFAULT_EVENTS;

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const listener = (event: any) => {
			const { target } = event ?? {};
			if (Array.isArray(nodes)) {
				const shouldIgnore = !document.body.contains(target) && target.tagName !== "HTML";
				const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node));
				if (shouldTrigger && !shouldIgnore) callback();
			} else if (ref.current && !ref.current.contains(target)) {
				callback();
			}
		};

		eventsList.forEach((fn) => document.addEventListener(fn, listener));

		return () => {
			eventsList.forEach((fn) => document.removeEventListener(fn, listener));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref, callback, nodes]);

	return ref;
}
