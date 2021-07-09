import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import './style.css';
import {db} from "./../../firebase";
import {auth} from "./../../firebase";

import { Avatar, Badge } from '@material-ui/core';


function Adminhome({user}) {
    let { id } = useParams();
    const [users, setUserCount]= useState(0);
    const [products, setProductCount]= useState(0);
    const [reports, setReportCount]= useState(0);
    const [totalPrice, setTotalPrice] = useState(0)

    const [messages, setMessageCount]= useState(0);
    const {currentUser} = auth

    useEffect(() => {
         db.collection('reports').where("read", "==",false)
        .onSnapshot(snapshot => (
            setMessageCount(snapshot.docs.length)
        ))
    }, []);

    useEffect(() => {
        db.collection('users').where("read", "==",true)
       .onSnapshot(snapshot1 => (
        setUserCount(snapshot1.docs.length)
       ))
    }, []);
    useEffect(() => {
        db.collection('posts').where("read", "==",true)
       .onSnapshot(snapshot2 => (
        setProductCount(snapshot2.docs.length)
       ))
    }, []);
    useEffect(() => {
        db.collection('reports')
       .onSnapshot(snapshot3 => (
        setReportCount(snapshot3.docs.length)
       ))
    }, []);
    useEffect(() => {
      db.collection('posts').where("read", "==",true)
     .onSnapshot(snapshot2 => {
      setProductCount(snapshot2.docs.length)
      let total = 0
      snapshot2.docs.forEach(doc => {
          total += Number(doc.data().price)
      })
      setTotalPrice(total)
     })
  }, []);

    return (
        <div className="adminhome1">
        <h3 style={{color: "orange"}}>Hello Admin</h3>
<div className="adminhome">
<div class="container bootstrap snippet">
<div class="row3">
<div class="col-lg-2 col-sm-6" style={{maxWidth: "100%",background: "orange"}}>
<div class="circle-tile ">
<div class="circle-tile-content ">
<div class="circle-tile-description text-faded" style={{color: "white"}}> Users</div>
<div class="circle-tile-number text-faded " style={{color: "white"}}>{users}</div>
<Link to="/adminusers">
<a class="circle-tile-footer" style={{color: "white"}}>More Info<i class="fa fa-chevron-circle-right"></i></a>
</Link>
</div>
</div>
</div>
<div class="col-lg-2 col-sm-6" style={{maxWidth: "100%",background: "orange"}}>
<div class="circle-tile ">
<div class="circle-tile-content ">
<div class="circle-tile-description text-faded" style={{color: "white"}}> Products</div>
<div class="circle-tile-number text-faded " style={{color: "white"}}>{products}</div>
<Link to="/adminproducts">
<a class="circle-tile-footer" style={{color: "white"}}>More Info<i class="fa fa-chevron-circle-right"></i></a>
</Link>
</div>
</div>
</div>
<Badge badgeContent={messages} color="error" />

<div class="col-lg-2 col-sm-6" style={{maxWidth: "100%",background: "orange"}}>
<div class="circle-tile ">
<div class="circle-tile-content ">
<div class="circle-tile-description text-faded" style={{color: "white"}}> Reports</div>
<div class="circle-tile-number text-faded " style={{color: "white"}}>{reports}</div>
<Link to="/adminreports">
<a class="circle-tile-footer" style={{color: "white"}}>More Info<i class="fa fa-chevron-circle-right"></i></a>
</Link>
</div>
</div>
</div>


<div class="col-lg-2 col-sm-6" style={{maxWidth: "100%",background: "orange"}}>
<div class="circle-tile ">
<div class="circle-tile-content ">
<div class="circle-tile-description text-faded" style={{color: "white"}}> Total Cost of Available Products</div>
<div class="circle-tile-number text-faded " style={{color: "white"}}>Ksh {totalPrice}</div>
<a class="circle-tile-footer" href="#"><i class="fa fa-chevron-circle-right"></i></a>
</div>
</div>
</div>
</div>


</div> 
</div>  

</div>

    )
}

export default Adminhome
