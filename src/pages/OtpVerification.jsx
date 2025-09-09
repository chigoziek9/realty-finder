import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // ✅ Get saved email from localStorage
  const email = localStorage.getItem("email");

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setError(false);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ Submit OTP to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError(true);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: enteredOtp }),
        }
      );

      const data = await res.json();
      console.log("OTP response:", data);

      if (res.ok) {
        alert("OTP verified successfully!");
        navigate("/"); // redirect to homepage or dashboard
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    try {
      setResending(true);

      const res = await fetch(
        "/api/auth/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("A new OTP has been sent to your email!");
      } else {
        alert(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error resending OTP");
    } finally {
      setResending(false);
    }
    

  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      <div className="w-full h-64 md:h-auto">
        <img
          src={houseImg}
          alt="House"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-6 md:px-12 bg-white py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="RealtyFinder" className="w-6 h-6" />
            <span className="text-xl font-semibold text-gray-900">
              RealtyFinder
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="flex justify-center mb-6">
          <div className="p-3 bg-green-100 rounded-full">
            <Mail size={28} className="text-green-700" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-1 text-center">
          OTP Verification
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-gray-900">{email}</span>
        </p>

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
                className={`w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-green-600"
                }`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            Invalid OTP. Please try again.
          </p>
        )}

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
      </div>
    </div>
  );
}
