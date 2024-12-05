// src/components/LogoutModal.js
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const LogoutModal = ({ isOpen, toggle, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Confirm Logout</ModalHeader>
            <ModalBody>
                Are you sure you want to log out?
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                <Button color="danger" onClick={onConfirm}>Logout</Button>
            </ModalFooter>
        </Modal>
    );
};

export default LogoutModal;
