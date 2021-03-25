import React from 'react';
import Logo from "./Logo";
import SearchBar from "../SearchBar";
import './styles.css';
import {Button, Tooltip} from "antd";
import {UserAddOutlined} from '@ant-design/icons';

const Header = ({openAddPersonModal, searchPerson}) => {

    return (
        <header className="header">
            <Logo/>
            <div className="top-bar">
                <span>People's List</span>
                <Tooltip title="Add person">
                    <Button
                        className="btn-add-person"
                        shape="circle"
                        icon={<UserAddOutlined/>}
                        size="medium"
                        onClick={openAddPersonModal}
                    />
                </Tooltip>
                <SearchBar searchPerson={searchPerson}/>
            </div>
        </header>
    )
};

export default Header;