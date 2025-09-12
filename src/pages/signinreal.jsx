import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";
import { signInWithGoogle } from "../firebase";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // 🔹 Normal Email/Password Demo Login
  // 🔹 Normal Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // ✅ Choose base URL depending on environment
      const API_BASE = "https://realtyfinder.onrender.com/api"; // your Render backend

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        // ✅ Save token & user info
        localStorage.setItem("token", data.token); // adjust if backend uses accessToken or something else
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Redirect after login
        navigate("/");
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  // 🔹 Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      alert(`Welcome ${user.displayName}!`);
      navigate("/"); // ✅ Redirect after login
    } catch (err) {
      console.error("Google Sign In failed:", err);
      setError("Google Sign In failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      {/* Left Side Image */}
      <div className="w-full h-64 md:h-auto">
        <img
          src={houseImg}
          alt="House"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center px-6 md:px-12 bg-white py-8 relative">
        {/* Close Button (X) */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img src={logoImg} alt="RealtyFinder" className="w-6 h-6" />
          <span className="text-xl font-semibold text-gray-900">
            RealtyFinder
          </span>
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
        <p className="text-gray-500 mb-6">Sign in to your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className={`mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-600"
              }`}
              placeholder="Enter your password"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-green-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign In */}
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

        {/* Continue with Phone (no input, just button) */}
        <button
          onClick={() => navigate("/phone-signin")}
          className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          📱 Continue with Phone
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-green-700 font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
