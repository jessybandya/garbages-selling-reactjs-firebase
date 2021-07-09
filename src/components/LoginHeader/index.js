import React from 'react';
import './style.css';
import logo from './../../assets/garbage.jpg';

import {Link} from 'react-router-dom';

function LoginHeader() {
    return (
        <div className="header">
            <Link className="link" to="/">
                <img src={logo} alt="Logo" className="header__logo"/>
            </Link>
            
        </div>
    )
}

export default LoginHeader
