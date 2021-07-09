import React, { useState, useEffect } from 'react';
import Adminreports1 from './../../components/Adminreports1';
import FormInput from './../forms/Forminput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
// import LoadMore from './../../components/LoadMore';
// import CKEditor from 'ckeditor4-react';
import './style.scss';
import {auth} from "../../firebase";
import  {db} from '../../firebase';

function Adminreports() {




  


    const {currentUser} = auth
    const [posts, setPosts]= useState([]);
    useEffect(() => {
      if (currentUser) {
        db.collection('reports').orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
         console.log(snapshot)
           setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
           

       }
       )
      }
    }, [currentUser]);

  return (
      
    <div className="admin">

      <div className="callToActions">
        
              
            
            <div className="recommendedvideos__videos">
           
            {posts.map((post) => (
                
            <Adminreports1
            //   key={post.data.auth.uid}
                reporterId={post.data.sentPersonId}
                reportedId={post.data.reportedPersonId}
              reporterProfile={post.data.sentPersonPhoto}
              reportedProfile={post.data.reportedPersonPhoto}
              reporterUsername={post.data.sentPersonUsername}
              reportedUsername={post.data.reportedPersonUsername}
              message={post.data.text}
              reporterEmail={post.data.sentPersonEmail}
              reportedEmail={post.data.reportedPersonEmail}
              id={post.id}
              timestamp={post.data.timestamp}




              
              
             /> 
              
            ))}
             
            </div>

          
      </div>





    </div>
  );
}

export default Adminreports;