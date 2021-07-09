import React, {useEffect,useState} from 'react';
import SidebarRow from './../../components/SidebarRow';
import './style.scss';
import HomeIcon from '@material-ui/icons/Home';
import ShareIcon from '@material-ui/icons/Share';
import ShopIcon from '@material-ui/icons/Shop';
import { auth } from './../../firebase';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Avatar, Badge} from '@material-ui/core';

import {Link} from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { db } from './../../firebase';
import MessageIcon from '@material-ui/icons/Message';

function Sidebar ({user}) {
    const {currentUser} = auth;

    const [messageCount, setMessageCount]= useState(0);
    const [cartCount, setCartCount]= useState(0);
    const [invoiceCount, setInvoiceCount]= useState(0);
    const [reports, setReports]= useState(0);


    useEffect(() => {
        db.collection('invoices').where("toId", "==", auth.currentUser.uid).where("read", "==", false)
       .onSnapshot(snapshot => (
        setInvoiceCount(snapshot.docs.length)
       ))
   }, []);
   useEffect(() => {
    db.collection('reports').where("read", "==", false)
   .onSnapshot(snapshot => (
    setReports(snapshot.docs.length)
   ))
}, []);

   useEffect(() => {
    db.collection('messages').where("toId", "==", auth.currentUser.uid).where("read", "==", false)
   .onSnapshot(snapshot => (
       setMessageCount(snapshot.docs.length)
   ))
}, []);

   useEffect(() => {
    db.collection('carts').where("toId", "==", auth.currentUser.uid).where("read", "==", false)
   .onSnapshot(snapshot2 => (
    setCartCount(snapshot2.docs.length)
   ))
}, []);
    return (
        <div className="sidebar">
            {currentUser && (
                <>
            <div className="sibar1">
                <Link to={`/profile/${user?.displayName}/${user?.uid}`}>
                <center><Avatar className="avatar" src={user?.photoURL} /></center>
                </Link>
                <Link to={`/profile/${user?.displayName}/${user?.uid}`}>
            <center><h4 className="title">{user?.displayName}</h4></center>
            </Link>
                <hr/>
                <hr/>            
            </div>
            
            <div className="sibar2">
            <hr />
            <Link  to={`/`}>
            <SidebarRow className="reg" title="Home" Icon={HomeIcon}/>
            </Link>
            <hr/>
            
            <Link  to={`/admin/${user?.uid}`}>
            <SidebarRow className="reg" title="My Account" Icon={PersonOutlineIcon}/>
            </Link>
            <hr/>
            <Link to={`/users/${user?.uid}`}>
            <SidebarRow className="reg" title="Users"Icon={EmailIcon}/>
            </Link>
            <hr/>
            <Link to={`/notifications/${user?.uid}`}>
            <SidebarRow className="reg" badgeCount={invoiceCount}  title="Invoices" Icon={NotificationsIcon}/>
            </Link>
            <hr/>
            <Link to={`/cart/${user?.uid}`}>
            <SidebarRow className="reg" badgeCount={cartCount}  title="My Cart" Icon={ShoppingCartIcon}/>
            </Link>
            <hr/>
            
            
            
        
            </div>
            <div>
            <Link to="/messagepage">
        <SidebarRow className="reg" badgeCount={messageCount}  title="Messages" Icon={MessageIcon}/>
          </Link>
            </div>
            </>
            )}
           {currentUser.uid == "Au3hpt3QDQUNjpC6Moy3CIeYBF42" &&(
      <div className="App_margin1">
<Link to={`/adminhome/${user?.uid}`}>
            <SidebarRow className="reg" badgeCount={reports}  title="Login as Admin" Icon={SupervisorAccountIcon}/>
            </Link>
      </div>
        )}
            


        </div>
    )
}
Sidebar.defaultProps = {
    currentUser: null
}
export default Sidebar
