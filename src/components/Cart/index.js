import React, { useState, useEffect } from 'react'
import Post from './../Cart1';
import './style.scss';
import {  auth } from './../../firebase';
import {  db } from './../../firebase';

import { useHistory } from 'react-router-dom';

function Posts({ user }) {
    const history = useHistory("");
    const [posts, setPosts] = useState([]);

     document.title = `${user.displayName}`;

    if (user === undefined) {
        history.push("/login")
    }
 const {currentUser}= auth
    useEffect(() => {
        db.collection('carts').where("toId", "==", auth.currentUser.uid).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);

    console.log(posts)
    
    return (
        <div className="posts">
            {
                posts.map(({ id, post }) => (
                    <Post key={id} image={post.image} postId={post.productId} id={id} user={user} username={post.username} name={post.name} imageUrl={post.imageUrl} noLikes={post.noLikes} postUserId={post.uid} timestamp={post.timestamp} description={post.description} />
                ))
            }
        </div>
    )
}

export default Posts