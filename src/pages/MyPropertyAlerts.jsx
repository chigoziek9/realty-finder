// src/pages/MyPropertyAlerts.jsx
import { Clock, Bell, Heart, Settings, LogOut, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import profileImg from "../assets/profile.png";

export default function MyPropertyAlerts() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "bg-green-800 font-medium" : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col justify-between">
        <div>
          <nav className="mt-6 space-y-1">
            <button
              onClick={() => navigate("/property-request-alert")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/property-request-alert"
              )}`}
            >
              <Clock size={18} />
              <span>Property Request Alert</span>
            </button>

            <button
              onClick={() => navigate("/my-property-alerts")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/my-property-alerts"
              )}`}
            >
              <Bell size={18} />
              <span>My Property Alerts</span>
            </button>

            <button
              onClick={() => navigate("/saved-properties")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/saved-properties"
              )}`}
            >
              <Heart size={18} />
              <span>My Saved Property</span>
            </button>

            <button
              onClick={() => navigate("/account-settings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg ${isActive(
                "/account-settings"
              )}`}
            >
              <Settings size={18} />
              <span>Account Settings</span>
            </button>
          </nav>
        </div>

        {/* User Info */}
        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img
              src={profileImg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-medium">Charles Doe</p>
              <p className="text-sm text-gray-300">email@gmail.com</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Property Alert</h1>
          <button
            onClick={() => navigate("/add-property-request-alert")}
            className="flex items-center gap-2 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            <Plus size={18} /> Add Property Alert
          </button>
        </div>

        {/* Success Message */}
        <div className="mt-4 bg-green-100 text-green-700 px-4 py-3 rounded-md">
          My property alert has been created successfully
        </div>

        {/* Results Count */}
        <div className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded">
          Result 1–1 of 1
        </div>

        {/* Alert Card */}
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600 mb-4">
            Below are the details of the property requests you want to receive alerts for.
          </p>
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold">Type:</span> Mini flats for rent
            </p>
            <p>
              <span className="font-semibold">Bedrooms:</span> 5
            </p>
            <p>
              <span className="font-semibold">Areas:</span> Rivers
            </p>
            <p>
              <span className="font-semibold">Budget:</span> ₦500,000 – ₦500,000
            </p>
          </div>

          <button className="mt-6 px-6 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800">
            Edit
          </button>
        </div>
      </main>
    </div>
  );
}
