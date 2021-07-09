import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';

import './style.scss';
import { Avatar } from '@material-ui/core';
import { auth } from './../../firebase';
import { db } from './../../firebase';

import firebase from "firebase";
import {Link} from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


function Cart1({id,name, postId, user, username, description, imageUrl,image, noLikes, postUserId, timestamp, photoURL }) {
    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');
    const [posterImage, setPosterImage] = useState('')
    const [messageCount, setMessageCount] = useState(0)


    const [postUser, setPostUser] = useState();

    const {currentUser} = auth

   
   useEffect(() => {
    let unsubscribe;
    if (postId) {
        unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setMessageCount(snapshot.docs.length);
        });
    }
    return () => {
        unsubscribe();
    }
}, [postId]);

    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPostUser(snapshot.data())
            })
        }

        console.log(postUserId)
    }, [postUserId])

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .doc(user.uid)
            .get()
            .then(doc2 => {
                if (doc2.data()) {
                    if (show == 'like2') {
                        setShow('like2 blue');
                        setShow2('textforlike bluetextforlike')
                    } else {
                        setShow('like2');
                        setShow2('textforlike')
                    }
                }
            })
    }, [postId, user.uid]);

    const likeHandle = (event) => {
        event.preventDefault();
        if (show == 'like2') {
            setShow('like2 blue');
            setShow2('textforlike bluetextforlike')
        } else {
            setShow('like2');
            setShow2('textforlike')
        }

        db.collection('posts')
            .doc(postId)
            .get()
            .then(docc => {
                const data = docc.data()
                console.log(show)
                if (show == 'like2') {
                    db.collection("posts")
                        .doc(postId)
                        .collection("likes")
                        .doc(user.uid)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                console.log(doc2.data())
                            } else {
                                db.collection("posts").doc(postId).collection("likes").doc(user.uid).set({
                                    likes: 1
                                });
                                db.collection('posts').doc(postId).update({
                                    noLikes: data.noLikes + 1
                                });
                            }
                        })

                } else {
                    db.collection('posts').doc(postId).collection('likes').doc(user.uid).delete().then(function () {
                        db.collection('posts').doc(postId).update({
                            noLikes: data.noLikes - 1
                        });
                    })
                }
            })

    }
    const addTodo = (event) => {
        
        event.preventDefault();
  
        db.collection("posts").collection("comments").doc(postId).delete().then(function() {
            alert("comment successfully deleted!");
        }).catch(function(error) {
            alert("Error removing post: ", error);
        });
        
    }

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            read:false,
         ownerId: postUserId,
            username: user?.displayName,
            timestamp: Date.now(),
            photoURL: user?.photoURL
        });
        setComment('');
    }

    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPosterImage(snapshot.photoURL)
                console.log(snapshot.data())
            })
        }
    }, [])

    const addTodo1 = (event) => {
        event.preventDefault();
  
        db.collection("carts").doc(id).delete().then(function() {
            alert("Successfully deleted!");
        }).catch(function(error) {
            alert("Error removing document: ", error);
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
        db.collection('carts').where('read', '==', false).orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            console.log(snapshot)
            let messages = []
            snapshot.forEach(doc => {
                messages.push({id:doc.id, data:doc.data()})
                doc.ref.update({read:true})
            })
            setPosts(messages)
        }, error => console.error(error))

    }, []);

    return (
   
        <>
        <div className="videoCard">

            <Link to={`/postview/${postId}`}>
            
            
            <img src={image} className="videoCard__thumbnail" />
                </Link>

                <center><p>{name}</p></center>

            <div className="post__likeandlove">
                <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" className="post__like"/>
            <div className="details">
            <div className="details1">{noLikes} {noLikes == 1 ? "Likes" : "Likes"}</div> <div className="details2">{messageCount} Comments</div>

            </div>
            </div>

            <div class="hr1" />
            <center><button onClick={addTodo1}>Delete</button></center>


            <div className="post__likeoptions">
                
                
                
            </div>
            

           
        </div>
        </>
    )
}

export default Cart1;