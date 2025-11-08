import { useState, useContext } from "react";
import {
  Clock,
  Bell,
  Heart,
  LogOut,
  Menu,
  X,
  Users,
  Building,
  ClipboardList,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./AdminDashContent.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-semibold"
      : "hover:bg-green-800";

  const navItems = [
    { label: "Dashboard", path: "/admin-dashboard", icon: Clock },
    { label: "User Management", path: "/admin-user-mgt", icon: Users },
    { label: "Property Management", path: "/admin-properties", icon: Building },
    { label: "Estate Agent Management", path: "/admin-agents-mgt", icon: Bell },
    { label: "Property Requests", path: "/admin-property-request", icon: ClipboardList },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 relative overflow-hidden">
      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden md:flex w-72 bg-green-900 text-white flex-col justify-between fixed inset-y-0">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="mt-10 mb-6 px-6">
            <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
          </div>
          <nav className="space-y-1">
            {navItems.map(({ label, path, icon: Icon }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition-colors duration-200 ${isActive(
                  path
                )}`}
              >
                <Icon size={18} />
                <span>{label}</span>
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
            <div>
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-300 truncate">{user?.email}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== Mobile Sidebar (Animated) ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Slide-in Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 bg-green-900 text-white z-50 flex flex-col justify-between shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-green-800">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="mt-6 space-y-1 px-4 flex-1 overflow-y-auto">
                {navItems.map(({ label, path, icon: Icon }) => (
                  <button
                    key={path}
                    onClick={() => {
                      navigate(path);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive(
                      path
                    )}`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                ))}
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
                    <p className="text-sm text-gray-300 truncate">{user?.email}</p>
                  </div>
                </div>
                <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>

            {/* Dark Overlay */}
            <motion.div
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
            />
          </>
        )}
      </AnimatePresence>

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col w-full md:ml-72 transition-all duration-300">
        {/* ===== Top Bar (Mobile Only) ===== */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-green-900 p-2 rounded-md hover:bg-green-100"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-green-900">
            Admin Dashboard
          </h1>
          <div className="w-8" /> {/* spacer for symmetry */}
        </div>

        {/* ===== Page Content ===== */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
