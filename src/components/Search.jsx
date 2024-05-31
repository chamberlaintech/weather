import React from "react";

const Search = ({ search, handleSubmit, handleSearch, handleInputChange }) => {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for city"
        name="search"
        value={search}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default Search;
