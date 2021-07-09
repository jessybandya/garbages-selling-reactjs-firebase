import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './style.css';
import {auth} from './../../firebase';
import {useHistory} from 'react-router-dom';
import LoginHeader from './../../components/LoginHeader';



function Login() {
    const {currentUser} = auth
    const [email, setEmail] = useState('');
    const history = useHistory('');
    const [password, setPassword] = useState('');
    

    const login = (e)=> {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
        .then((auth) =>{
          history.push(`/`); 
        })
        .catch((e) =>{
            if (
                e.message ===
                "The password is invalid or the user does not have a password."
            ) {
                alert("The password is invalid or the user does not have a password");
            } else if (
                e.message ===
                "There is no user record corresponding to this identifier. The user may have been deleted."
            ) {
                history.push("/register");
                window.scrollTo({
                    top: document.body.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                });
            }
        })
    }
    return (
        <>
                    <LoginHeader />

        <div className="login">
            <div className="login__container">
              <h3>Log in </h3>
              <form>
                  <center>
                  <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email Address" />

                  </center>
                  <center>
                  <input onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="Password" />

                  </center>
                  <center>
                  <button onClick={login} type="submit" className="login__button">
                    Log In
                  </button>
                  </center>
                  
                  <center>
                      <hr />
                   </center>
                   <center>
                       <Link to="/register">
                           <button type="submit" className="login__button1">Create New Account</button>
                       </Link>
                  </center>
              </form>
            </div>
            
        </div>
        </>
    )
}

export default Login
