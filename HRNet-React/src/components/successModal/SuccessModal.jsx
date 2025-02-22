import Modal from "react-amazing-modal-component";
import PropTypes from "prop-types";
import "../../style/components/_success-modal.scss";

export default function SuccessModal({ isOpen, onClose }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<p>Employee created!</p>
		</Modal>
	);
}

SuccessModal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func
};
