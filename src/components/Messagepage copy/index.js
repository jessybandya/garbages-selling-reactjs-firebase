import React, { useState, useEffect } from 'react';

import Messagepage1 from '../Messagepage1';

import './style.css';
import {auth} from "../../firebase";
import  {db} from '../../firebase';

function Messagepage({user}) {




  


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
                if (doc.id != user?.uid) {
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
                
            <Messagepage1
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

export default Messagepage;