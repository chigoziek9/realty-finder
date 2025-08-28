import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function ResetPasswordSuccess() {
  const navigate = useNavigate();

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

      {/* Right Side Section */}
      <div className="flex flex-col justify-center px-6 md:px-12 bg-white py-8">
        {/* Header with Logo */}
        <div className="flex items-center gap-2 mb-10">
          <img src={logoImg} alt="RealtyFinder" className="w-6 h-6" />
          <span className="text-xl font-semibold text-gray-900">
            RealtyFinder
          </span>
        </div>

        {/* Success Icon (Green Circle with Thick Check) */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
            <Check size={32} className="text-white font-bold" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
          Password has been successfully changed
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Sign in to your account with your new password
        </p>

        {/* Sign In Button */}
        <button
          onClick={() => navigate("/signin")}
          className="w-full bg-green-700 text-white py-3 rounded-lg text-base font-medium hover:bg-green-800 transition"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
