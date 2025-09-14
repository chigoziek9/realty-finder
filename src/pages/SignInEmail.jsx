import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig"; 
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function SignInEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();

  // ✅ Handle email OTP sign-in
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    navigate("/otp-verification", { state: { method: "email", email } });
  };

  // ✅ Handle Google Sign-In (Popup for desktop, Redirect for mobile)
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true); // show spinner
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("User info:", result.user);
        alert(`Welcome ${result.user.displayName}`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google Sign In failed:", error);
      alert(`Google Sign In failed: ${error.message}`);
    } finally {
      setLoading(false); // hide spinner
    }
  };

  // ✅ Handle redirect result after returning from Google
  useEffect(() => {
    setLoading(true);
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect sign-in success:", result.user);
          alert(`Welcome ${result.user.displayName}`);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error) console.error("Redirect Sign-In failed:", error);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      {/* Left Image */}
      <div className="w-full h-64 md:h-auto">
        <img src={houseImg} alt="House" className="w-full h-full object-cover" />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center px-6 md:px-12 bg-white py-8">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="RealtyFinder" className="w-6 h-6" />
            <span className="text-xl font-semibold text-gray-900">RealtyFinder</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Sign In with Email</h2>
        <p className="text-gray-500 mb-6">
          Enter your email address to receive a one-time password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            Continue
          </button>
        </form>

        {/* Google Sign In */}
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
              loading ? "bg-gray-100 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-gray-700">Continue with Google</span>
              </>
            )}
          </button>
        </div>

        {/* Link to Phone Sign In */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Prefer signing in with phone?{" "}
          <button
            onClick={() => navigate("/signin-phone")}
            className="text-green-700 font-medium hover:underline"
          >
            Use Phone
          </button>
        </p>
      </div>
    </div>
  );
}
