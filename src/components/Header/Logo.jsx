import React from 'react';
import './styles.css';
import LogoImg from '../../img/logo.png';

const Logo = () => {
    return (
        <div className="logo">
            <img src={LogoImg} className="logo-img"/>
        </div>
    );
};

export default Logo;