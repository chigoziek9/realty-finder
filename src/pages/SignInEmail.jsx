import { useState } from "react";
import { useNavigate } from "react-router-dom";
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function SignInEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    // Send OTP process here...
    // After sending, navigate to OTP page with email method
    navigate("/otp-verification", { state: { method: "email" } });
  };

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
