import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookIndex.css';
import EditBookModal from './EditBookModal';
import DeleteBookModal from './DeleteBookModal';
import BookSearch from './SearchBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const BookIndex = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageInfo, setPageInfo] = useState({
  totalRecords: 0,
  totalPages: 0,
  page: 1,
  pageSize: 10,
 });

 // Define fetchData function
 const fetchData = async () => {
 try {
  const response = await axios.get(
  `https://localhost:7286/api/Books?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`
  );

    setBooks(response.data.data);
    setPageInfo({
     totalRecords: response.data.totalRecords,
     totalPages: response.data.totalPages,
     page: response.data.page,
     pageSize: response.data.pageSize,
  });

 } catch (error) {
     console.error('Error fetching books:', error.message);
  } finally {
   setLoading(false);
 }
 };

 useEffect(() => {
 // Call fetchData function
   fetchData();
    }, [pageInfo.page, pageInfo.pageSize]);

const handleDeleteClick = (Id) => {
    setSelectedBook({ bookId: Id });
    setShowDeleteModal(true);
};

const handleConfirmDelete = () => {
    axios
    .delete(`https://localhost:7286/api/Books/${selectedBook.bookId}`)
    .then((response) => {
    setBooks((prevBooks) =>
    prevBooks.filter((book) => book.bookId !== selectedBook.bookId)
  );
 })

 .catch((error) => {
    console.error('Error deleting book:', error);
 }) 

  .finally(() => {
    setShowDeleteModal(false);
    setSelectedBook(null);
 });
};

const handleCancelDelete = () => {
   setShowDeleteModal(false);
   setSelectedBook(null);
};

 const handleEditClick = (book) => {
  setSelectedBook(book);
  setShowEditModal(true);
 };

 const handleUpdate = (updatedBook) => {
 const url = `https://localhost:7286/api/Books/${selectedBook.bookId}`;
 axios
   .put(url, updatedBook)
   .then((response) => {
   console.log('Book updated successfully:', response);
  // Refetch data after updating
   fetchData();
  }) 

  .catch((error) => {
      console.error('Error updating book:', error);
  })

   .finally(() => {
   setSelectedBook(null);
   setShowEditModal(false);
  });
 };

  const handlePageChange = (pageNumber) => {
    setPageInfo({ ...pageInfo, page: pageNumber });
 };
    const handleSearch = (searchResults) => {
    setBooks(searchResults);
    setPageInfo({ totalRecords: 0, totalPages: 0, page: 1, pageSize: 10 });
   };
 return (

 <div>
     <br/>
       <BookSearch onSearch={handleSearch} />
     <br/>
    <h2>Book List</h2>
     {loading ? (
     <p>Loading...</p>
  ) : (

  <div>
   <table className="book-table">
    <thead>
     <tr className="titles">
     <th>Title</th>
     <th>Published On</th>
     <th>Language</th>
     <th>Genre</th>
     <th>AuthorName</th>
     <th>Actions</th>
     </tr>
    </thead>
   <tbody>

    {books.map((book) => (
       <tr key={book.bookId}>
          <td>{book.bookName}</td>
          <td>{new Date(book.publishedOn).toLocaleDateString()}</td>
            <td>{book.language}</td>
            <td>{book.genre}</td>
            <td>{`${book.firstName} ${book.lastName}`}</td>
     <td>

     <button
        className="edit-button" onClick={() => handleEditClick(book)}>
       <FontAwesomeIcon icon={faEdit} />
       {' '}

     </button>
  <button
     className="delete-button"
     onClick={() => handleDeleteClick(book.bookId)}>
       <FontAwesomeIcon icon={faTrash} />
     {' '}
  </button>
       </td>
       </tr>
    ))}

   </tbody>
    </table>
   <div>
     <p>Total Records: {pageInfo.totalRecords}</p>
     <p>Total Pages: {pageInfo.totalPages}</p>
     <p>Current Page: {pageInfo.page}</p>
   <button

     onClick={() => handlePageChange(pageInfo.page - 1)}
    disabled={pageInfo.page === 1}
   >

    Previous Page
    </button>
    <button
       onClick={() => handlePageChange(pageInfo.page + 1)}
       disabled={pageInfo.page === pageInfo.totalPages}
   >

    Next Page
   </button>
    </div>
  </div>
  )}

  {/* Edit Book Modal */}
  {showEditModal && (
   <EditBookModal
     show={showEditModal}
     onHide={() => setShowEditModal(false)}
     book={selectedBook}
     onEdit={handleUpdate}
  />
  )}

  {showDeleteModal && (
    <DeleteBookModal
      show={showDeleteModal}
     onHide={handleCancelDelete}
     book={selectedBook}
     onConfirm={handleConfirmDelete}
 />
  )}
 </div>
 );
};
export default BookIndex;