import { Button } from "@/components/_ui/Button";
import type { CardProps } from "@/components/_ui/Card";
import { Card } from "@/components/_ui/Card";
import { Title } from "@/components/_ui/Title";
import type { TypedOmit } from "@/components/_ui/typedOmit";
import { X } from "lucide-react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type BaseModalProps = {
	// Core props
	isOpen?: boolean;
	onClose?: () => void;
	asDrawer?: boolean;

	// Content props
	title?: string;
	children?: ReactNode;
	icon?: ReactNode;

	// Behavior props
	closeOnClickOutside?: boolean;

	// Layout props
	cardProps?: TypedOmit<CardProps, "children">;
	fullHeight?: boolean;

	// HTML attributes
	ref?: Ref<HTMLDivElement>;
	headerProps?: HTMLAttributes<HTMLDivElement>;
	contentProps?: HTMLAttributes<HTMLDivElement>;
};

export type ModalProps = HTMLAttributes<HTMLDivElement> & BaseModalProps;

export const Modal = ({
	// Core props
	isOpen,
	onClose,
	asDrawer,

	// Content props
	title,
	children,
	icon,

	// Behavior props
	closeOnClickOutside,

	// Layout props
	cardProps,
	fullHeight,

	// HTML attributes
	className = "",
	ref,
	headerProps,
	contentProps,
	...divProps
}: ModalProps) => {
	const clickOutsideRef = useClickOutside(() => closeOnClickOutside && handleClose());
	const setRef = useCallback(
		(element: HTMLDivElement) => {
			clickOutsideRef.current = element;
			if (typeof ref === "function") ref(element);
			else if (ref) ref.current = element;
		},
		[clickOutsideRef, ref]
	);
	const [wasOpen, setWasOpen] = useState(isOpen);
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		if (isOpen === wasOpen) return;
		setWasOpen(isOpen);
		if (!isOpen) {
			setIsClosing(true);
			setTimeout(() => setIsClosing(false), 300);
		}
	}, [isOpen, wasOpen]);

	const handleClose = () => {
		onClose?.();
		setIsClosing(true);
		setTimeout(() => setIsClosing(false), 300);
	};

	return (
		<>
			{wasOpen || isClosing ? (
				<div className={`modal-overlay ${asDrawer ? "drawer-overlay" : ""} ${isClosing ? "closing" : ""}`}>
					<div
						ref={setRef}
						className={`modal-card ${asDrawer ? "modal-drawer" : ""} ${fullHeight ? "full-height" : ""} ${className}`.trim()}
						{...divProps}
					>
						<Card {...cardProps} className={`modal-card-inner ${cardProps?.className ?? ""}`.trim()}>
							{(title || onClose) && (
								<div {...headerProps} className={`	modal-header ${headerProps?.className ?? ""}`.trim()}>
									<Title order={3} icon={icon} noMargin>
										{title}
									</Title>
									{onClose && <Button icon={<X size={16} />} variant="light" onClick={handleClose} className="modal-close-btn" />}
								</div>
							)}
							<div {...contentProps} className={`modal-content ${contentProps?.className ?? ""}`.trim()}>
								{children}
							</div>
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
