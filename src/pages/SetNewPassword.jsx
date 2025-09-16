import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetNewPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setError("Passwords do not match.");
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
    <div className="flex min-h-screen">
      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="House"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2">Set new password</h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your new password to complete the reset process
          </p>

          {error && <div className="mb-4 text-red-600">{error}</div>}
          {successMessage && (
            <div className="mb-4 text-green-600">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">New password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1">Confirm new password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
            >
              {loading ? "Saving..." : "Save new password"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Remember old password?{" "}
            <a href="/login" className="text-green-700 underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
