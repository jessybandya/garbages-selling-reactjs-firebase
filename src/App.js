import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Link,Switch, Redirect} from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import Login from './components/Login';
import Register from './components/Register';
import HomeHeader from './components/HomeHeader1';
import Home from './components/Home';
import Profile1 from './components/Profile1';
import Myprofile from './components/Myprofile';
import Messagepage from './components/Messagepage2';
import Users from './components/Users';


import Message from './components/Messageview';
import Invoiceview from './components/Invoiceview';

import Profileview from './components/Profileview';
import Postview from './components/Postview';
import Profilewatch from './components/Profilewatch';



import {auth} from './firebase';
import CartView from './components/CartView';
import Adminview from './components/Adminview';
import Admincreate from './components/Adminlogin';
import Adminhomeview from './components/Adminhomeview';
import Adminusersview from './components/Adminusersview';
import Adminproducts from './components/Adminproducts';
import Adminproductsview from './components/Adminproductsview';
import Adminreports from './components/Adminreports';
import Adminreportsview1 from './components/Adminreportsview1';
import Adminreportsview from './components/Adminreportsview2';











function App() {

  const [user, setUser] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(false);
      }
    })
  }, [])
  
  
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            
            <Route exact path="/">
              <Home user={user} selected/>
            </Route>
            
            <Route path="/profile/:username/:uid"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Myprofile user={user}/>   
                 
           )}/>  
            <Route path="/profilewatch/:username/:uid"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Profilewatch user={user}/>   
                 
           )}/>  
            {/* <Route path="/profile/:user/:id">
              <Myprofile user={user} />
            </Route> */}

<Route path="/messagepage"
render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
  <Messagepage user={user}/>   
     
)}/>  
            <Route path="/profileview/:uid"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Profileview user={user}/>   
                 
           )}/>  
            <Route path="/message/:id"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Message user={user}/>   
                 
           )}/>  
            <Route path="/postview/:id"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Postview user={user}/>   
                 
           )}/>  
            <Route path="/users/:id"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Users user={user}/>   
                 
           )}/>  
            <Route path="/cart/:id"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <CartView user={user}/>   
                 
           )}/>  
            <Route path="/notifications/:id"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Invoiceview user={user}/>              
                 
           )}/>  
            <Route path="/admin/:id"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Adminview user={user}/>

              
                 
           )}/>  
            
            
            <Route path="/adminhome/:id"
            render={ () =>auth.currentUser.uid !=="Au3hpt3QDQUNjpC6Moy3CIeYBF42" ? (<Redirect to="/" /> ,alert("You are not an admin") )  : (
            <Adminhomeview user={user}/>
              
        )}
            />
            <Route path="/adminusers"
            render={ () =>auth.currentUser.uid !=="Au3hpt3QDQUNjpC6Moy3CIeYBF42" ? (<Redirect to="/" /> ,alert("You are not an admin") )  : (
            <Adminusersview user={user}/>
              
        )}
            />
          
            <Route path="/adminproducts"
            render={ () =>auth.currentUser.uid !=="Au3hpt3QDQUNjpC6Moy3CIeYBF42" ? (<Redirect to="/" /> ,alert("You are not an admin") )  : (
            <Adminproductsview user={user}/>
              
        )}
            />
            
            <Route path="/adminreports"
            render={ () =>auth.currentUser.uid !=="Au3hpt3QDQUNjpC6Moy3CIeYBF42" ? (<Redirect to="/" /> ,alert("You are not an admin") )  : (
            <Adminreportsview1 user={user}/>
              
        )}
            />
            <Route path="/adminreportsview2/:username/:id"
            render={ () =>auth.currentUser.uid !=="Au3hpt3QDQUNjpC6Moy3CIeYBF42" ? (<Redirect to="/" /> ,alert("You are not an admin") )  : (
            <Adminreportsview user={user}/>
              
        )}
            />
              
            <Route path="/adminhome">
            <Admincreate user={user}/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;


