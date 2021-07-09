import React, { useState, useEffect } from 'react';
import Adminusers1 from './../../components/Adminusers1';
// import LoadMore from './../../components/LoadMore';
// import CKEditor from 'ckeditor4-react';
import './style.scss';
import {auth} from "./../../firebase";
import  {db} from './../../firebase';

function Adminusers({user}) {




  

  const {currentUser} = auth

  const [posts, setPosts]= useState([]);
  useEffect(() => {
    if (currentUser) {
      db.collection('users')
      .onSnapshot(snapshot => {
        let users = []
        snapshot.docs.forEach(doc => {
          if (currentUser.uid !== doc.id) {
            users.push({id: doc.id, data: doc.data()})
          }
        })
         setPosts(users)

     }
     )
    }
  }, [currentUser]);

  return (
      
    <div className="admin">

      <div className="callToActions">
        
              
            
            <div className="recommendedvideos__videos">
           
            {posts.map((post) => (
                
            <Adminusers1
            //   key={post.data.auth.uid}
                id={post.id}
              image={post.data.photoURL}
         
              timestamp={post.timestamp}
              email={post.data.email}
             
              price={post.data.productPrice}
              profilePic={post.data.photoURL}
              
               username={post.data.displayName}
               clientId={post.data.uid}
              
             /> 
              
            ))}
             
            </div>

          
      </div>





    </div>
  );
}

export default Adminusers;