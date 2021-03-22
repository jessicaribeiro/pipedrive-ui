import React from 'react';
import Logo from "./Logo";
import SearchBar from "../SearchBar";
import './styles.css';

const Header = () => {
    return (
        <header className="header">
            <Logo />
            <div className="top-bar">
                <span>People's List</span>
                <SearchBar />
            </div>
            <div className="divider"/>
        </header>
    )
};

export default Header;