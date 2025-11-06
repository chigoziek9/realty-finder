import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function UserDropdown({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Toggle Button */}
      <button className="flex items-center gap-2 focus:outline-none">
        <img
          src={user?.profilePhoto || "https://via.placeholder.com/40"}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover"
        />
        <span className="font-medium text-black">
          {user?.firstName} {user?.lastName}
        </span>
        <ChevronDown size={16} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <Link
            to="/profile"
            onClick={handleItemClick}
            className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Profile
          </Link>

          {/* Conditional Dashboards */}
          {user?.role === "real_estate_agent" && (
            <Link
              to="/agents-dashboard"
              onClick={handleItemClick}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Agent Dashboard
            </Link>
          )}

          {user?.role === "property_owner" && (
            <Link
              to="/owners-dashboard"
              onClick={handleItemClick}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Owners Dashboard
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin-dashboard"
              onClick={handleItemClick}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Admin Dashboard
            </Link>
          )}

          {user?.role === "individual" && (
            <Link
              to="/profile"
              onClick={handleItemClick}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Individual Dashboard
            </Link>
          )}

          <button
            onClick={() => {
              handleItemClick();
              logout();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
