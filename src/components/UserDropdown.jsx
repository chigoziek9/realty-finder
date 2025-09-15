import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function UserDropdown({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <img
          src={user?.profilePic || "https://via.placeholder.com/40"}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover"
        />
        <span className="font-medium text-black">
          {user.firstName} {user.lastName}
        </span>
        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Profile
          </Link>
          <Link
            to="/account-settings"
            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Settings
          </Link>
          <Link
            to="/agents-dashboard"
            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Agent Dashboard
          </Link>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
