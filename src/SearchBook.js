import React, { useState } from 'react';
import axios from 'axios';
   const BookSearch = ({ onSearch }) => {
   const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = async () => {
  try {
     const response = await axios.get(`https://localhost:7286/api/Books/GetBook/${searchTerm}`);
     onSearch(response.data);
    } catch (error) {
     console.error('Error searching for books:', error.message);
     onSearch([]); // Assuming an empty array for no results
  }
 };
 return (

  <div>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
       <button onClick={handleSearch}>Search</button>
  </div>
 );
};

export default BookSearch;