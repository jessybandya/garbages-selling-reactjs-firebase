import React, { useState, useEffect } from 'react';
import Adminproducts1 from './../../components/Adminproducts1';
import FormInput from './../forms/Forminput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
// import LoadMore from './../../components/LoadMore';
// import CKEditor from 'ckeditor4-react';
import './style.scss';
import {auth} from "../../firebase";
import  {db} from '../../firebase';

function Cart({user}) {




  


    const {currentUser} = auth
    const [posts, setPosts]= useState([]);
    useEffect(() => {
      if (currentUser) {
        db.collection('posts').orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
         console.log(snapshot)
           setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
           

       }
       )
      }
    }, [currentUser]);


  return (
    currentUser && (
        <>
  <div className="admin">

<div className="callToActions">
  
        
      
      <div className="recommendedvideos__videos">
     
      {posts.map((post) => (
          
      <Adminproducts1
        owner={post.data.uid}
        name={post.data.name}
        timestamp={post.data.timestamp}
        price={post.data.price}
        image={post.data.imageUrl}
        category={post.data.category}
        id={post.id}
        username={post.data.username}
       /> 
        
      ))}
       
      </div>
     
    
</div>





</div>

        </>

        )
  
  );
}

export default Cart;