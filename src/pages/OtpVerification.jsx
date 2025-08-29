import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase"; // ✅ make sure your firebase.js exports auth
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function OtpVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const method = location.state?.method || "phone";
  const phone = location.state?.phone || "";

  // Handle OTP input
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
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

  // Handle OTP verify
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const result = await window.confirmationResult.confirm(enteredOtp);
      alert(`Welcome ${result.user.phoneNumber}`);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    if (!phone) {
      alert("Phone number missing");
      return;
    }
    try {
      setResending(true);

      // Setup reCAPTCHA (invisible mode)
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "resend-recaptcha", // hidden container
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA solved");
            },
          }
        );
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      alert("A new OTP has been sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to resend OTP. Try again later.");
    } finally {
      setResending(false);
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
            <span className="text-xl font-semibold text-gray-900">
              RealtyFinder
            </span>
          </div>
        </div>

        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Small Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-green-100 rounded-full">
            {method === "email" ? (
              <Mail size={28} className="text-green-700" />
            ) : (
              <Phone size={28} className="text-green-700" />
            )}
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold mb-1 text-center">OTP Verification</h2>
        <p className="text-gray-500 mb-6 text-center">
          {method === "email"
            ? "Check your email to see the verification code"
            : `Enter the code sent to ${phone}`}
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
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            Invalid OTP. Please try again.
          </p>
        )}

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-green-700 font-medium hover:underline"
          >
            {resending ? "Resending..." : "Resend code"}
          </button>
        </p>

        {/* Hidden recaptcha container */}
        <div id="resend-recaptcha"></div>
      </div>
    </div>
  );
}
