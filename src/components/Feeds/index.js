import React, { useState, useEffect } from 'react';
import './style.css';
import {db} from './../../firebase';
import {auth} from './../../firebase';

import {useHistory} from 'react-router-dom';
import ImageUpload from './ImageUpload';
import Posts from './../Posts';
import Story from './../Story';

function Feeds({user}) {
    const history = useHistory('');
    const [posts, setPosts]= useState([]);
    const {currentUser} = auth
    useEffect(() => {
         db.collection('posts').orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
        ))
    }, []);

    return (
        <div className="posts1">
            {/* <Story />
           <ImageUpload user={user}/> */}
         {currentUser &&(
           <Posts user={user} />

         )}
         {!currentUser &&(
           <Posts  />

         )}
         
           
        </div>

    )
}

export default Feeds
