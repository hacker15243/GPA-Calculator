//Importing firebase app
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

//Importing authentication and database SDKs
import { 
    getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
}
    from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

//configuring firebase to our website 
const firebaseConfig = {
    apiKey: "AIzaSyCOj3j1mpbb29saEwWqEl-NvFj3lGTQYkE",
    authDomain: "gpa-calculator-d6c54.firebaseapp.com",
    databaseURL: "https://gpa-calculator-8f7e4-default-rtdb.firebaseio.com",
    projectId: "gpa-calculator-d6c54",
    storageBucket: "gpa-calculator-d6c54.appspot.com",
    messagingSenderId: "608222262069",
    appId: "1:608222262069:web:ccf0f47cce2f957321527c",
    measurementId: "G-EZWXBG91KP"
  };

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

//Initialize database, auth, and provider 
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

//export functions provided by SDKs so that script.js can use them
export{app, db, auth, provider, onAuthStateChanged, signInWithPopup, signOut,
     doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField}