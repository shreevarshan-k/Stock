import firebase from "firebase";
import "firebase/database";




  var firebaseConfig = {
    apiKey: "AIzaSyDS82UCnH90Z-F9j5MucA0SGHh_45DAR4M",
    authDomain: "stock-5230f.firebaseapp.com",
    projectId: "stock-5230f",
    storageBucket: "stock-5230f.appspot.com",
    messagingSenderId: "514428055013",
    appId: "1:514428055013:web:31ffed1c1444734003930c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const firebaseDb=firebase

  export default firebaseDb;