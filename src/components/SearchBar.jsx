// src/components/SearchBar.jsx
import { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };
  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by movie title or genre..."
        value={searchInput}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;