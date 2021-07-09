import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import './style.css';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar} from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TelegramIcon from '@material-ui/icons/Telegram';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {auth} from './../../firebase';

function HomeHeader({user}) {
    const history = useHistory('');
    if(user === false){
        history.push("/login");
    }
    const logout = (e) =>{
        e.preventDefault();
        auth.signOut();
        history.push("/login");
    }
    return (
        <div className="homeHeader">
            <div className="homeHeader__left">
                 <Link to="/">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/F_icon_reversed.svg/1024px-F_icon_reversed.svg.png" alt="Facebook Logo" className="homeHeader__logo"/>
                 </Link>
            </div>
            <div className="homeHeader__inputSearch">
                <input type="text" placeholder="Search" />
                <SearchIcon className="homeHeader__inputButton" />
            </div>
            <div className="homeHeader__icons">
                    <section>
                       <Avatar className="homeHeader__avatar" alt="" src={user?.photoURL}/>
                       <h3 className="homeHeader__name">{user?.displayName}</h3>
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
                    <section>
                        <Link to="/">
                        <h3 className="homeHeader__name">Home</h3>
                        </Link>
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
                    <section>
                        <h3 className="homeHeader__name">Find Friends</h3>
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
                    <section>
                        <Link to={`/profile/${user?.displayName}/${user?.uid}`}>
                        <h3 className="homeHeader__name">My Account</h3>
                        </Link>
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
                    <section>
                        <GroupAddIcon />
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
                    <section>
                        <TelegramIcon />
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
                    <section>
                        <NotificationsIcon />
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
                    <section>
                        <AssignmentIcon />
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
                    <section>
                        <div className="dropdown">
                           <ArrowDropDownIcon  className="dropdown"/>
                           <div className="dropdown__content">
                               <hr/>
                               <div className="profile"><Avatar className="homeHeader__avatar" alt="" src={user?.photoURL}/>  {user?.displayName}</div>
                               <br/>
                               <br />
                               <hr />
                               <Link to={`/${user?.displayName}/${user?.uid}`}>
                               <p>View Profile</p>
                               </Link>
                               <hr/>
                               <a onClick={logout}><p>Logout</p></a>
                               <hr />
                           </div>
                        </div>
                    </section>
                    <h3 className="homeHeader__dash"> | </h3>
            </div>
        </div>
    )
}

export default HomeHeader;
