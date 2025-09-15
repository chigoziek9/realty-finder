import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);

  const notifications = [
    { id: 1, text: "New home matches available!" },
    { id: 2, text: "Your saved home dropped in price." },
    { id: 3, text: "You have 2 unread messages." },
  ];

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm relative">
      {/* Left Side (App Title / Logo) */}
      <h1 className="text-lg font-bold text-gray-800">RealtyFinder</h1>

      {/* Right Side */}
      <div className="flex items-center gap-6 relative">
        {/* Notification Bell */}
        <div className="relative">
          <button
            className="relative text-gray-600 hover:text-green-700"
            onClick={() => setOpen(!open)}
          >
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b font-semibold text-gray-700">
                Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {n.text}
                  </li>
                ))}
              </ul>
            
              <div className="text-center border-t"> 
                {" "}
                <Link
                  to="/notifications"
                  className="p-2 text-center text-sm text-green-700 font-medium  hover:text-xl cursor-pointer"
                >
                  View All
                </Link>
              </div>
             
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=3" // placeholder avatar
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
          <div className="text-sm">
            <p className="font-semibold text-gray-800">Charles Doe</p>
            <p className="text-gray-500 text-xs">Member</p>
          </div>
        </div>
      </div>
    </header>
  );
}
