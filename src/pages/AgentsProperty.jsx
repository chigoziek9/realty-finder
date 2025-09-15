import { Clock, Bell, Heart, Settings, LogOut, X, Trash2 } from "lucide-react";
import profileImg from "../assets/profile.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function AgentsProperty() {
  const navigate = useNavigate();
  const location = useLocation();

  // Utility to check if a link is active
  const isActive = (path) =>
    location.pathname === path ? "bg-green-800 font-medium" : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
        <div>
          {/* Menu */}
          <nav className="mt-6 space-y-1">
            <button
              onClick={() => navigate("/agents-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/agents-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => navigate("/agents-transaction")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/agents-transaction"
              )}`}
            >
              <Bell size={18} />
              <span>Transaction & Commission</span>
            </button>

            <button
              onClick={() => navigate("/agents-client")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/agents-client"
              )}`}
            >
              <Heart size={18} />
              <span>Clients</span>
            </button>
             <button
              onClick={() => navigate("/agents-property")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/agents-property"
              )}`}
            >
              <Heart size={18} />
              <span>Document Compliance</span>
            </button>
             <button
              onClick={() => navigate("/agents-document")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/agents-document"
              )}`}
            >
              <Heart size={18} />
              <span>Property Management</span>
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
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Clock className="text-green-900" size={22} />
            <span>Property Request Alert</span>
          </h1>
          <p className="text-gray-600 mt-1">
            View, manage and update all your properties in one place
          </p>
          <button
            onClick={() => navigate("/add-property-request-alert")}
            className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            + Add Property Request Alert
          </button>
        </div>

        {/* Middle Section */}
        <div className="mt-6">
          {/* Queued Message */}
          <div className="flex items-center justify-between bg-green-100 text-green-700 px-4 py-3 rounded-md">
            <p>
              Your request has been queued for review and will be posted after it
              has been reviewed
            </p>
            <X size={18} className="cursor-pointer" />
          </div>

          {/* Result Count */}
          <div className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Result 1–1 of 1
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
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
              <span className="font-semibold">Date:</span> 12th Aug. 2025
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-yellow-600 font-medium">Awaiting Review</span>
            </p>
          </div>

          {/* Delete Button (text + icon) */}
          <button className="mt-6 flex items-center gap-2 text-red-600 font-medium hover:text-red-800">
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </main>
    </div>
  );
}
