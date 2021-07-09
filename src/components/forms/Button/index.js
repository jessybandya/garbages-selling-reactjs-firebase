import React from 'react';
import './style.scss';

const Button = ({children, ...otherProps}) =>{
    return (
        <div className="btn" {...otherProps}>
            {children}
        </div>
    )
}

export default Button
