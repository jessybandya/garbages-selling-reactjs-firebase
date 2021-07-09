import React, { useState, useEffect } from 'react'
import './style.css';
import { useParams } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { storage, db } from './../../firebase';
import firebase from "firebase";
import { useHistory } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import ImageUpload from './../Feeds/ImageUpload';
import Post from './../Posts/Post';
import $ from 'jquery';
import FormSelect from './../forms/FormSelect';
import FormInput from './../forms/Forminput';

import CloseIcon from '@material-ui/icons/Close';

function Profile({ user }) {
    const { username, uid } = useParams();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const [scroll, setScroll] = React.useState('paper');
    const [imageUrl, setImageUrl] = useState('');
    const history = useHistory('');
    const [progress, setProgress] = useState(0);
    const [posts, setPosts] = useState([]);
    const [profileUserData, setProfileUserData] = useState();
    const [bio, setBio] = useState('');
    const [bioPresent, setBioPresent] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');



    var currentUser = firebase.auth().currentUser;


    const handleClickOpen2 = (scrollType) => () => {
        setOpen2(true);
        setScroll(scrollType);
    };
    const handleClickOpen3 = (scrollType) => () => {
        setOpen3(true);
        setScroll(scrollType);
    };

    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot((doc) => {
            setProfileUserData(doc.data());
        });
    }, [])

    if (profileUserData !== undefined) {
        if (profileUserData?.displayName !== user?.displayName) {
           

        } else {
        }
    }
    const handleChange = (e) => {
        setImageUrl(e.target.files[0]);
    };

    const uploadFileWithClick = () => {
        document.getElementsByClassName('inputImage1')[0].click();
    }

    document.title = `${username} `

    const myAccount = username === user.displayName;

    const handleClose = () => {
        setOpen(false);
        setImageUrl("");
    };
    const handleClose2 = () => {
        setOpen2(false);
        setImageUrl("");
    };
    const handleClose3 = () => {
        setOpen3(false);
        setImageUrl("");
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
    const descriptionElementRef2 = React.useRef(null);
    React.useEffect(() => {
        if (open2) {
            const { current: descriptionElement } = descriptionElementRef2;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open2]);
    const descriptionElementRef3 = React.useRef(null);
    React.useEffect(() => {
        if (open3) {
            const { current: descriptionElement } = descriptionElementRef3;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open3]);

    useEffect(() => {
        if (imageUrl !== '') {
            setOpen(true)
        }
    }, [imageUrl])

    const handleUpload = (event) => {

        document.getElementsByClassName('progress1')[0].style.display = 'block';
        event.preventDefault();
        const uploadTask = storage.ref(`profileImages/${user.uid}`).put(imageUrl);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("profileImages")
                    .child(user.uid)
                    .getDownloadURL()
                    .then(url => {
                        currentUser.updateProfile({
                            photoURL: url
                        }).then(function () {
                            db.collection('users').doc(uid).update({
                                photoURL: url
                            }).then(function () {
                                handleClose();
                                setProgress(0);

                                window.location.href = `/`
                            })
                        })
                    })
            }
        )
    }

    const addBio = () => {
        $('.bio1')[0].style.display = 'none';
        $('.bioFields1')[0].style.display = 'flex';
    }

    const collapseBio = () => {
        $('.bio1')[0].style.display = 'block';
        $('.bioFields1')[0].style.display = 'none';
    }

    const bioSet = (e) => {
        setBio(e.target.value)
        if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
            $('.saveButton1')[0].style.backgroundColor = '#3A3B3C';
            $('.saveButton')[0].style.opacity = 0.4;
        } else {
            $('.saveButton1')[0].style.opacity = 1;
            $('.saveButton1')[0].style.backgroundColor = '#2D88FF';
        }
    }

    const bioUpdate = () => {
        if (101 - bio.length < 0 || bio.length === 0) {
            return;
        } else {
            db.collection('users').doc(uid).update({
                bio: bio
            }).then(
                alert("Pleased reload the page to see your changes")
            )
        }
    }

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);


   

    return (
        profileUserData ?(
            <>
        <div className="profile1">
            <Dialog
                open={open3}
                onClose={handleClose3}
                scroll={scroll}
            >
                <div class="makeStyles-paper-1">
                    <div class="modalInit">
                        <h1 style={{color: "rgba(0, 0, 0, 0.516)"}}>Request Invoice</h1>
                        <CloseIcon class="closeModalIcon" onClick={handleClose3} />
                    </div>
                    <div class="hr2" />
                    <div class="profileHead">
                        <img src={profileUserData?.photoURL} className="Avatar" />
                        <h1>{user?.displayName}</h1>
                    </div>
                    <div class="inputForUpload">
                        
                        <FormInput
              label="Enter your name"
              value={name}
            onChange={(e) => setName(e.target.value)} type="text"  
            required/>
            <input onChange={handleChange} type="file" accept="image/*" className='four' />
            <FormInput
              label="Enter email number"
              value={email}
            onChange={(e) => setEmail(e.target.value)} type="text"  
            required/>
            

            

           

                    

                    
                 
            </div>
                   
                    
                   


                    
                    <button onClick={handleUpload}   type="submit" >Send</button>

                </div>
            </Dialog>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                className="dialog2"
            >
                <div class="makeStyles-paper-1">
                    <div class="profileHead2">
                        <p style={{color: "gray", maxWidth: "100%"}}>Are you sure you want to change your profile picture ? Changes cannot be reverted </p>
                        <progress value={progress} max="100" style={{ display: 'none' }} className="progress1" />
                        <div className="buttons">
                            <button onClick={handleUpload}>Yes</button>
                            <button onClick={handleClose}>No</button>
                        </div>
                    </div>
                </div>
            </Dialog>
            <div className="profile__topSection1">
                <div className="profile__coverPhoto1">
                    <img onClick={uploadFileWithClick} src={profileUserData?.photoURL} className="profileAvatar3" />
                    <input onChange={handleChange} type="file" accept="image/*" className='inputImage1' />
                </div>

                <h1 style={{color: "orange"}} id="documentUsername"><p style={{color: "black"}}>Username </p>{user.displayName}</h1>
                <h1 style={{color: "orange"}}  id="documentUsername"><p style={{color: "black"}}>Email </p>{user.email}</h1>
             
                <Dialog
                open={open2}
                onClose={handleClose2}
                scroll={scroll}
                className="dialog2"
                style={{maxWidth :"100%"}}
            >
                <div  class="makeStyles-paper-1">
                <h1 style={{color: "orange"}} id="documentUsername"><p style={{color: "black"}}>Username </p>{user.displayName}</h1>
                <h1 style={{color: "orange"}}  id="documentUsername"><p style={{color: "black"}}>Email </p>{user.email}</h1>

                <center><ProfileSidebar username={username}/></center>
                </div>
            </Dialog>
            <center><button onClick={handleClickOpen2('body')}>Check Full Profile</button></center>
            

                {/* <p className="bioText"></p>
                <p onClick={addBio} className="bio1">Add Bio</p>
                <div className="bioFields1">
                    <textarea value={bio} placeholder="Describe who you are" onChange={bioSet} className="bioInput1" />
                    <p>{`${101 - bio.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapseBio} >Cancel</button>
                        <button onClick={bioUpdate} className="saveButton1">Save</button>
                    </div>
                </div> */}


                <div className="profileHeader__options1">
                    <div className="profileHeader__left1">
                        
                    </div>
                </div>
            </div>
            {/* <div className="postsAndIntro">
                <ProfileSidebar username={username} />
                <div className="postAndWatch">
                    {
                        username === user?.displayName ? (
                            <ImageUpload username={username} />
                        ) : (
                                console.log()
                            )
                    }
                    {
                        posts.map(({ id, post }) => (
                            post.username !== username ? (
                                console.log()
                            ) : (
                                < Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} noLikes={post.noLikes} postUserId={post.uid} />
                                )
                        ))
                    }
                </div>
            </div> */}
        </div >
        </>
        ):(
            <h1>Account no longer exist</h1>
        )
    )
}

export default Profile