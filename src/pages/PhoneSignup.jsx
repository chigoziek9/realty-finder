import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/Frame 1.png";
import logo from "../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaPhoneAlt, FaInfoCircle, FaTimes } from "react-icons/fa";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function PhoneSignup() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) return;

    try {
      const formattedPhone = `+234${phone}`;

      // ✅ Setup reCAPTCHA (invisible)
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );

      // ✅ Send OTP
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      // Save confirmation result for OTP verification page
      window.confirmationResult = confirmationResult;

      // Navigate to OTP screen with phone
      navigate("/phone-signin-otp", { state: { phone: formattedPhone } });
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white relative">
      {/* Left image */}
      <div className="hidden md:block">
        <img
          src={signupImage}
          alt="Signup Illustration"
          className="w-full h-full object-cover rounded-r-3xl"
        />
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center px-6 py-10 relative">
        <div className="w-full max-w-md relative">
          {/* X close button */}
          <button
            onClick={() => navigate("/signup")}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Logo */}
          <img src={logo} alt="RealtyFinder Logo" className="w-32 mb-8" />

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">Get started now</h1>
          <p className="text-gray-600 mb-6">Let’s create your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <span className="px-3 text-gray-700 bg-gray-100 border-r">
                  +234
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="flex-1 px-3 py-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Info */}
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-700 text-white text-[10px]">
                <FaInfoCircle />
              </span>
              You will receive an OTP code from{" "}
              <span className="font-semibold">RealtyFinder</span> to confirm
              your number.
            </p>

            {/* Hidden reCAPTCHA container */}
            <div id="recaptcha-container"></div>

            {/* Sign up button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition"
            >
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google signup */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          {/* Phone signup */}
          <button
            type="button"
            onClick={() => navigate("/phone-signup")}
            className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-gray-50 transition mt-3"
          >
            <FaPhoneAlt className="text-green-700" />
            Continue with Phone
          </button>

          {/* Already have account */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-green-700 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
