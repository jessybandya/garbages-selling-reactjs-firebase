import React, {useState, useEffect} from 'react';
import './style.css';
import HomeHeader from '../HomeHeader1';
import ProfileSidebar from '../Profile/ProfileSidebar';
import Profile from '../Profile';
import Widget from '../Widget';
import ImageUpload from '../Feeds/ImageUpload';
import {db} from '../../firebase';
import Posts from '../Posts1';
import {useParams} from 'react-router-dom'
import {auth} from '../../firebase';
import Sidebar from '../Sidebar2';
import Profile1 from '../Profile1';
import Adminusers from '../Adminusers';




function Adminusersview({user}) {
    // const [user, setUser] = useState([]);
    // auth.onAuthStateChanged((authUser) =>{
    //   if(authUser){
    //     setUser(authUser)
    //   }else{
    //     setUser(false);
    //   }
    // })

    const { username, uid } = useParams();
    
    document.title = `${username} `

    const myAccount = username === user.displayName;
 
    return (
        <>
        <HomeHeader user={user} selected/>
        <div className="home">
            <Sidebar user={user} />
            <Adminusers user={user}/>
        </div>
        </>
    )
}

export default Adminusersview





