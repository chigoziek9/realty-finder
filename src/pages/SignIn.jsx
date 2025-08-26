import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm text-center">
        
        {/* Frame image */}
        <img
          src="/assets/Frame 1.png"
          alt="Login frame"
          className="mx-auto mb-4 w-32 h-32 object-contain"
        />

        {/* Welcome text */}
        <h2 className="text-2xl font-bold mb-1">Welcome back 👋</h2>
        <p className="text-gray-500 mb-6">Sign in to your account</p>

        <form className="space-y-4 text-left">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-600"
                placeholder="charlesdoe@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-green-600"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded text-green-600" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-green-600 font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
