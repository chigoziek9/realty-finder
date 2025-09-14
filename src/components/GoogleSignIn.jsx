import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

export default function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User info:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error("Google Sign In failed:", error.message);
      alert("Google Sign In failed. Check console.");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
    >
      Continue with Google
    </button>
  );
}
