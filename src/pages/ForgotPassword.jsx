import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     const API_BASE = "https://realtyfinder.onrender.com";
      // or https://realty-finder.vercel.app if that's where backend is deployed

      const response = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({email}),
      });

    const data = await response.json().catch(() => ({}));
      if (response.ok) {
        localStorage.setItem("resetToken", data.resetToken); // save for next step
        alert("Password reset email sent. Please check your inbox.");
        navigate("/reset-otp-verification", { state: { email } });

      } else {
        alert(data.message || "Failed to send reset email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      {/* Image */}
      <div className="w-full h-64 md:h-auto">
        <img src={houseImg} alt="House" className="w-full h-full object-cover" />
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center px-6 md:px-12 bg-white py-8">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="RealtyFinder" className="w-6 h-6" />
            <span className="text-xl font-semibold text-gray-900">RealtyFinder</span>
          </div>
        </div>

        {/* Back Arrow */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Lock size={28} className="text-green-700" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold mb-1 text-center">Forgot password?</h2>
        <p className="text-gray-500 mb-6 text-center">
          Enter your email to reset your password
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-600"
                placeholder="charlesdoe@example.com"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
