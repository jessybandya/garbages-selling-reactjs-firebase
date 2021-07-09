import React, { useState, useEffect } from 'react'
import Post from './Post';
import Post3 from './Post3';

import './style.css';
import { db } from './../../firebase';
import { auth } from './../../firebase';

import { useHistory } from 'react-router-dom';

function Posts({ user }) {
    const history = useHistory("");
    const [posts, setPosts] = useState([]);
   const {currentUser} = auth
    // document.title = 'Facebook';

   

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);

    console.log(posts)
    
    return (
        <div className="posts">
            {currentUser &&(
          
            posts.map(({ id, post }) => (
                < Post key={id} photoURL={post.photoURL} postId={id} user={user} username={post.username} name={post.name} imageUrl={post.imageUrl} noLikes={post.noLikes} postUserId={post.uid} timestamp={post.timestamp} description={post.description} id={post.id} />
            ))
        
            )}
             {!currentUser &&(
          
          posts.map(({ id, post }) => (
              < Post3 key={id} photoURL={post.photoURL} postId={id}  username={post.username} name={post.name} imageUrl={post.imageUrl} noLikes={post.noLikes} postUserId={post.uid} timestamp={post.timestamp} description={post.description} id={post.id} />
          ))
      
          )}
            
            
        </div>
    )
}

export default Posts