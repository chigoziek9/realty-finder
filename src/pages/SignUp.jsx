import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {/* First & Last Name */}
        <div className="flex gap-4 mb-4">
          <div className="relative w-1/2">
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative w-1/2">
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center mb-4 relative">
          <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div className="flex items-center mb-4 relative">
          <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="flex items-center mb-4 relative">
          <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-600 mb-4">
          By creating your account, you consent to{" "}
          <a href="#" className="text-black underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-black underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Continue
        </button>

        {/* Link to Signin */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-black underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
