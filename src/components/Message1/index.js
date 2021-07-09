import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './style.css';
import db, {firebase, auth} from '../../firebase';




function Message1({id, user, messages,timestamp,profile1,profile2,username,username1,profilePic, uid}) {

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
  

        <div  className="videoCard1">
                <p><h3>{user?.uid == uid ? "Me" : username}</h3></p>

            <img className="" src={profile1} alt="" />
            <div className="videoCard__info">
                <Avatar className="videoCard__avatar"  src={profilePic}/>  
               <div className="videoCard__text">
    <h4>{messages}</h4>
   
    {/* <p>{category} </p> */}
    <p>{parseTimestamp(timestamp)}</p>
               </div>
               
            </div >

            
        </div>

    )
}

export default Message1



