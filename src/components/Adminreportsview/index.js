import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import FormInput from './../forms/Forminput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
// import LoadMore from './../../components/LoadMore';
// import CKEditor from 'ckeditor4-react';
import './style.scss';
import {auth} from "../../firebase";
import {db} from '../../firebase';

function Adminreportsview({user}) {

    let { id } = useParams();
    let { username } = useParams();


  
    const [post, setPost]= useState([]);


    const {currentUser} = auth
    useEffect(() => {
        db.collection('reports').doc(id).get().then(
            snapshot => setPost(snapshot.data())
        ).catch(
        )
        
     
    }, []);
    const [posts, setPosts]= useState([]);
    useEffect(() => {
      //   db.collection('messages').where('chat', '==', post).orderBy('timestamp', 'asc').get().then(snapshot => {
      //       console.log(snapshot)
      //       setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
      //   }).catch(error => {
      //       console.error(error)
      //   })
      const unsub= db.collection('reports').where('read', '==', false).where("sentPersonUsername", "==", username).orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            console.log(snapshot)
            let messages = []
            snapshot.forEach(doc => {
                messages.push({id:doc.id, data:doc.data()})
                doc.ref.update({read:true})
            })
            setPosts(messages)
        }, error => console.error(error))
        return function cleanup () {
            unsub()
        }

    }, []);

  return (
      
    <div className="admin">

      <div className="callToActions">
        
              
            
            <div className="recommendedvideos__videos">
           
            
                <>
            
<div  className="videoCard">
            
            <img className="videoCard__thumbnail" src={post.sentPersonPhoto} alt={post.sentPersonPhoto} />
            <div className="videoCard__info">
        <Avatar className="videoCard__avatar"  src={post.sentPersonPhoto}/>                  
             <div className="videoCard__text">
                 
             <h4><p>Reporter Username: {post.sentPersonUsername}</p> </h4>                
              <h4><p>Reporter Email: {post.sentPersonEmail}</p> </h4>  
              <h4><p>Reporter Complaint: {post.text}</p> </h4>   
 
                       
                 </div>  
                                           
                  </div >

                  <Link to={`/profilewatch/${post.sentPersonUsername}/${post.sentPersonId}`}>
            <button>
                View Profile
            </button>
            </Link>

            <Link to={`/message/${post.sentPersonId}`}>
            <button>
                Message
            </button>
            </Link>
            
        </div>

              
        <div  className="videoCard">
            
            <img className="videoCard__thumbnail" src={post.reportedPersonPhoto} alt={post.reportedProfile} />
            <div className="videoCard__info">
        <Avatar className="videoCard__avatar"  src={post.reportedPersonPhoto}/>                  
             <div className="videoCard__text">
                 
             <h4><p>Reported Username: {post.reportedPersonUsername}</p> </h4>                
              <h4><p>Reported Email: {post.reportedPersonEmail}</p> </h4>  
 
                       
                 </div>  
                                           
                  </div >

           
                  <Link to={`/profilewatch/${post.reportedPersonUsername}/${post.reportedPersonId}`}>
            <button>
                View Profile
            </button>
            </Link>
            <Link to={`/message/${post.reportedPersonId}`}>
            <button>
                Message 
            </button>
            </Link>
            
            
        </div> 
              
            </>  
            
             
            </div>

          
      </div>





    </div>
  );
}

export default Adminreportsview;