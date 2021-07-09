import React, {useState, useEffect} from 'react';
import './style.css';
import HomeHeader from './../HomeHeader';
import Sidebar from './../Sidebar2';
import Profile from './../Profile';
import Widget from './../Widget';
import ImageUpload from './../Feeds/ImageUpload';
import {db} from './../../firebase';
import Posts from './../Posts1';
import SidebarProfile from './../Profile/ProfileSidebar';

import {auth} from './../../firebase';


function Profile1({user}) {
    // const [user, setUser] = useState([]);
    // auth.onAuthStateChanged((authUser) =>{
    //   if(authUser){
    //     setUser(authUser)
    //   }else{
    //     setUser(false);
    //   }
    // })
    const [posts, setPosts]= useState("");
    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);
    return (
        <>
        <HomeHeader user={user} selected/>
        <div className="home">
            <div className="first">
            <Sidebar user={user}/>
            </div>
            <div className="second">
            <ImageUpload user={user}/>
            <center><h1>My Products</h1></center> 
            <Posts user={user} />
            </div>
            <div className="third">
            <SidebarProfile username={user} />

            </div>
        </div>
        </>
    )
}

export default Profile1
