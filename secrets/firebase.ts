// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvPfMQuUJVBkgeIClojhRJi3PDnsbrRnk",
  authDomain: "media-watchlist-9903e.firebaseapp.com",
  projectId: "media-watchlist-9903e",
  storageBucket: "media-watchlist-9903e.firebasestorage.app",
  messagingSenderId: "564210315997",
  appId: "1:564210315997:web:26d105270bbf0438bce134",
  measurementId: "G-SYECDK5108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db= getFirestore(app)

