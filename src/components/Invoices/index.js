    import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './style.scss';
import  { db } from '../../firebase';
import FormInput from '../forms/Forminput';
import FormSelect from '../forms/FormSelect';
import Button from '../forms/Button';



function Invoices({id, name,pname,timestamp,email,phone,category,image,price,toId,profilePic,email2,username,sentId,pId}) {

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
  
        db.collection("invoices").doc(id).delete().then(function() {
            alert("invoice successfully deleted!");
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
        const unsub = db.collection('invoices').where('read', '==', false).orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            console.log(snapshot)
            let messages = []
            snapshot.forEach(doc => {
                messages.push({id:doc.id, data:doc.data()})
                doc.ref.update({read:true})
            })
            setPosts(messages)
        }, error => console.error(error))
        return () => {
            unsub()
        }
        
    }, []);

    return (

        <div  className="videoCard">
            <img className="videoCard__thumbnail" src={image} alt={image} />
            <div className="videoCard__info">                  <Avatar className="videoCard__avatar"  src={profilePic}/>                  
             <div className="videoCard__text">
             <h4><p>Invoicer Username: {username}</p> </h4>                
              <h4><p>Invoicer Name: {name}</p> </h4>   
               <h4>Product Invoiced: {pname}</h4>         
               <h4><p>Category: {category} </p></h4> 
               <h4><p>Invoicer Phone No.: {phone} </p></h4>     
               <h4><p>Invoicer Email1: {email} </p></h4>
               <h4><p>Invoicer Email2: {email2} </p></h4>       
                <h4><p>Product Price: Ksh{price} </p> </h4>        
                <p>Time Sent: {parseTimestamp(timestamp)}</p>               
                 </div>                            
                  </div >

            <button type="submit" onClick={addTodo}>
                Delete
            </button>
            {/* <button>
                View Profile
            </button> */}
            <Link to={`/postview/${pId}`}>
            <button>
                View Product
            </button>
            </Link>
            <Link to={`/message/${sentId}`}>
            <button>
                Message
            </button>
            </Link>
            <Link to={`/profilewatch/${username}/${sentId}`}>
            <button>
                View Sender Profile
            </button>
            </Link>
            
        </div>
    )
}

export default Invoices



