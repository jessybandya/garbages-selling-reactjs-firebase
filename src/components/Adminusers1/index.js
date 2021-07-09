import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './style.scss';
import  {auth} from '../../firebase';
import  {db} from '../../firebase';

import FormInput from '../forms/Forminput';
import FormSelect from '../forms/FormSelect';
import Button from '../forms/Button';



function Adminusers1({id, name,pname,timestamp,email,phone,category,image,price,toId,profilePic,email2,username, clientId}) {


    const {currentUser} = auth
    const [posts1, setPosts1]= useState([]);
    useEffect(() => {
      if (currentUser) {
        db.collection('posts').where("uid", "==", clientId).orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
         console.log(snapshot)
           setPosts1(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
           

       }
       )
      }
    }, [currentUser]);
    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }
    const addTodo = (event) => {
        
        event.preventDefault();
  
        db.collection("users").doc(clientId).delete().then(function() {
            alert("successfully!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
    }
    const [posts, setPosts]= useState([]);
    useEffect(() => {
      //   db.collection('messages').where('chat', '==', post).orderBy('timestamp', 'asc').get().then(snapshot => {
      //       console.log(snapshot)
      //       setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
      //   }).catch(error => {
      //       console.error(error)
      //   })
        const unsub = db.collection('users').onSnapshot(snapshot => {
            console.log(snapshot)
            let messages = []
            snapshot.forEach(doc => {
                messages.push({id:doc.id, data:doc.data()})
                doc.ref.update({read:true})
            })
            setPosts(messages)
            return () => {
                unsub()
            }
        }, error => console.error(error))

    }, []);

    return (

        <div  className="videoCard">
            <img className="videoCard__thumbnail" src={image} alt={image} />
            <div className="videoCard__info">                  <Avatar className="videoCard__avatar"  src={profilePic}/>                  
             <div className="videoCard__text">
             <h4><p>Username: {username}</p> </h4>                
            
               <h4><p>Email: {email} </p></h4>
           
                 </div>                            
                  </div >

            <button type="submit" onClick={addTodo}>
                Remove
            </button>
            {/* <button>
                View Profile
            </button> */}
            <Link to={`/message/${clientId}`}>
            <button>
                Message
            </button>
            </Link>
            

           
          
          
            <Link to={`/profilewatch/${username}/${clientId}`}>
            <button>
             View Profile
            </button>
            </Link>
            
        </div>
    )
}

export default Adminusers1



