import React, {useState, useEffect} from 'react';
import './style.css';
import {useParams, Link} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { storage, db } from './../../firebase';
import firebase from "firebase";
import Sidebar from './../Sidebar2';
import Widget from '../Widget';
import HomeHeader from './../HomeHeader1';
import Dialog from '@material-ui/core/Dialog';
import FormSelect from './../forms/FormSelect';
import FormInput from './../forms/Forminput';

import CloseIcon from '@material-ui/icons/Close';




function Postview({ postUserId, timestamp, user, description}) {

    let { id } = useParams();
    let { username } = useParams();

    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }

    const [post, setPost] = useState(null)
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [comments, setComments] = useState([]);
    const [postUser, setPostUser] = useState();
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');
    const [posterImage, setPosterImage] = useState('');
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [noLikes, setNoLikes] = useState(0);
    const [scroll, setScroll] = React.useState('paper');
    const [input, setInput] = useState("");
    const [price, setPrice] = useState("");
    const [cat, setCat] = useState("");
    const [name1, setName1] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");


    const requestInvoice = () => {
        db.collection('invoices').where("productId", "==",id ).get().then(
          snap => {
            if (snap.docs.length > 0) {
              alert("This product has already been invoiced")
            } else {
              setOpen(false)
            }
          }
        )
      }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        setImageURL(URL.createObjectURL(e.target.files[0]));
    };

    const uploadFileWithClick = () => {
        document.getElementsByClassName('four')[0].click();
    }

    const handleClickOpen = (scrollType) => () => {
        db.collection('invoices').where("productId", "==",id ).get().then(
            snap => {
              if (snap.docs.length > 0) {
                alert("This product has already been invoiced")
                setOpen(false)

              } else {
                setOpen(true);
                setScroll(scrollType);
              }
            }
          )
        
    };

    const handleClose = () => {
        setOpen(false);
        setImage("");
        setImageURL("");
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    

   
    


    useEffect(() => {
        db.collection('posts').doc(id).get().then(
            snapshot => setPost(snapshot.data())
        ).catch(
        )
        
     
    }, []);
   

    useEffect(() => {
        let unsubscribe;
        if (id) {
            unsubscribe = db.collection("posts").doc(id).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [id]);
    

    useEffect(() => {
        db.collection("posts")
            .doc(id)
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
    }, [id, user.uid]);

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
            .doc(id)
            .get()
            .then(docc => {
                const data = docc.data()
                console.log(show)
                if (show == 'like2') {
                    db.collection("posts")
                        .doc(id)
                        .collection("likes")
                        .doc(user.uid)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                console.log(doc2.data())
                            } else {
                                db.collection("posts").doc(id).collection("likes").doc(user.uid).set({
                                    likes: 1
                                });
                                db.collection('posts').doc(id).update({
                                    noLikes: data.noLikes + 1
                                });
                            }
                        })

                } else {
                    db.collection('posts').doc(id).collection('likes').doc(user.uid).delete().then(function () {
                        db.collection('posts').doc(id).update({
                            noLikes: data.noLikes - 1
                        });
                    })
                }
            })

    }
    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(id).collection("comments").add({
            text: comment,
            read: false,
            toId:post.uid,
            username: user?.displayName,
            timestamp: Date.now(),
            photoURL: user?.photoURL
        });
        setComment('');
    }

    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPosterImage(snapshot.data().photoURL)
                console.log(snapshot.data())
            })
        }
    }, [])


    

   


        const handleUpload = (event) => {
            
                event.preventDefault();
                
                    db.collection("invoices").add({
                        name: name1,
        timestamp:  Date.now(),
        email: email,
        phone: phone,
        read: false,
        toId: post.uid,
        productId:id,
     productName: post.name,
       productPrice: post.price,
       productImage: post.imageUrl,
       productCategory: post.category,
       productOwner: post.username,
       productOwnerPhoto: post.photoURL,

      sentPersonPhoto: user?.photoURL,
      sentPersonId: user?.uid,
      sentPersonEmail:user?.email,
      sentPersonUsername: user?.displayName
                    }).then(ref => alert("invoice submitted successfully"))
                    setName1("");
                    setPhone("");
                    setEmail("");
                    
                    setImage(null);
                
            
    
        }
      
      


    
    
    return (
        

        post ?(
            <>
            <HomeHeader user={user} selected/>

            <div className="home">
                
                <Sidebar style={{marginTop: "20px"}} user={user}/>
          <div className="post">
            <div className="post__header">
                {/* <Avatar
                    className="post__avatar"
                    alt=""
                    src={post.photoURL}
                /> */}
                <h3 onClick={() => {
                    window.location.href=  `/${username}/${user?.uid}`
                }} style={{cursor: 'pointer'}}>Product Owner name: {post.username}</h3>
                <i class="post__verified" />
            </div>
            <h3 onClick={() => {
                    window.location.href=  `/${caption}/${user?.uid}`
                }} style={{cursor: 'pointer',marginLeft: "50px", color: "gray"}} >Product Name: {post.name}</h3>
                <h3 onClick={() => {
                    window.location.href=  `/${caption}/${user?.uid}`
                }} style={{cursor: 'pointer',marginLeft: "50px", color: "gray"}} >Product Category: {post.category}</h3>
                <h3 onClick={() => {
                    window.location.href=  `/${caption}/${user?.uid}`
                }} style={{cursor: 'pointer',marginLeft: "50px", color: "gray"}} >Product Price: Ksh{post.price}</h3>
                <h3 onClick={() => {
                    window.location.href=  `/${caption}/${user?.uid}`
                }} style={{cursor: 'pointer',marginLeft: "50px", color: "gray"}} >Product Quantity: {post.size}kg</h3>
                <h3 onClick={() => {
                    window.location.href=  `/${caption}/${user?.uid}`
                }} style={{cursor: 'pointer',marginLeft: "50px", color: "gray"}} >Product Description: Ksh{post.caption}</h3>
            <h4 className="post__text">Time posted: {parseTimestamp(post.timestamp)}</h4>
            
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
            >
                <div class="makeStyles-paper-1">
                    <div class="modalInit">
                        <h1 style={{color: "orange"}}>Request Invoice</h1>
                        <CloseIcon class="closeModalIcon" style={{background:"orange",color:"white",cursor: "pointer"}} onClick={handleClose} />
                    </div>
                    <div class="hr2" />
                    <div class="profileHead">
                        <img src={user?.photoURL} className="Avatar" />
                        <h1>{user?.displayName}</h1>
                    </div>
                    <div class="inputForUpload">
                        
                        <FormInput
              label="Enter your name"
              value={name1}
            onChange={(e) => setName1(e.target.value)} type="text"  
            required/>
            <input onChange={handleChange} type="file" accept="image/*" className='four' />
            <FormInput
              label="Enter phone number"
              value={phone}
            onChange={(e) => setPhone(e.target.value)} type="text"  
            required/>
            <FormInput
              label="Enter email"
              value={email}
            onChange={(e) => setEmail(e.target.value)} type="email"  
            required/>

            

           

                    

                    
                 
            </div>
                   
                    
                   


                    
                    <button onClick={handleUpload} style={{cursor: "pointer",background: "orange",color: "white", height: "40px"}}   type="submit" >Send</button>

                </div>
            </Dialog>
            <center><img src={post.imageUrl} className="post__image" /></center>
            <center><button style={{background: "orange",color: "white",cursor: "pointer"}}   value={caption} onClick={handleClickOpen('body')} >Request Invoice</button> <Link to={`/profilewatch/${post.username}/${post.uid}`}><button style={{background: "orange",color: "white"}}>View Owner Profile</button></Link></center>
           
           

            <div class="hr" />
            

            <div className="post__likeoptions">
                <div className="like" onClick={likeHandle}>
                    <i className={show} />
                    <h3 className={show2}>Like</h3>
                </div>
                <div className="comment">
                    <i className="comment2" />
                    <h3 class="dope">Comment</h3>
                </div>
                
            </div>
            <form onSubmit={postComment}>
                <div className="commentBox">
                    <Avatar
                        className="post__avatar2"
                        alt=""
                        src={user?.photoURL}
                    />
                    <input className="commentInputBox" type="text" placeholder="Write a comment ... " value={comment} onChange={(e) => setComment(e.target.value)} />
                    <input type="submit" disabled={!comment} className="transparent__submit" />
                </div>
                <p className="pressEnterToPost">Press Enter to post</p>
            </form>

            {
                
                comments.map((comment) => (
                    
                    <div  className={`comments__show ${comment.username == postUser?.displayName && 'myself'}`}>
                              
                                                

                        <Avatar
                            className="post__avatar2"
                            alt=""
                            src={comment.photoURL}
                        />
                         
                        
                        <div class="container__comments">
                            <p><span>{comment.username}</span><i class="post__verified"></i>&nbsp;{comment.text}</p>

                        </div>
                        {comment.username == user?.displayName && (
                           
                           <>
                       <section>
                        <div className="dropdown">
                           {/* <MoreHorizIcon   className="dropdown"/> */}
                           
                        </div>
                    </section>
                           </>
                           
            )} 
                    </div>

                    
                ))
            }
        </div>
         </div>
         </>

         
        ): (<h1>This product no longer exist</h1>)

    )
 }



export default Postview


