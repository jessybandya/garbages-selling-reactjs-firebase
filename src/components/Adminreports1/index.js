import { Avatar, Badge } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './sryle.scss';
import  {db} from '../../firebase';
import FormInput from '../forms/Forminput';
import FormSelect from '../forms/FormSelect';
import Button from '../forms/Button';




function Adminreports1({id,reportedId,reporterId,reporterUsername,reportedUsername,reporterEmail,reportedEmail,reporterProfile,reportedProfile, timestamp}) {

    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }

    const [messageCount, setMessageCount]= useState(0);
    useEffect(() => {
         db.collection('reports').where("read", "==",false).where("sentPersonId", "==", reporterId).orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            setMessageCount(snapshot.docs.length)
        }
        )
    }, []);
    const addTodo = (event) => {
        
        event.preventDefault();
  
        db.collection("reports").doc(id).delete().then(function() {
            alert("report successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
    }
 

    return (
       <Link to={`/adminreportsview2/${reporterUsername}/${id}`}>
        <Badge badgeContent={messageCount} color="error" >
        <div  className="videoCard">

            <img className="videoCard__thumbnail" alt="" src={reporterProfile} />
            <div className="videoCard__info">
                <Avatar className="videoCard__avatar"  src={reporterProfile}/>  
               <div className="videoCard__text">
    <h4>Reporter Username: {reporterUsername}</h4>
               </div>
               
            </div >

            <button type="submit" onClick={addTodo}>
           Delete
       </button>  
        </div>
        
        </Badge>
        
       </Link>
       
    )
}

export default Adminreports1;



