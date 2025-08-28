import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function OtpVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const correctOtp = "123456"; // demo OTP

  // Handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Reset error as user types
    setError(false);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp === correctOtp) {
      navigate("/reset-password");
    } else {
      setError(true);
    }
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

        {/* Back Arrow */}
        <button
          onClick={() => navigate("/forgot-password")}
          className="flex items-center text-gray-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Small Mail Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-green-100 rounded-full">
            <Mail size={28} className="text-green-700" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold mb-1 text-center">OTP Verification</h2>
        <p className="text-gray-500 mb-6 text-center">
          Check your email to see the verification code
        </p>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 
                  ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-green-600"}`}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            Verify
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            Invalid OTP. Please try again.
          </p>
        )}

        {/* Resend link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive the code?{" "}
          <button
            onClick={() => alert("Resend OTP")}
            className="text-green-700 font-medium hover:underline"
          >
            Resend code
          </button>
        </p>
      </div>
    </div>
  );
}
