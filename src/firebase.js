// Import the functions you need from the SDKs you need
// import firebase from "./firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHmM9oi1eKJsOWKUHHjaa9Rr6r6j2EqT0",
  authDomain: "mypersonalwebsite-be592.firebaseapp.com",
  projectId: "mypersonalwebsite-be592",
  storageBucket: "mypersonalwebsite-be592.appspot.com",
  messagingSenderId: "538103599009",
  appId: "1:538103599009:web:899bab472983c50c3cc5e0",
  databaseURL:'https://mypersonalwebsite-be592-default-rtdb.europe-west1.firebasedatabase.app/'
};




// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();



// export const onSignOut = () => {
//   signOut(auth).then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });
//   }


export default firebaseApp

export {auth, provider}