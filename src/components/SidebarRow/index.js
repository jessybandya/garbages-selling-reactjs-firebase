import React from 'react';
import './style.scss';
import {Avatar, Badge} from "@material-ui/core";


function SidebarRow({selected, Icon, title, badgeCount}) {
    return (
        <div className={`sidebarRow ${selected && "selected"}`}>
            <div >
            {/* {src && <Avatar src={src}/>} */}
            {Icon && (
                <Badge badgeContent={badgeCount} color="error">

<center><Icon className="icon"/></center>
                </Badge>
            ) }
            </div>
            <h4 className="title">{title}</h4>
        </div>
    )
}

export default SidebarRow;
