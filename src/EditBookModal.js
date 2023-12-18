import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
   const EditBookModal = ({ show, onHide, book, onEdit }) => {
   const [editedBook, setEditedBook] = useState({ ...book });
   const handleInputChange = (e) => {
   const { name, value } = e.target;
   setEditedBook({ ...editedBook, [name]: value });
 };

   const handleEdit = () => {

   onEdit(editedBook);
   onHide();
 };

 return (
    <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
    <Modal.Title>Edit Book</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <Form>
     <Form.Group controlId="formBookName">
     <Form.Label>Book Name</Form.Label>
     <Form.Control
        type="text"
        name="bookName"
        value={editedBook.bookName}
        onChange={handleInputChange}
   />

   </Form.Group>
   <Form.Group controlId="formPublishedOn">
   <Form.Label>Published On</Form.Label>
   <Form.Control
      type="text"
      name="publishedOn"
      value={editedBook.publishedOn}
       onChange={handleInputChange}
   />

   </Form.Group>
   <Form.Group controlId="formLanguage">
   <Form.Label>Language</Form.Label>
   <Form.Control
      type="text"
      name="language"
      value={editedBook.language}
      onChange={handleInputChange}
   />

   </Form.Group>
   <Form.Group controlId="formGenre">
   <Form.Label>Genre</Form.Label>
   <Form.Control
      type="text"
      name="genre"
      value={editedBook.genre}
      onChange={handleInputChange}
   />

   </Form.Group>
   <Form.Group controlId="formPublicationId">
   <Form.Label>Publication Id</Form.Label>
   <Form.Control
      type="number"
      name="publicationId"
      value={editedBook.publicationId}
      onChange={handleInputChange}
   />

   </Form.Group>
   <Form.Group controlId="formAuthorId">
   <Form.Label>Author Id</Form.Label>
   <Form.Control
       type="number"
       name="authorId"
       value={editedBook.authorId}
       onChange={handleInputChange}
   />

   </Form.Group>
  </Form>

  </Modal.Body>
  <Modal.Footer>
    <Button onClick={onHide}>
   Close
  </Button>
  <Button onClick={handleEdit}>
     Save Changes
  </Button>
  </Modal.Footer>
 </Modal>
 );
};

export default EditBookModal;