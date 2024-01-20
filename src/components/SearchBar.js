import React from 'react';
import '../css/SearchBar.css'

function SearchBar({ onSearch, isLoggedIn, login }) {
  
    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.searchTerm.value;
        onSearch(searchTerm);
      };

      const handleButtonClick = (event) => {
        event.preventDefault();
        const searchTerm = event.currentTarget.form.elements.searchTerm.value;
        if (isLoggedIn) {
          onSearch(searchTerm);
        } else {
          login(); 
        }
      };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSearch}>
        <input type="text" name="searchTerm" placeholder="Search..." />
        <button type="button" onClick={handleButtonClick}  className={`button-37 ${isLoggedIn ? 'logged-in' : 'not-logged-in'}`}>
          {isLoggedIn ? 'Search' : 'Log in to your spotify account'}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;