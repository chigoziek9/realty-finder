import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { setUpRecaptcha } from "../firebase"; // ✅ import
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function SignInPhone() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || phone.trim().length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);
      const confirmationResult = await setUpRecaptcha(phone);
      setLoading(false);

      // ✅ Save confirmation to localStorage or state
      window.confirmationResult = confirmationResult;

      navigate("/otp-verification", { state: { phone } });
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      {/* Left Side Image */}
      <div className="w-full h-64 md:h-auto">
        <img src={houseImg} alt="House" className="w-full h-full object-cover" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center px-6 md:px-12 bg-white py-8 relative">
        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img src={logoImg} alt="RealtyFinder" className="w-6 h-6" />
          <span className="text-xl font-semibold text-gray-900">RealtyFinder</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-1">Sign in with Phone</h2>
        <p className="text-gray-500 mb-6">
          Enter your phone number to receive a one-time password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
            }}
            placeholder="+234 801 234 5678"
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-green-600"
            }`}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>

        {/* Invisible Recaptcha container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
