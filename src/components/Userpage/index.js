import React, { useState, useEffect } from 'react';

import Userpage1 from '../Userpage1';

import './style.css';
import {auth} from "../../firebase";
import  {db} from '../../firebase';

function Userpage({user}) {




  


    const {currentUser} = auth
    const [posts, setPosts]= useState([]);
    useEffect(() => {
        //  db.collection('users').orderBy('timestamp', 'desc')
        // .onSnapshot(snapshot => {
        //     setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
        //     console.log(snapshot)
        // }
        //)
         db.collection('users').get().then(snap => {
             let users = []
             snap.forEach(doc => {
                if (doc.id != auth.currentUser.uid) {
                    users.push({id:doc.id, data:doc.data()})
                }
              })
             setPosts(users)
         })
    }, []);

  return (
      
    <div className="admin">

      <div className="callToActions">
        
              
            
            <div className="recommendedvideos__videos">
           
            {posts.map((post) => (
                
            <Userpage1
            //   key={post.data.auth.uid}
                id={post.id}
              profilePic={post.data.photoURL}
              username={post.data.displayName}
              timestamp={post.data.timestamp}
              email={post.data.email}
              user={user}
              
             /> 
              
            ))}
             
            </div>

          
      </div>





    </div>
  );
}

export default Userpage;