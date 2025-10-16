import { useState, useContext } from "react";
import { Clock, Bell, Heart, LogOut, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function AdminPropertyMgt() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="flex items-center justify-between bg-green-900 text-white p-4 md:hidden">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col justify-between transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Menu */}
          <nav className="mt-[85px] md:mt-10 space-y-1">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/admin-user-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-user-mgt"
              )}`}
            >
              <Bell size={18} />
              <span>User Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-property-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-property-mgt"
              )}`}
            >
              <Heart size={18} />
              <span>Property Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-agents-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-agents-mgt"
              )}`}
            >
              <Heart size={18} />
              <span>Estate Agents Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-payments-transactions")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-payments-transactions"
              )}`}
            >
              <Heart size={18} />
              <span>Payments & Transactions</span>
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
              <p className="font-medium text-sm md:text-base">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs md:text-sm text-gray-300">{user?.email}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Breadcrumb */}
        <p className="text-xs sm:text-sm text-gray-500 mb-2">
          Property management <span className="mx-1">›</span>
          <span className="text-green-700 font-semibold">Property detail</span>
        </p>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Property details</h1>

        {/* Seller details */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Seller details</h2>
          <div className="space-y-2 text-sm sm:text-base text-gray-700">
            <p><span className="font-medium">Name:</span> Samuel Carter</p>
            <p><span className="font-medium">Email:</span> email@email.com</p>
            <p><span className="font-medium">Phone:</span> +234-123-456-7890</p>
            <p><span className="font-medium">Location:</span> Kubwa, Nigeria</p>
          </div>
        </div>

        {/* Property Information */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Property Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base text-gray-700">
            <p><span className="font-medium">Property name:</span> Ocean view apartment</p>
            <p><span className="font-medium">Property type:</span> Apartment</p>
            <p><span className="font-medium">Property size:</span> 5 bedroom</p>
            <p><span className="font-medium">Amount:</span> ₦50,000,000</p>
            <p><span className="font-medium">Date/time:</span> 12/14/2024, 10 AM</p>
            <p><span className="font-medium">Status:</span> <span className="text-red-500 font-semibold">Pending</span></p>
          </div>
        </div>

        {/* Supporting Documents */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Supporting Documents</h2>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-gray-700">Property survey plan</p>
              <button className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 w-full sm:w-auto">
                Download ⬇
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-gray-700">Certificate of occupancy</p>
              <button className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 w-full sm:w-auto">
                Download ⬇
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
          <button className="flex-1 py-3 bg-red-600 text-white rounded hover:bg-red-700">
            Reject
          </button>
          <button className="flex-1 py-3 bg-green-800 text-white rounded hover:bg-green-900">
            Approve
          </button>
        </div>
      </main>
    </div>
  );
}
