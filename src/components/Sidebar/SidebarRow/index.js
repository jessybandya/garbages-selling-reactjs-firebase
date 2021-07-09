import React from 'react';
import './style.css';
import {Avatar} from "@material-ui/core";

function SidebarRow({src, Icon, title, Image}) {
    return (
        <div className="sidebarRow">
            {/* <h3>{props.title}</h3> */}
            {src && <Avatar src={src}/>}

            {Icon && <Icon/> }
            <img src={Image} className="messenger"/>
    <h4>{title}</h4>
        </div>
    )
}

export default SidebarRow;
