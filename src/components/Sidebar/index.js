import React from 'react';
import './style.css';
import {auth} from './../../firebase';
import SidebarRow from './SidebarRow';
import { LocalHospital } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import {ExpandMoreOutlined} from "@material-ui/icons";
import {Avatar} from "@material-ui/core";
import {Link} from 'react-router-dom';


function Sidebar({user}) {
    return (
        <div className="sidebar">
           <SidebarRow src={user?.photoURL} title={user?.displayName}/>
            <SidebarRow Icon={LocalHospitalIcon} title="COVID-19 Information Center"/>
            <SidebarRow Icon={EmojiFlagsIcon} title="Pages"/> 
            <SidebarRow Image="    https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/1200px-Facebook_Messenger_logo_2018.svg.png
" title="Messengers"/> 

            <SidebarRow Icon={PeopleIcon} title="Friends"/>
            <SidebarRow Icon={ChatIcon} title="Messenger"/> 
            <SidebarRow Icon={StorefrontIcon} title="Marketplace"/>  
            <SidebarRow Icon={VideoLibraryIcon} title="Videos"/> 
            <SidebarRow Icon={ExpandMoreOutlined} title="Marketplace"/>

        </div>
    )
}

export default Sidebar
