import React from 'react';
import Logo from "./Logo";
import SearchBar from "../SearchBar";
import './styles.css';
import {Button} from "antd";
import {BsFillPersonPlusFill} from 'react-icons/bs';

const Header = ({addPerson}) => {

    return (
        <header className="header">
            <Logo />
            <div className="top-bar">
                <span>People's List</span>
                <Button
                    className="btn-add-person"
                    type="primary"
                    shape="circle"
                    icon={<BsFillPersonPlusFill />}
                    size="small"
                    onClick={addPerson}
                />
                <SearchBar />
            </div>
            {/*<div className="divider"/>*/}
        </header>
    )
};

export default Header;