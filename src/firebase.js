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
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_auth_Domain}`,
  projectId: `${process.env.REACT_APP_project_Id}`,
  storageBucket: `${process.env.REACT_APP_storage_Bucket}`,
  messagingSenderId: `${process.env.REACT_APP_messaging_Sender_Id}`,
  appId: `${process.env.REACT_APP_app_Id}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
