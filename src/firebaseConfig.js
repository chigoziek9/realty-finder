// firebaseConfig.js

// Import the functions you need from the SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Your Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD6Cuh5rBulxweiywx-vE3czMZN-iO1JGo",
  authDomain: "realityfinder-9c367.firebaseapp.com",
  projectId: "realityfinder-9c367",
  storageBucket: "realityfinder-9c367.appspot.com", // ✅ fixed
  messagingSenderId: "1064483106154",
  appId: "1:1064483106154:web:e6ed55e32531ca0e114913",
  measurementId: "G-V478J5VBMZ",
};

// ✅ Initialize Firebase (only once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Analytics safely (only in browser + supported)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// ✅ Firebase Authentication + Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, analytics };
