import React, {useState, useEffect} from 'react';
import './style.css';
import HomeHeader from './../HomeHeader1';
import ProfileSidebar from './../Profile/ProfileSidebar';
import Profile from './../Profile';
import Widget from './../Widget';
import ImageUpload from './../Feeds/ImageUpload';
import {db} from './../../firebase';
import Posts from './../Posts1';
import {useParams} from 'react-router-dom'
import {auth} from './../../firebase';
import Sidebar from './../Sidebar2';
import Profile1 from '../Profile1';




function Myprofile({user}) {
    // const [user, setUser] = useState([]);
    // auth.onAuthStateChanged((authUser) =>{
    //   if(authUser){
    //     setUser(authUser)
    //   }else{
    //     setUser(false);
    //   }
    // })
    const [profileUserData, setProfileUserData] = useState();


    const { username, uid } = useParams();
    
    document.title = `${username}`

    const myAccount = username === user.displayName;

    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot((doc) => {
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
            <div className="second1">
                <Profile user={user}/>
                <ImageUpload />
            <center><h1>My Products</h1></center> 

            <Posts user={user} />
            </div>
            <div className="third">
            </div>
        </div>
        </>
        ):(
            <h1>Account no longer exist</h1>
        )
    )
}

export default Myprofile





