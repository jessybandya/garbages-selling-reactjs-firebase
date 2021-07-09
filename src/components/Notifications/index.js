import React, { useState, useEffect } from 'react';
import Invoices from './../../components/Invoices';
// import LoadMore from './../../components/LoadMore';
// import CKEditor from 'ckeditor4-react';
import './style.scss';
import { auth } from "./../../firebase";
import  { db } from './../../firebase';

function Notifications({user}) {




  

  const {currentUser} = auth

  const [posts, setPosts]= useState([]);
  useEffect(() => {
    if (currentUser) {
      db.collection('invoices').where("toId", "==" ,auth.currentUser.uid).orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
       console.log(snapshot)
         setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))

     }
     )
    }
  }, [currentUser]);

  return (
      
    <div className="admin">

      <div className="callToActions">
        
              
            
            <div className="recommendedvideos__videos">
           
            {posts.map((post) => (
                
            <Invoices
            //   key={post.data.auth.uid}
                id={post.id}
              image={post.data.productImage}
              name={post.data.name}
              timestamp={post.data.timestamp}
              email={post.data.email}
              pname={post.data.productName}
              pId={post.data.productId}
              phone={post.data.phone}
              category={post.data.productCategory}
              price={post.data.productPrice}
              profilePic={post.data.sentPersonPhoto}
               toId={post.data.sentPersonId}
               email2={post.data.sentPersonEmail}
               username={post.data.sentPersonUsername}
               sentId={post.data.sentPersonId}
              
             /> 
              
            ))}
             
            </div>

          
      </div>





    </div>
  );
}

export default Notifications;