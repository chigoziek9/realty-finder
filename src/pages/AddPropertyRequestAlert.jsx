import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";
import profileImg from "../assets/profile.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddPropertyRequestAlert() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check active link
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
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span>Property request alert</span> &gt;{" "}
          <span className="text-green-800 font-medium">
            Add property request alert
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Property Request Alert
        </h1>
        <p className="text-gray-600 mt-1">
          View, manage, and update all your properties in one place.
        </p>

        {/* Form */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Property Request Detail</h2>

          <form className="space-y-4">
            {/* Category / Type / Subtype */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="border rounded-lg p-2">
                <option>Any</option>
                <option>Residential</option>
                <option>Commercial</option>
              </select>
              <select className="border rounded-lg p-2">
                <option>Any</option>
                <option>Rent</option>
                <option>Buy</option>
              </select>
              <select className="border rounded-lg p-2">
                <option>Any</option>
                <option>Duplex</option>
                <option>Flat</option>
              </select>
            </div>

            {/* Bedrooms / State / Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="border rounded-lg p-2">
                <option>Any</option>
                <option>1</option>
                <option>2</option>
              </select>
              <select className="border rounded-lg p-2">
                <option>Any</option>
                <option>Lagos</option>
                <option>Rivers</option>
              </select>
              <select className="border rounded-lg p-2">
                <option>Any</option>
                <option>Ikeja</option>
                <option>Port Harcourt</option>
              </select>
            </div>

            {/* Min / Max Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="border rounded-lg p-2">
                <option>Select Min</option>
                <option>₦100k</option>
                <option>₦500k</option>
              </select>
              <select className="border rounded-lg p-2">
                <option>Select Max</option>
                <option>₦1m</option>
                <option>₦5m</option>
              </select>
            </div>

            {/* Comments */}
            <textarea
              placeholder="Comments"
              className="w-full border rounded-lg p-2 h-24"
            ></textarea>

            {/* Name / Account Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border rounded-lg p-2"
              />
              <select className="border rounded-lg p-2">
                <option>Individual</option>
                <option>Property Owner</option>
                <option>Agent</option>
              </select>
            </div>

            {/* Phone / Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter phone number"
                className="border rounded-lg p-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded-lg p-2"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800"
            >
              Create Request
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
