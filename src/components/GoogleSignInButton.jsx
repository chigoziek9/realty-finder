import { FaGoogle } from "react-icons/fa";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // Redirect user to your backend endpoint for Google OAuth
    window.location.href = "https://realtyfinder.onrender.com/api/auth/google?prompt=select_account";
  };

  return (
    <>
   
      <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
    </>
    
  );
};

export default GoogleSignInButton;
