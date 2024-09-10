// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from  'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5TgKgn8P2s06Yg2iFJqZbJaB_EtdNO_M",
  authDomain: "workspace-f0c09.firebaseapp.com",
  projectId: "workspace-f0c09",
  storageBucket: "workspace-f0c09.appspot.com",
  messagingSenderId: "393571464467",
  appId: "1:393571464467:web:8074cc9d955981046596e6"
};

// Initialize Firebase

const app = getApps().length==0?initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);
export {db}; 
