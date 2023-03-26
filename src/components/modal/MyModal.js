import './modal.css';

import Modal from 'react-modal';

export default function MyModal(props) {

    const {
        size = '',
        title,
        body,
        saveButton,
        handleSaveButtonClicked,
        openModal,
        onAfterClose,
        closeModal
    } = props;

    Modal.setAppElement('body');

    return (
        <Modal
            closeTimeoutMS={100}
            shouldCloseOnOverlayClick={false}
            overlayClassName={`modal ${size}`}
            isOpen={openModal}
            onAfterClose={onAfterClose}
            onRequestClose={closeModal}
            style={{content: {padding: '5px'}}}
        >
            <div className="modal_header">
                <span className="modal_title">{title}</span>
                <button className="modal_close-button"
                        onClick={closeModal}>&times;</button>
            </div>
            <div className="modal_body">
                {body}
            </div>
            <div className="modal_footer">
                {saveButton &&
                <button
                    className="btn btn-primary"
                    onClick={handleSaveButtonClicked}>
                    {saveButton}
                </button>}
            </div>
        </Modal>
    )
}
