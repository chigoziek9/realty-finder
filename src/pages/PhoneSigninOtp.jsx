import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, setUpRecaptcha } from "../firebase";
import logo from "../assets/logo.png";

export default function PhoneSigninOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Phone number passed from signup
  const phone = location.state?.phone || "your number";

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return alert("Enter a valid 6-digit code");

    try {
      const result = await window.confirmationResult.confirm(code);
      console.log("✅ User signed in:", result.user);
      navigate("/dashboard"); // redirect after success
    } catch (err) {
      console.error("❌ OTP Error:", err);
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!phone) return alert("Phone number missing.");
    try {
      setLoading(true);
      const confirmation = await setUpRecaptcha(phone);
      window.confirmationResult = confirmation; // store new result
      alert("📲 A new OTP has been sent to your phone.");
    } catch (err) {
      console.error("❌ Resend Error:", err);
      alert("Failed to resend OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 relative">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
        >
          ←
        </button>

        {/* Logo */}
        <img src={logo} alt="RealtyFinder Logo" className="w-32 mb-8" />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Verify your phone number
        </h1>
        <p className="text-gray-600 mb-6">
          Enter the code that was sent to{" "}
          <span className="font-semibold">{phone}</span>
        </p>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 border border-gray-300 text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition"
          >
            Verify
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="text-green-700 font-semibold hover:underline disabled:opacity-50"
          >
            {loading ? "Resending..." : "Resend code"}
          </button>
        </p>

        {/* Recaptcha container (hidden if invisible mode) */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
