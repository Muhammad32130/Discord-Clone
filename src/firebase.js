// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA62fKEPkk0cLv0Pju3XDlHCl3IlU0en3E",
  authDomain: "discord-clone-edc82.firebaseapp.com",
  projectId: "discord-clone-edc82",
  storageBucket: "discord-clone-edc82.appspot.com",
  messagingSenderId: "955087672652",
  appId: "1:955087672652:web:03b2c7924f51682ef3ebe9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
