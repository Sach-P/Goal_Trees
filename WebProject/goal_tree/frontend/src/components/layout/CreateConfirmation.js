import React from 'react'
import { Modal, Button } from "react-bootstrap";



const CreateConfirmation = ({ showModal, hideModal, confirmModal, content, title }) => {
    return (
        <Modal show={showModal} onHide={hideModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={hideModal}>
                    Cancel
                </Button>
                <Button variant="success" onClick={() => confirmModal()}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateConfirmation;