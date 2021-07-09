import React, { useState, useEffect } from 'react'
import './style.css';
import { db } from './../../../firebase';

function ProfileSidebar({ username }) {
    var [nposts, setNPosts] = useState([])
    const [cuserdata, setCUserdata] = useState()

    useEffect(() => {
        db.collection('posts').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.data().username == username) {
                    if (nposts.length !== 9) {
                        if (!nposts.includes(doc.data().imageUrl)) {
                            nposts.push(doc.data().imageUrl)
                        }
                    }
                }
            })
        })
    }, [])

    useEffect(() => {
        db.collection('users').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.data().displayName == username) {
                    setCUserdata(doc.data())
                }
            })
        })
    }, [])

    return (
        <div className="profileSidebar" >
            <div className="posts2">
                <h1>Intro </h1>
                <div className="intro">
                    {
                        cuserdata?.birthday ? (
                            <div className="introblock">
                                <h1>DOB: {`${cuserdata?.birthday[0]} - ${cuserdata?.birthday[1]} - ${cuserdata?.birthday[2]}`}</h1>
                                <div><h1>GENDER: {`${cuserdata?.gender[0]} `}</h1></div>
                            </div>
                        ) : (
                                console.log()
                            )

                    }
                </div>
            </div>
            
            
        </div >
    )
}

export default ProfileSidebar