import { Horizontal, Vertical } from "@/utils/ComponentToolbox";
import { useClickOutside } from "@/utils/useClickOutside";
import { X } from "lucide-react";
import { type ReactNode } from "react";
import { Button, Card, Title } from "./index";

export type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	icon?: ReactNode;
	closeOnClickOutside?: boolean;
	style?: React.CSSProperties;
	className?: string;
};

export const Modal = ({ isOpen, onClose, title, children, icon, closeOnClickOutside, style, className = "" }: ModalProps) => {
	const ref = useClickOutside(() => closeOnClickOutside && onClose());

	return (
		<>
			{isOpen ? (
				<Horizontal
					positionAbsolute
					topLeft
					widthFull
					heightFull
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						backdropFilter: "blur(8px)",
						zIndex: 1000,
					}}
					justifyContent="center"
				>
					<div
						ref={ref}
						className={`modal-card ${className}`.trim()}
						style={{ maxWidth: "500px", width: "90%", position: "relative", ...style }}
					>
						<Card className="modal-card-inner">
							<Horizontal justifyContent="space-between" alignItems="center" className="modal-header">
								<Title order={3} text={title} icon={icon} noMargin />
								<Button icon={<X size={16} />} variant="light" onClick={onClose} className="modal-close-btn" />
							</Horizontal>
							<Vertical gap={16} className="modal-content">
								{children}
							</Vertical>
						</Card>
					</div>
				</Horizontal>
			) : null}
		</>
	);
};
