import React from 'react';
import {Link} from 'react-router-dom';
import logo from './../../assets/garbage.jpg';

import './style.css';

function RegisterHeader() {
    return (
        <div className="header">
            <div className="header__left">
                <Link to="/">
                    <img src={logo} alt="Facebook Logo" className="header__logo" />
                </Link>
            </div>
            <div className="header__right">
                  
            </div>
        </div>
    )
}

export default RegisterHeader;
