// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ================== GOOGLE AUTH ==================
const googleProvider = new GoogleAuthProvider();

/**
 * Google Sign-In
 */
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// ================== PHONE AUTH ==================
/**
 * Set up Recaptcha & Send OTP
 * @param {string} phoneNumber - Must include country code, e.g. +234XXXXXXXXXX
 * @returns {Promise<ConfirmationResult>}
 */
export const setUpRecaptcha = (phoneNumber) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container", // this must match the <div id="recaptcha-container"></div> in your component
    { size: "invisible" }, // invisible reCAPTCHA
    auth
  );
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};
