import { Avatar, Badge } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './style.css';
import  {db} from '../../firebase';





function Messagepage1({user,id, profilePic, username, email, timestamp}) {

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
    const [posts, setPosts]= useState([]);
    useEffect(() => {
         db.collection('messages').where("toId", "==" ,user?.uid).where("read", "==",false).where("fromId", "==", id).orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            setMessageCount(snapshot.docs.length)
        }
        )
    }, []);
 

    return (
       <Link to={`/message/${id}`}>
        <div  className="videoCard1">

            <div className="videoCard__info1">
            <Badge badgeContent={messageCount} color="error" >

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

export default Messagepage1



