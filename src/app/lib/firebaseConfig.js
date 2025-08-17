// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaU8uTN_P70y3hgOAMUS53ncyR0eO5JBs",
  authDomain: "carwash-2a8a0.firebaseapp.com",
  databaseURL: "https://carwash-2a8a0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carwash-2a8a0",
  storageBucket: "carwash-2a8a0.firebasestorage.app",
  messagingSenderId: "980285460908",
  appId: "1:980285460908:web:edfe74928c9d7c54c76a09",
  measurementId: "G-EB12W7S3G1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);