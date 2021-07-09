import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './style.scss';
import  {auth} from '../../firebase';
import  {db} from '../../firebase';

import FormInput from '../forms/Forminput';
import FormSelect from '../forms/FormSelect';
import Button from '../forms/Button';



function Adminproducts1({id, cartId, profilePic, image, category, timestamp, name, price,owner,username}) {

    const [posts, setPosts]= useState([]);
    useEffect(() => {
      //   db.collection('messages').where('chat', '==', post).orderBy('timestamp', 'asc').get().then(snapshot => {
      //       console.log(snapshot)
      //       setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
      //   }).catch(error => {
      //       console.error(error)
      //   })
        db.collection('posts').where('read', '==', true).orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            console.log(snapshot)
            let messages = []
            snapshot.forEach(doc => {
                messages.push({id:doc.id, data:doc.data()})
                doc.ref.update({read:true})
            })
            setPosts(messages)
        }, error => console.error(error))

    }, []);

    
    const addTodo = (event) => {
        
        event.preventDefault();
  
        db.collection("posts").doc(id).delete().then(function() {
            alert("product successfully deleted!");
        }).catch(function(error) {
            alert("Error removing document: ", error);
        });
        
    }

    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }
    
    return (
      

        <div  className="videoCard">
            <Link to={`/postview/${id}`}>
            <img className="videoCard__thumbnail" src={image} alt="" />
            <div className="videoCard__info">
               {/* <Avatar className="videoCard__avatar"  src={profilePic}/>  */}
               <div className="videoCard__text">
    <h4>{name}</h4>
    <p><h3>Ksh {price}</h3></p>
    <p>Category: {category} </p>
    <p>{parseTimestamp(timestamp)}</p>
    
               </div>
            </div >

            </Link>  
            {auth.currentUser && (
                <button onClick={addTodo}>Delete</button>

            )}
            <Link to={`profilewatch/${username}/${owner}`}>
                <button>View Profile Owner</button>
            </Link>
            

        </div>
      
      
    )
}

export default Adminproducts1;