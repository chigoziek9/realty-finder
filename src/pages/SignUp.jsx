import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaGoogle,
  FaPhone,
} from "react-icons/fa";
import signupImage from "../assets/Frame 1.png";
import logo from "../assets/logo.png";

export default function SignUp({ accountType: propAccountType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
    accountType: propAccountType || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Load accountType from localStorage if not passed as prop
  useEffect(() => {
    if (!formData.accountType) {
      const savedType = localStorage.getItem("accountType");
      if (savedType) {
        setFormData((prev) => ({ ...prev, accountType: savedType }));
      } else {
        navigate("/choose-account-type");
      }
    }
  }, [formData.accountType, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Allow user to re-select account type
  const handleChangeType = () => {
    localStorage.removeItem("accountType");
    navigate("/choose-account-type");
  };

  // ✅ Password validation rules
  const passwordRules = [
    {
      text: "Password must be at least 8 characters long.",
      valid: formData.password.length >= 8,
    },
    {
      text: "Password must not be longer than 18 characters.",
      valid: formData.password.length <= 18 && formData.password.length > 0,
    },
    {
      text: "Password must contain at least one upper and one lower case letter.",
      valid: /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password),
    },
    {
      text: "Password must contain at least one number or punctuation character.",
      valid: /[0-9\W]/.test(formData.password),
    },
    {
      text: "Password must not contain space or unicode characters.",
      valid:
        !/\s/.test(formData.password) &&
        /^[\x00-\x7F]*$/.test(formData.password),
    },
  ];

  const allValid = passwordRules.every((rule) => rule.valid);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("You must agree to the terms & conditions.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!allValid) {
      alert("Password does not meet the requirements.");
      return;
    }

    try {
      // ✅ Call API to register
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save email for OTP verification
        localStorage.setItem("email", formData.email);

        alert("Registration successful! Please check your email for OTP.");
        navigate("/otp-verification");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Image */}
      <div className="hidden md:block">
        <img
          src={signupImage}
          alt="Sign Up Banner"
          className="w-full h-full object-cover rounded-r-3xl"
        />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Logo + Title */}
          <div className="text-left">
            <img src={logo} alt="Logo" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900">
              Get started now
            </h2>
            <p className="mt-2 text-gray-600">
              {formData.accountType ? (
                <span>
                  Create your{" "}
                  <span className="font-semibold capitalize">
                    {formData.accountType}
                  </span>{" "}
                  account
                  <button
                    onClick={handleChangeType}
                    className="ml-3 text-sm text-green-600 hover:underline"
                  >
                    Change
                  </button>
                </span>
              ) : (
                "Let’s create your account"
              )}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Middle Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle name
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="middleName"
                  placeholder="Enter middle name"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 relative">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Set your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full focus:outline-none pr-8"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* ✅ Password Rules */}
              <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs leading-5">
                <ul className="space-y-1">
                  {passwordRules.map((rule, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 ${
                        rule.valid ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {rule.valid ? (
                        <FaCheckCircle className="text-green-600" />
                      ) : (
                        <FaTimesCircle className="text-gray-400" />
                      )}
                      {rule.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 relative">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full focus:outline-none pr-8"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-gray-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="h-4 w-4 text-green-600"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to RealtyFinder’s{" "}
                <a href="#" className="text-green-600 font-medium">
                  terms & condition
                </a>
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!allValid}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                allValid
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-gray-50 transition">
              <FaGoogle className="text-red-500" /> Sign up with Google
            </button>

            <Link to="/signup/phone">
              <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-gray-50 transition">
                <FaPhone className="text-green-600" /> Sign up with Phone
              </button>
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-green-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
