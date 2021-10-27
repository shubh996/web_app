import firebase from "firebase"

var FirebaseKeys = {
  apiKey: "AIzaSyDCBxjX9Xmn0dTprO2oIpYeySKpXHKXd8U",
  authDomain: "office-d18c3.firebaseapp.com",
  databaseURL: "https://office-d18c3.firebaseio.com",
  projectId: "office-d18c3",
  storageBucket: "office-d18c3.appspot.com",
  messagingSenderId: "172426634982",
  appId: "1:172426634982:web:19fcb600d19a2bc2bbfd27"
  };

 const keys =     firebase.initializeApp(FirebaseKeys);
 
 export default keys 
  
 

 