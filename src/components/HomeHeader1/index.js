import React, {useEffect, useState} from 'react';
import './style.css';
import {Link, useHistory} from 'react-router-dom';
import { db } from './../../firebase';
import {Avatar, Badge} from '@material-ui/core';
import { auth } from './../../firebase';
import {useStateValue} from './../../StateProvider';
import logo from './../../assets/garbage.jpg';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Brightness4Icon from '@material-ui/icons/Brightness4';

function HomeHeader1({ user, selected }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDown, setProfileDown] = useState(false);
  const history = useHistory("");
   const [{ notifications }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notificationCount, setNotificationCount]= useState(0);
  const [messageCount, setMessageCount]= useState(0);

  const {currentUser} = auth






 


  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().username == user.displayName) {
          db.collection('posts').doc(doc.id).collection('comments').where("toId", "==" ,auth.currentUser.uid).where("read", "==",false).onSnapshot((snapshot2) => {
            snapshot2.docs.map(doc => {
              setNotificationCount(snapshot.docs.length)

              console.log(doc.data())
              if (user && doc.data().username !== user.displayName) {
                dispatch({
                  type: 'ADD_TO_NOTIFICATIONS',
                  item: {
                    notification: doc.data(),
                  },
                });
              }
              
                
              
                  
                
            
              
            });
          })
        }
      });

    });
  }, [user])
 



  

  const logout = () => {
    if (user) {
      auth.signOut();
      history.push("/login");
    }
  }

  
 


  const renderNotifications = () => {
    if (notificationsOpen) {
      setNotificationsOpen(false)
      document.getElementsByClassName('dropdown-content2')[0].classList.remove('block')
    } else { 
      setNotificationsOpen(true)
      setProfileDown(false)
      document.getElementsByClassName('dropdown-content')[0].classList.remove('block');
      document.getElementsByClassName('dropdown-content2')[0].classList.add('block');
     
       
          
          
      }
    
  }

  const renderProfile = () => {
    if (profileDown) {
      setProfileDown(false)
      document.getElementsByClassName('dropdown-content')[0].classList.remove('block');
    } else {
      setProfileDown(true);
      setNotificationsOpen(false)
      document.getElementsByClassName('dropdown-content2')[0].classList.remove('block');
      document.getElementsByClassName('dropdown-content')[0].classList.add('block');
    }
  }

  const collapseNavbar = () => {
    document.getElementsByClassName('homeHeader__logo')[0].style.display = 'block';
    document.getElementsByClassName('homeHeader__searchBack')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].style.display = 'none';
    document.getElementsByClassName('homeHeader__search')[0].style.display = 'block';
    document.getElementsByClassName('dropdown-content3')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].value = ""
  }

  const expandNavbar = () => {
    document.getElementsByClassName('homeHeader__logo')[0].style.display = 'none';
    document.getElementsByClassName('homeHeader__searchBack')[0].style.display = 'block';
    document.getElementsByClassName('homeHeader__search')[0].style.display = 'none';
    document.getElementsByClassName('searchBox')[0].style.display = 'block';
  }

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts !== undefined) {
      const finalUsers = posts.filter(user => {
        return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      })

      setFilteredUsers(finalUsers)
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    document.getElementsByClassName('dropdown-content3')[0].style.display = 'block';
  }

 

  return (
    
    <div class="homeHeader">
      {currentUser && (
    <>
      <div class="homeHeaderLogoAndSearch">
        <Link to="/">
          <img src={logo} class="homeHeader__logo" />
        </Link>
        <div class="homeHeader__searchBack" onClick={collapseNavbar}>
          <KeyboardBackspaceIcon style={{color: "white"}} class="searchBackIcon"/>
        </div>
        <div style={{borderRadius: "45%",height:"30px"}} class="homeHeader__search" onClick={expandNavbar}>
          <SearchIcon class="searchIcon"/>
        </div>
        <input type="text" className="searchBox" placeholder="Search" onChange={updateSearchResults} />
        <div class="dropdown-content3">
          <ul id="list">
            {
              posts !== undefined && (
                filteredUsers.map((user1) => (
                  <li>
                    <a onClick={collapseNavbar} href={`/`}>
                      <Avatar className="searchAvatar" src={user1.imageUrl} />
                      <h3 className="searchH3">{user1.name} </h3>
                    </a>
                  </li>
                ))
              )
            }
          </ul>
        </div>
      </div>

      

      <div class="homeHeader__otherIcons">
        <div class="round profile">
        <Link to={`/profile/${user?.displayName}/${user?.uid}`}>
            <Avatar className="ProfileAvatar" src={user.photoURL} />
            <p>{user.displayName}</p>
          </Link>
        </div>
       

        <div  class="round" style={{background: "orange"}}>
          
        </div>

        <div class="round" onClick={renderNotifications}>
        <Badge badgeContent={0} color="error" >
          <svg viewBox="0 0 28 28" alt="" class={`notificationsIcon ${notificationsOpen && "blue"}`} height="20" width="20"><path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path>
          </svg>
          </Badge>

        </div>
        <div class="dropdown-content2">
          
        {
          
          
            
          
          },
         
        
      
          <h1 style={{color: "white"}}>Notifications</h1>
          

          {
            notifications.length == 0 ? (
              <div className="noNotifDiv">
                
                <img src={user?.photoURL} />
                <h1 className="NoNotif" style={{color: "white"}}>It seems that there are no active notifications</h1>
              </div>
            ) : (
                console.log()
              )
          }
          {
           
             
            notifications.map(({ notification }) => (
              <Link to="/" className="announcement">
                <div class="optionDrop">
                  <Link to={`/profileview/`}>
                  <Avatar src={notification.photoURL} />
                  <div className="announcementInfo">
            <h1 style={{color: "white"}}>{notification.username} <span style={{color: "white"}}>commented to your post. with caption "{notification.text}"</span></h1>
                  </div>
                  </Link>

                </div>
              </Link>
            ))
          }

        </div>
        <div class="round" onClick={renderProfile}>
          <i class={`dropdownIcon ${profileDown && "blue"}`} />
          <div class="dropdown-content" style={{background: "orange",border: "2px solid white"}}>
            <Link to={`/profile/${user?.displayName}/${user?.uid}`}>
              <div class="optionDrop" >
                <img src={user?.photoURL} class="Avatar" />
                <div class="sideinfoDropAvatar" >
                  <h1>{user?.displayName}</h1>
                  <p style={{color: "white"}}>See your profile</p>
                </div>
              </div>
            </Link>
            <div class="hr" />
            <a href="#">
              <div class="optionDrop">
                <div class="iconDrop" style={{background: "white", borderRadius: "46%"}}>
                  <DynamicFeedIcon  class="feedback"/>
                </div>
                <div class="sideinfoDrop">
                  <h1>Give Feedback</h1>
                  <p>Help us improve the new Facebook</p>
                </div>
              </div>
            </a>
            <div class="hr" />
            <a href="#">
              <div class="optionDrop">
                <div class="iconDrop" style={{background: "white", borderRadius: "46%"}}>
                  <SettingsIcon class="settings"/>
                </div>
                <h1 style={{color: "white"}}>Settings & Privacy</h1>
              </div>
            </a>
            
            <a href="#">
              <div class="optionDrop">
                <div class="iconDrop" style={{background: "white", borderRadius: "46%"}}>
                  <Brightness4Icon class="darkMode"  />
                </div>
                <h1 style={{color: "white"}}>Dark Mode</h1>
              </div>
            </a>
            <a href="#">
              <div onClick={logout} class="optionDrop">
                <div class="iconDrop" style={{background: "white", borderRadius: "46%"}}>
                  <PowerSettingsNewIcon class="logout"/>
                </div>
                <h1 style={{color: "white"}}>Log out</h1>
              </div>
            </a>
          </div>
        </div>
      </div>
      </>
    )}
    {!currentUser && (
                <>
                <div class="homeHeaderLogoAndSearch">
        <Link to="/">
          <img src={logo} class="homeHeader__logo" />
        </Link>
        
        
        
      </div>

      

      <div class="homeHeader__otherIcons">
        
        <div style={{marginRight: "30px"}}>
          <Link to="/register">
            <h3 style={{color: "white"}}>Register</h3>
          </Link>
        </div>
        <div>
          <Link to="/login">
          <h3 style={{color: "white"}}>Login</h3>
          </Link>
        </div>
       

      </div>
                </>
    )}
    </div >
    
    
  );
}



export default HomeHeader1
