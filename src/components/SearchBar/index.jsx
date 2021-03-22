import React from 'react';
import './styles.css';
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
    return (
        <div className="search-bar">
            <BsSearch className="search-bar-icon" />
            <input
                className="search-bar-input"
                placeholder="Filter by name"
                onChange={() => {}}
            />
        </div>
    );
};

export default SearchBar;