// BookForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ onAddBook }) => {
  const [book, setBook] = useState({
    BookName: '',
    PublishedOn: '',
    Language: '',
    Genre: '',
    PublicationId: 0,
    AuthorId: 0,
 });

const handleChange = (e) => {
   const { name, value } = e.target;
   setBook({ ...book, [name]: value });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   console.log('Before Axios request');
  try {

   const formattedBook = { ...book, PublishedOn: new Date(book.PublishedOn) };
   const response = await axios.post ('https://localhost:7286/api/Books/Create', formattedBook);
   console.log(response.data);
   console.log('Book added successfully:', response.data);
   setBook({
     BookName: '',
     PublishedOn: '',
     Language: '',
     Genre: '',
     PublicationId: 0,
     AuthorId: 0,
   });
   console.log('State after clearing:', book);
  } catch (error) {
   console.error('Error adding book:', error);
  }
 };

 return (
  <form onSubmit={handleSubmit}>
    <br />
      <label>
         Book Name:
        <input
            type="text"
            name="BookName"
            value={book.BookName}
            onChange={handleChange}
            className="form-control"
    />
      </label>
    <br />

       <label>
         Published On:
         <input
           type="datetime-local"
           name="PublishedOn"
           value={book.PublishedOn}
           onChange={handleChange}
          className="form-control"
    />
       </label>
    <br />

  <label>
     Language:
     <input
       type="text"
       name="Language"
       value={book.Language}
       onChange={handleChange}
       className="form-control"
    />
   </label>
   <br />

   <label>
       Genre:
       <input
         type="text"
         name="Genre"
         value={book.Genre}
         onChange={handleChange}
         className="form-control"
    />
   </label>
   <br />
      <label>
       Publication ID:
      <input
        type="number"
        name="PublicationId"
        value={book.PublicationId}
        onChange={handleChange}
        className="form-control"
    />
       </label>
   <br />
    <label>
    Author ID:
       <input
        type="number"
        name="AuthorId"
        value={book.AuthorId}
        onChange={handleChange}
        className="form-control"
    />
   </label>
   <br /><br/>
   <button type="submit" className="btn btn-primary">
    Add Book
       </button>
     </form>
 );
};

export default BookForm;