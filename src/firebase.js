// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN67nzoS3VETpaDQwXd-SjGQSzgQB5A2E",
  authDomain: "realty-finder-9b4f2.firebaseapp.com",
  projectId: "realty-finder-9b4f2",
  storageBucket: "realty-finder-9b4f2.firebasestorage.app",
  messagingSenderId: "109024715989",
  appId: "1:109024715989:web:63da0094bd1fe946752e5c",
  measurementId: "G-3Z81NZWD7Q"
};
const app = initializeApp(firebaseConfig);

// ✅ Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
