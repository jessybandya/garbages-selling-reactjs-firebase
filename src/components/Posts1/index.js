import React, { useState, useEffect } from 'react'
import Post1 from './Post1';
import './style.css';
import { db } from '../../firebase';
import { auth } from '../../firebase';

import { useHistory } from 'react-router-dom';

function Posts1({ user }) {
    const history = useHistory("");
    const [posts, setPosts] = useState([]);

    const {currentUser} = auth


    // document.title = 'Facebook';

    if (user === undefined) {
        history.push("/login")
    }

    useEffect(() => {
        db.collection('posts').where("uid", "==", auth.currentUser.uid).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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
                    < Post1 key={id} photoURL={post.photoURL} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} noLikes={post.noLikes} postUserId={post.uid} timestamp={post.timestamp}/>
                ))
            }
        </div>
    )
}

export default Posts1