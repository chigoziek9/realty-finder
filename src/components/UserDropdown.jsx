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
        <span className="font-medium text-black">
          {user?.firstName} {user?.lastName}
        </span>
        <ChevronDown size={16} />

        <img
          src={user?.profilePhoto || "https://via.placeholder.com/40"}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          {/* Always visible */}
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Profile
          </Link>
           <Link
            to="/admin-dashboard"
            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Admin Dashboard
          </Link>
          <Link
              to="/owners-dashboard"
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Owners Dashboard
            </Link>
             <Link
              to="/agents-dashboard"
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Agent Dashboard
            </Link>
          <Link
            to="/account-settings"
            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Settings
          </Link>

          {/* Conditional dashboards */}
          {user?.role === "agent" && (
            <Link
              to="/agents-dashboard"
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Agent Dashboard
            </Link>
          )}

          {user?.role === "owner" && (
            <Link
              to="/owners-dashboard"
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Owners Dashboard
            </Link>
          )}

          {user?.role === "individual" && (
              <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            individual dashboard
          </Link>
            
          )}

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
