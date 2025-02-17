import { createPortal } from "react-dom"; // render modal on body level instead of parent element
import PropTypes from "prop-types";
import "./modal.css";

export default function Modal({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	return createPortal(
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose}>
					✖
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired // Can be a string, element, or component
};
