import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZVnUH-6QGhvIzo83lnjDSdQRRgP0g1VY",
  authDomain: "garbages4-4abc7.firebaseapp.com",
  projectId: "garbages4-4abc7",
  storageBucket: "garbages4-4abc7.appspot.com",
  messagingSenderId: "405024010058",
  appId: "1:405024010058:web:b3d8ceaa283a1c5dc2dbb3",
  measurementId: "G-1RNKYPZGE3"
};
  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db};
  export  {auth};
  export  {storage};