import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import { storage, db, auth } from './../../../firebase';
import firebase from "firebase";
import './style.css';
import FormSelect from './../../forms/FormSelect';
import FormInput from './../../forms/Forminput';

import CloseIcon from '@material-ui/icons/Close';

function ImageUpload() {

    const user = firebase.auth().currentUser;
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [noLikes, setNoLikes] = useState(0);
    const [scroll, setScroll] = React.useState('paper');
    const [input, setInput] = useState("");
    const [price, setPrice] = useState("");
    const [cat, setCat] = useState("");
    const [size, setSize] = useState("");

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
        setOpen(true);
        setScroll(scrollType);
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

    const handleUpload = (event) => {
        if (document.getElementsByClassName('hidden')[0]) {
            document.getElementsByClassName('hidden')[0].classList.remove('hidden');
        }
        document.getElementsByClassName('postButton').disabled = true;
        document.getElementsByClassName('postButton')[0].classList.add('disabled');

        if (caption == "" && imageURL == "") {
            console.log("Prevented Access to Photo or Caption Submission")
        } else {
            event.preventDefault();
            if (imageURL == '') {
                db.collection("posts").add({
                    timestamp: Date.now(),
                    caption: caption,
                    imageUrl: "",
                    name: input,
                    size:size,
                    category: cat,
                    price: price,
                    read: true,
                    noLikes: noLikes,
                    username: user?.displayName,
                    uid: user?.uid,
                    photoURL:user?.photoURL
                });
                handleClose();
                setProgress(0);
                setCaption("");
                setInput("");
      setCat("");
      setPrice("");
      setSize("")
                
                setImage(null);
            } else {
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then(url => {
                                db.collection("posts").add({
                                    timestamp: Date.now(),
                                    caption: caption,
                                    imageUrl: url,
                                    noLikes: noLikes,
                                    username: user?.displayName,
                                    uid: user?.uid,
                                    photoURL:user?.photoURL,
                                    name: input,
                                     price: price,
                                     size:size,
                                     category: cat,
                                         read: true,
                                });
                                handleClose();
                                setProgress(0);
                                setCaption("");
                                setInput("");
      setCat("");
      setPrice("");
      setSize("");

                                setImage(null);
                            })
                    }
                )
            }
        }

    }

    return (
        <div className="imageupload">
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
            >
                <div class="makeStyles-paper-1">
                    <div class="modalInit">
                        <h1 style={{color: "rgba(0, 0, 0, 0.516)"}}>Add Product</h1>
                        <CloseIcon class="closeModalIcon" onClick={handleClose} />
                    </div>
                    <div class="hr2" />
                    <div class="profileHead">
                        <img src={user?.photoURL} className="Avatar" />
                        <h1>{user?.displayName}</h1>
                    </div>
                    <div class="inputForUpload">
                        
                        <input onChange={handleChange} type="file" accept="image/*" className='four' />
                        <FormSelect
              label="Category"
              
              options={[{
                value: "",
                name: ""
              },
              {
                value: "solid",
                name: "Solid"
              }, {
                value: "liquid",
                name: "Liquid"
              }]}              onChange={(e) => setCat(e.target.value)} type="text" 
            />

            <FormInput
              label="Name"
              value={input}
            onChange={(e) => setInput(e.target.value)} type="text"  
            />

            

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={[price]}
            onChange={(e) => setPrice(e.target.value)} 
            />
  <FormInput
              label="Quantity in kgs"
              value={size}
            onChange={(e) => setSize(e.target.value)} type="text"  
            />
                    

                    
                        <FormInput
              label="Description"
              value={caption}
            onChange={(e) => setCaption(e.target.value)} type="text"  
            />
            </div>
                    <div class={`previewImage ${!image && "vanish"}`}>
                        <img src={imageURL} className="previewImaage" />
                    </div>
                    <div class="right">
            <div className="publishOptions">
                        <div class="left">
                            <center><h3 style={{cursor: "pointer"}} onClick={uploadFileWithClick} >Select your picture here </h3></center>
                        </div>
                        
                        
                            
                           
                        </div>
                    </div>
                   

                    <progress value={progress} className="hidden" max="100" />

                    
                    <button onClick={handleUpload} type="submit" class={`postButton ${caption.length < 1 && "disabled"} ${imageURL != "" && "visible"}`}>Post</button>
                </div>
            </Dialog>

            <div class="imageupload__container">
                <div class="postArea">
                    <img src={user?.photoURL} class="Avatar" />
                    <input style={{cursor: "pointer"}} value={caption} onClick={handleClickOpen('body')} placeholder={`Click here to post a product`} />
                    
                </div>
                <div class="hr" />
                <div class="options">
                    
                    
                    
                </div>
            </div>
        </div>
        //Are you ready to build the most updated Facebook Version using React JS and Firebase ? You are in the right course. The only pre-requisite is the previous course which is Facebook Clone V1. So, whenever you are ready, click that enroll button to enroll for this course !
    )
}

export default ImageUpload