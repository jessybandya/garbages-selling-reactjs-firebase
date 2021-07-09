import { Avatar, Badge } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './style.css';
import  {db} from '../../firebase';





function Userpage1({user,id, profilePic, username, email, timestamp}) {

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
       <Link to={`/profilewatch/${username}/${id}`}>
        <div  className="videoCard1">

            <div className="videoCard__info1">
            <Badge  color="error" >

                <Avatar className="videoCard__avatar"  src={profilePic}/>  
                </Badge>

               <div className="videoCard__text1">
    <h4>{username}</h4>
               </div>

            </div >

            
        </div>

       </Link>
    )
}

export default Userpage1



