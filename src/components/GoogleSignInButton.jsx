import { FaGoogle } from "react-icons/fa";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // Redirect user to your backend endpoint for Google OAuth
    window.location.href = "https://realtyfinder.onrender.com/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      <FaGoogle /> Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
