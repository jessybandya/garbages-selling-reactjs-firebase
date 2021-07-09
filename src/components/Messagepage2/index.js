import React, {useState} from 'react';
import SidebarRow from '../Sidebar/SidebarRow';
import Sidebar from './../Sidebar2';
import {auth} from './../../firebase';

import HomeHeader from './../HomeHeader1';
import Messagepage from './../Messagepage';
import Widget from '../Widget';

function Messagepage2() {
        const [user, setUser] = useState([]);
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(false);
      }
    })
    return (
        <>
                <HomeHeader user={user} selected/>

        <div className="home">
            <Sidebar user={user}/>
            <Messagepage user={user}/>
            <Widget />
        </div>
        </>
    )
}

export default Messagepage2
