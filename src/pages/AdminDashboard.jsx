import { useState, useContext } from "react";
import {
  Clock,
  Bell,
  Heart,
  Settings,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import DocumentCompliance from "../components/DocumentCompliance.jsx";
import Dashboard from "./AdminDashContent.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* ===== Sidebar (Desktop + Mobile Drawer) ===== */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col justify-between transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close button (mobile only) */}
        <div className="flex items-center justify-between px-6 py-4 md:hidden border-b border-green-800">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-[70px] space-y-1 md:mt-[85px]">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/admin-dashboard"
            )}`}
          >
            <Clock size={18} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => navigate("/admin-user-mgt")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/admin-user-mgt"
            )}`}
          >
            <Bell size={18} />
            <span>User Management</span>
          </button>

          <button
            onClick={() => navigate("/admin-property-mgt")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/admin-property-mgt"
            )}`}
          >
            <Heart size={18} />
            <span>Property Management</span>
          </button>

          <button
            onClick={() => navigate("/admin-agents-mgt")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/admin-agents-mgt"
            )}`}
          >
            <Heart size={18} />
            <span>Estate Agents Management</span>
          </button>

          <button
            onClick={() => navigate("/admin-payments-transactions")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/admin-payments-transactions"
            )}`}
          >
            <Heart size={18} />
            <span>Payments & Transactions</span>
          </button>
        </nav>

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

      {/* ===== Overlay (for mobile sidebar) ===== */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col w-full p-6 md:p-8 ml-0 md:ml-0">
        {/* Top Bar (Mobile Only) */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-green-900 p-2 rounded-md hover:bg-green-100"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-green-900">Admin Dashboard</h1>
        </div>

        {/* Dashboard content */}
        <Dashboard />
      </main>
    </div>
  );
}
