import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteBookModal = ({ show, onHide, book, onConfirm }) => {
 return (
   <Modal show={show} onHide={onHide}>
   <Modal.Header closeButton>
   <Modal.Title>Delete Book</Modal.Title>
   </Modal.Header>
    <Modal.Body>
         <p>Are you sure you want to delete the book "{book?.bookId}"?</p>
    </Modal.Body>
   <Modal.Footer>
  <Button onClick={onConfirm}>Yes</Button>
  <Button onClick={onHide}>No</Button>
  </Modal.Footer>
 </Modal>
 );
};

export default DeleteBookModal;