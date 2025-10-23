import {
  Clock,
  Bell,
  Heart,
  LogOut,
  X,
  Trash2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState } from "react";
import UserManagement from "./AdminUser.jsx";

export default function AdminUserMgt() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col justify-between transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div>
          {/* Menu */}
          <nav className="mt-[85px] space-y-1">
            {[
              { path: "/admin-dashboard", label: "Dashboard", icon: <Clock size={18} /> },
              { path: "/admin-user-mgt", label: "User Management", icon: <Bell size={18} /> },
              { path: "/admin-properties", label: "Property Management", icon: <Heart size={18} /> },
              { path: "/admin-agents-mgt", label: "Estate Agents Management", icon: <Heart size={18} /> },
              { path: "/admin-payments-transactions", label: "Payments & Transactions", icon: <Heart size={18} /> },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                  item.path
                )}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
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
            <div className="flex flex-col">
              <p className="font-medium">
                {user?.firstName || "Charles"} {user?.lastName || "Doe"}
              </p>
              <p className="text-sm text-gray-300">
                {user?.email || "email@gmail.com"}
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-0 w-full">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden bg-white p-4 shadow mb-4 rounded-md">
          <h1 className="text-lg font-semibold text-gray-800">
            User Management
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-green-800 text-white"
          >
            ☰
          </button>
        </div>

        {/* Main Section */}
        <UserManagement />
      </main>
    </div>
  );
}
