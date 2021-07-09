import react,{useEffect,useState} from 'react';
import './style.scss';
import {db} from './../../firebase';
import {auth} from './../../firebase';
import {useParams} from 'react-router-dom'



function Admin({user}) {
    const [invoices, setInvoiceCount]= useState(0);
    const [products, setProductCount]= useState(0);
    const [totalPrice, setTotalPrice] = useState(0)
    const [profileUserData, setProfileUserData] = useState();

const {currentUser} = auth;

const { username, id } = useParams();

    

useEffect(() => {
    db.collection('invoices').where("toId", "==", auth.currentUser.uid).where("read", "==",true)
   .onSnapshot(snapshot1 => (
    setInvoiceCount(snapshot1.docs.length)
   ))
}, []);
useEffect(() => {
    db.collection('posts').where("uid", "==", auth.currentUser.uid).where("read", "==",true)
   .onSnapshot(snapshot2 => {
    setProductCount(snapshot2.docs.length)
    let total = 0
    snapshot2.docs.forEach(doc => {
        total += Number(doc.data().price)
    })
    setTotalPrice(total)
   })
}, []);
useEffect(() => {
    db.collection('users').doc(id).onSnapshot((doc) => {
        setProfileUserData(doc.data());
    });
}, [])

if (profileUserData !== undefined) {
    if (profileUserData?.displayName !== user?.displayName) {
       

    } else {
    }
}

    return(
        profileUserData ?(
            <>
        <div>
            <center><h1 style={{background: "orange",color:"white"}}>My Account Summary</h1></center>
       
   
    <div>
	<div className="row3">
		<div className="table-responsive table-bordered movie-table">
            <table class="table movie-table">
                  <thead>
                  <tr className= "movie-table-head">
                      <th></th>
                      <th></th>
                      <th></th>   
                      <th style={{color:"orange"}}>Total</th>
                  </tr>
                  
              </thead>   
              <tbody>
                  
                <tr style={{background: "orange",color:"white"}} className= "dark-row">
                    <td >Invoices Received</td>
                    <td> <span style={{color:"green",background: "orange"}}></span></td>
                    <td></td>
                    <td>{invoices}</td>                                       
                </tr>
               
                <tr style={{background: "white",color:"orange"}} className="light-row">
                    <td>Products Posted</td>
                    <td> <span style={{color:"green"}}></span></td>
                    <td></td>
                    <td>{products}</td>                                       
                </tr>
                
                <tr style={{background: "orange",color:"white"}} className = "dark-row">
                    <td>Amount</td>
                    <td> <span style={{color:"green"}}></span></td>
                    <td></td>
                    <td>Ksh {totalPrice}</td>                                       
                </tr>
                
                
                
                
  
              </tbody>
            </table>
            
            </div>
            
	</div>
    
</div>

{/* <button onClick={() => setInvoiceCount(invoices + 1)}>Increment</button> */}
        </div>
        </>
        ):(
            <h1>Account no longer exist</h1>
        )
        
    )
}

export default Admin;