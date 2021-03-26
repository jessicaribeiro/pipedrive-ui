import React from 'react';
import './styles.css';
import {BsSearch} from "react-icons/bs";
import {Input} from 'antd';

const SearchBar = ({searchPerson}) => {

    return (
        <div className="search-bar">
            <Input
                placeholder="Filter by name"
                prefix={<BsSearch/>}
                onPressEnter={(e) => searchPerson(e)}
                className="search-bar-input"
            />
        </div>
    );
};

export default SearchBar;