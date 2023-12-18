
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './Navbar';
import BookIndex from './BookIndex';
import BookForm from './BookForm';

const App = () => {
 return (
  <Router>
  <AppNavbar/>
   <Routes>
    <Route path="/" element={<BookIndex />} />
    <Route path="/add-book" element={<BookForm />} />
   </Routes>
  </Router>
 );
};

export default App;

