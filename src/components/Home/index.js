import React, {useState} from 'react';
import './style.css';
import HomeHeader from './../HomeHeader1';
import Sidebar from './../Sidebar2';
import Feeds from './../Feeds';
import Widget from './../Widget';


import {auth} from './../../firebase';


function Home() {
    const [user, setUser] = useState([]);
    const {currentUser} = auth
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
      {currentUser &&(
                  <Sidebar user={user} />

      )}
            <Feeds user={user}/>
        </div>
        </>
    )
}

export default Home
