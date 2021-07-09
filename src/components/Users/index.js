import React, {useState, useEffect} from 'react';
import SidebarRow from '../Sidebar/SidebarRow';
import Sidebar from './../Sidebar2';
import {auth} from './../../firebase';

import HomeHeader from './../HomeHeader1';
import Messagepage from './../Userpage';
import Widget from '../Widget';
import Userpage from './../Userpage';
import {Link, useParams} from 'react-router-dom'
import  {db} from '../../firebase';


function Users() {
        const [user, setUser] = useState([]);
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(false);
      }
    })
    const [profileUserData, setProfileUserData] = useState();


    const { username, id } = useParams();
    
       
    useEffect(() => {
        db.collection('users').doc(id).onSnapshot((doc) => {
            setProfileUserData(doc.data());
        });
    }, [])
    
    if (profileUserData !== undefined) {
        if (profileUserData?.displayName !== user?.displayName) {
           
    
        } else {
        }
    }
    
    return (
      profileUserData ?(
        <>
                <HomeHeader user={user} selected/>

        <div className="home">
            <Sidebar user={user}/>
            {
             <Userpage user={user}/>
            }
            
        </div>
        </>
      
        ):(
            <h1>Account no longer exist</h1>
        )
    )
}

export default Users;
