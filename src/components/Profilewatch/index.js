import React, { useState, useEffect } from 'react'
import './style.css';
import { useParams,Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { storage, db, auth } from '../../firebase';
import firebase from "firebase";
import { useHistory } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import ImageUpload from '../Feeds/ImageUpload';
import Header from './../../components/HomeHeader1';
import Sidebar from './../../components/Sidebar2';
import FormSelect from './../forms/FormSelect';
import FormInput from './../forms/Forminput';

import CloseIcon from '@material-ui/icons/Close';

import Post from '../Posts/Post';
import $ from 'jquery';

function Profile({ user }) {
    const { username, uid } = useParams();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [scroll, setScroll] = React.useState('paper');
    const [imageUrl, setImageUrl] = useState('');
    const history = useHistory('');
    const [progress, setProgress] = useState(0);
    const [posts, setPosts] = useState([]);
    const [profileUserData, setProfileUserData] = useState();
    const [bio, setBio] = useState('');
    const [bioPresent, setBioPresent] = useState(false)
    const [text, setText] = useState("");
    const requestInvoice = () => {
        db.collection('reports').get().then(
          snap => {
            if (snap.docs.length > 0) {
              alert("This product has already been invoiced")
            } else {
              setOpen(false)
            }
          }
        )
      }

    var currentUser = firebase.auth().currentUser;


    

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClickOpen1 = (scrollType) => () => {
        setOpen1(true);
        setScroll(scrollType);
    };

    


    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot((doc) => {
            setProfileUserData(doc.data());
        });
    }, [])

    if (profileUserData !== undefined) {
        if (profileUserData?.displayName !== user?.displayName) {
            // document.getElementsByClassName('profileAvatar1')[0].style.cursor = 'context-menu';
            // document.getElementsByClassName('bio1')[0].style.display = 'none';
            // document.getElementById('documentUsername1').style.marginBottom = '20px';

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
    const handleClose1 = () => {
        setOpen1(false);
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
    const descriptionElementRef1 = React.useRef(null);
    React.useEffect(() => {
        if (open1) {
            const { current: descriptionElement } = descriptionElementRef1;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open1]);
    useEffect(() => {
        if (imageUrl !== '') {
            setOpen(true)
        }
    }, [imageUrl])


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
    const handleUpload = (event) => {
            
        event.preventDefault();
        
            db.collection("reports").add({
                text: text,
timestamp:  Date.now(),
reportedPersonPhoto: profileUserData?.photoURL,
reportedPersonId: profileUserData?.uid,
reportedPersonEmail:profileUserData?.email,
reportedPersonUsername: profileUserData?.displayName,

sentPersonPhoto: user?.photoURL,
sentPersonId: user?.uid,
sentPersonEmail:user?.email,
sentPersonUsername: user?.displayName,
read: false
            }).then(ref => alert("Report submitted successfully to the admin"))
            setText("");
            
        
    

}


   

    return (
        profileUserData ?(
        <>
        
        <Header user={user}/>
        <div className="home">
            <Sidebar user={user}/>
        <div className="profile1">
        <Dialog
                open={open1}
                onClose={handleClose1}
                scroll={scroll}
                className="dialog2"
            >
                   <div class="imageView">
                    
                   <img  src={profileUserData?.photoURL}  />
                </div>
            </Dialog>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                className="dialog2"
            >
                   <div class="makeStyles-paper-1">
                    <div class="modalInit">
                        <center><h1 style={{color: "rgba(0, 0, 0, 0.516)"}}>Report Client</h1></center>
                        <CloseIcon class="closeModalIcon" onClick={handleClose} />
                    </div>
                    <div class="hr2" />
                    <div class="profileHead">
                        <img src={user?.photoURL} className="Avatar" />
                        <h1>{user?.displayName}</h1>
                    </div>
                    <div class="inputForUpload">
                        
                        <FormInput
              label="Write your complaint in summury"
              value={text}
            onChange={(e) => setText(e.target.value)} type="text"  
            required/>
            

            

           

                    

                    
                 
            </div>
                   
                    
                   


                    
                    <button onClick={handleUpload} type="submit" >Send</button>

                </div>
            </Dialog>
            <div className="profile__topSection1">
                <div className="profile__coverPhoto1">
                     <center>                    <img  src={profileUserData?.photoURL} onClick={handleClickOpen1('body')} className="profileAvatar1" />
</center>
                    <input onChange={handleChange} type="file" accept="image/*" className='inputImage1' />
                </div>
                    
                
                <center style={{marginTop: "20px",cursor: "pointer"}}> {profileUserData.uid != "Au3hpt3QDQUNjpC6Moy3CIeYBF42" &&(<button value={text}  onClick={handleClickOpen('body')}>Report User</button>)}  <Link to={`/message/${profileUserData?.uid}`}><button>Message</button></Link></center>

                <h1 style={{color: "orange"}} id="documentUsername"><p style={{color: "black"}}>Username </p>{profileUserData?.displayName}</h1>
                <h1 style={{color: "orange"}}  id="documentUsername"><p style={{color: "black"}}>Email </p>{profileUserData?.email}</h1>
                <h1 id="documentUsername"><p><ProfileSidebar username={username} /></p></h1>

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
                <hr />
                <div className="second1">
            <center><h1 style={{color: "orange"}}>Products Owned</h1></center> 
            </div>
            <hr />
            <div>

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
            </div>
           
            
        
        </div >
        
       
        </div>
        </>
        ):(
            <h1>The user no longer exist</h1>
        )
    )
}

export default Profile