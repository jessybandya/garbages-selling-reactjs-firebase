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
import Cart from './../../components/Cart';




function CartView({user}) {
    // const [user, setUser] = useState([]);
    // auth.onAuthStateChanged((authUser) =>{
    //   if(authUser){
    //     setUser(authUser)
    //   }else{
    //     setUser(false);
    //   }
    // })

    


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
            <Sidebar user={user} />
            <Cart user={user}/>
        </div>
        </>
      
      ):(
          <h1>Account no longer exist</h1>
      )    )
}

export default CartView





