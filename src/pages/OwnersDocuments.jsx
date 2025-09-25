import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { useContext } from "react";
import { Clock, Bell, Heart, Settings, LogOut, FileText } from "lucide-react";

export default function OwnersDocuments() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Utility to check if a link is active
  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
        <div>
          {/* Menu */}
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/owners-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/owners-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/owners-listings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/owners-listings"
              )}`}
            >
              <Bell size={18} />
              <span>My Listings</span>
            </button>

            <button
              onClick={() => navigate("/owners-saved-property")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/owners-saved-property"
              )}`}
            >
              <Heart size={18} />
              <span>My saved property</span>
            </button>

            <button
              onClick={() => navigate("/owners-documents")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/owners-documents"
              )}`}
            >
              <FileText size={18} />
              <span>My documents</span>
            </button>

            <button
              onClick={() => navigate("/owners-agreement")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/owners-agreement"
              )}`}
            >
              <FileText size={18} />
              <span>New tenancy agreement</span>
            </button>

            <button
              onClick={() => navigate("/owners-settings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/owners-settings"
              )}`}
            >
              <Settings size={18} />
              <span>Account settings</span>
            </button>
          </nav>
        </div>

        {/* User Info */}
        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img
              src={user?.profilePic || "https://via.placeholder.com/40"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-300">{user?.email}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-[60px] bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My documents</h1>
        <p className="text-gray-600 mb-6">
          Manage and access all property documents and compliance records in one
          place.
        </p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for document"
            className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
          />
          <button className="ml-2 bg-green-900 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>

        <div className="mb-4 text-gray-500 border rounded-md px-4 py-3">
          Sorry we couldn’t find any document for your search criteria.
        </div>

        {/* How it works */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">How it works</h2>
          <iframe
            className="w-full h-64 rounded-lg"
            src="https://www.youtube.com/embed/nm1iJ7zLQDU"
            title="How to Create a Tenancy Agreement"
            allowFullScreen
          ></iframe>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-[320px] p-6 bg-gray-50 border-l border-gray-200">
        {/* New documents */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">New documents</h3>
          <button className="w-full bg-green-900 text-white py-2 rounded-md">
            Create tenancy agreement
          </button>
        </div>

        {/* Documents Prices */}
        <div className="mb-6 border rounded-md">
          <h3 className="font-semibold px-4 py-3 border-b bg-gray-100 flex items-center space-x-2">
            <FileText size={16} />
            <span>Documents prices</span>
          </h3>

          <div className="p-4">
            <h4 className="flex items-center space-x-2 font-medium mb-3">
              <FileText size={14} />
              <span>Tenancy agreement</span>
            </h4>

            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-gray-700">
                  <th className="text-left py-2 border-b">Property price</th>
                  <th className="text-right py-2 border-b">Agreement price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 border-b">N0 – N1,000,000</td>
                  <td className="py-2 text-right border-b">N14,000</td>
                </tr>
                <tr>
                  <td className="py-2 border-b">N1,000,001 – N2,000,000</td>
                  <td className="py-2 text-right border-b">N35,000</td>
                </tr>
                <tr>
                  <td className="py-2">N2,000,001 – N500,000,000</td>
                  <td className="py-2 text-right">N56,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="font-semibold mb-2">Frequently asked questions</h3>
          <p className="text-sm text-gray-600">
            Read the document service{" "}
            <a href="#" className="text-green-900 underline">
              FAQ’s
            </a>
          </p>
        </div>
      </aside>
    </div>
  );
}
