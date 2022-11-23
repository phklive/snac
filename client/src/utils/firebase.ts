// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAviWlS8NG8Cu-6215qtkSb5JT4see1bZE",
  authDomain: "snac-unix.firebaseapp.com",
  projectId: "snac-unix",
  storageBucket: "snac-unix.appspot.com",
  messagingSenderId: "463904505367",
  appId: "1:463904505367:web:75456f13a7b9fab2772652",
  measurementId: "G-9K2X8XVKMB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Database
export const db = getFirestore(app);
