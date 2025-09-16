import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import houseImg from "../assets/Frame 1.png";
import logoImg from "../assets/logo.png";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resetToken = localStorage.getItem("resetToken");

    if (!resetToken) {
      setError("Missing reset token. Please request a new password reset.");
      return;
    }

    if (newPassword.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const response = await fetch(
        "https://realtyfinder.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword,
            resetToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccessMessage("Password has been reset successfully!");
      localStorage.removeItem("resetToken");

      setTimeout(() => {
        navigate("/reset-success");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      {/* Left Side Image */}
      <div className="w-full h-64 md:h-auto">
        <img src={houseImg} alt="House" className="w-full h-full object-cover" />
      </div>

      {/* Right Side Form */}
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
          onClick={() => navigate("/otp")}
          className="flex items-center text-gray-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-gray-500 mb-6">
          Set a new password for your account.
        </p>

        {/* Error & Success Messages */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm mb-4">{successMessage}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-600"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-600"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            {loading ? "Saving..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
