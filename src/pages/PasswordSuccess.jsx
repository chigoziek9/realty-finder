import React from 'react';

export default function PasswordSuccess() {
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
        <div className="text-center">
          <div className="text-green-600 text-4xl mb-4">✔️</div>
          <h1 className="text-2xl font-bold mb-2">Password has been successfully changed</h1>
          <p className="text-gray-600 mb-6">Sign in to your account with your new password</p>
          <a
            href="/login"
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
