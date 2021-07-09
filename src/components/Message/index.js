import React, {useEffect, useState} from 'react';
import './style.css';
import {useParams, Links} from 'react-router-dom';
import {auth} from "../../firebase";
import FormInput from './../forms/Forminput';
import Message1 from './../../components/Message1'
import {db} from '../../firebase';

function Message({user}) {
    const [post, setPost] = useState(null)
    const [toUser, setToUser] = useState(null)
    let { id } = useParams();

    useEffect(() => {
        db.collection('chats').where(`users.${id}`, '==', true).where(`users.${user?.uid}`, '==', true).get().then(
            snapshot => {
                if (snapshot.docs.length >= 1) {
                    setPost(snapshot.docs[0].id)
                } else {
                    db.collection('chats').add({users:{[id]:true, [auth.currentUser.uid]:true}}).then(ref => setPost(ref.id))
                    console.log(snapshot.docs)
                }
            }
        )
        db.collection('users').doc(id).get().then(
            doc => {
                setToUser({id:doc.id, data:doc.data()})
            }
        )
        

    }, []);

    const [ text , setText] = useState("");
    const addTodo = (event) => {
        event.preventDefault();
  
      db.collection('messages').add({
          //
        message: text,
        timestamp:  Date.now(),
        toUsername: toUser.data.displayName,
        toEmail: toUser.data.email,
        toProfile: toUser.data.photoURL,
        chat: post,
        read: false,
        toId: toUser.id,
        fromProfile: user?.photoURL,
        fromId: user?.uid,
        fromEmail:user?.email,
        fromUsername:user?.displayName,
        
      })
        setText("");

      };
      const [posts, setPosts]= useState([]);
      useEffect(() => {
        //   db.collection('messages').where('chat', '==', post).orderBy('timestamp', 'asc').get().then(snapshot => {
        //       console.log(snapshot)
        //       setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
        //   }).catch(error => {
        //       console.error(error)
        //   })
          const unsub = db.collection('messages').where('chat', '==', post).orderBy('timestamp', 'asc').onSnapshot(snapshot => {
              console.log(snapshot)
              let messages = []
              snapshot.forEach(doc => {
                  messages.push({id:doc.id, data:doc.data()})
                  if (doc.data().fromId !== user?.uid) {
                      doc.ref.update({read:true})
                  }
              })
              setPosts(messages)
          }, error => console.error(error))
          return function cleanup () {
              unsub()
          }
      }, [post, text]);
      
  
    return (
        post &&(
            <>
            <div className="message">
                     {posts.map((post) => {
                         if (post.data.fromId === user?.uid) {
                             return (
                                <div style={{display:"flex", justifyContent:"flex-end"}}>
                                    <Message1
                                    messages={post.data.message}
                                    //   displayName={post.data.displayName}
                                    profilePic={post.data.fromProfile}
                                    username={post.data.fromUsername}
                                    uid={post.data.fromId}
                                    user={user}
                                    timestamp={post.data.timestamp}
                                    //   price={post.data.price}
                                    //   image={post.data.image}
                                    //   category={post.data.category}
                                    //   id={post.id}
                                    /> 
                                  </div>
                                )
                         }
                         return (

                            <Message1
                              messages={post.data.message}
                            //   displayName={post.data.displayName}
                              profilePic={post.data.fromProfile}
                              username={post.data.fromUsername}
                              user={user}
                              timestamp={post.data.timestamp}
                            //   price={post.data.price}
                            //   image={post.data.image}
                            //   category={post.data.category}
                            //   id={post.id}
                             /> 
                              
                            )
            } )} 
            </div>
            <form class="form">
                     <div className="form1">
                     <FormInput 
                 type="text"
                 name="report"
                 value={text}
                 placeholder="Type a text"
                 onChange={(e) => setText(e.target.value)} type="text" 
                 className="text" 
                 />
                 
                 <div >
                 <button disabled={!text} type="submit" onClick={addTodo} className="row">
                     Send
                 </button>
                 </div>
                     </div>
                   
            </form> 
            </>
       
    )
    )
}

export default Message
