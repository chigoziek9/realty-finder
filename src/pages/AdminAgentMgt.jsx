import { useState, useContext, useEffect } from "react";
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

export default function AdminAgentMgt() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Total agents
  const [totalAgents, setTotalAgents] = useState(0);
  // Active today agents
  const [activeAgentsToday, setActiveAgentsToday] = useState(0);

  // Fetch agents from API and calculate stats
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(
          "https://realtyfinder.onrender.com/api/users/role/real_estate_agent"
        );
        const data = await res.json();

        if (Array.isArray(data.users)) {
          const agents = data.users;

          // Total agents
          setTotalAgents(agents.length);

          // Active today: lastLogin within 24 hours
          const now = new Date();
          const activeToday = agents.filter((agent) => {
            if (!agent.lastLogin) return false;
            const lastLoginDate = new Date(agent.lastLogin);
            const hoursDiff = (now - lastLoginDate) / (1000 * 60 * 60);
            return hoursDiff <= 24;
          });

          setActiveAgentsToday(activeToday.length);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

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

            {/* Overlay */}
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
        {/* Top Bar (Mobile Only) */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-green-900 p-2 rounded-md hover:bg-green-100"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-green-900">
            Estate Agent Management
          </h1>
          <div className="w-8" />
        </div>

        {/* ===== Page Content ===== */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Estate Agent Management
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Monitor and support estate agents while tracking their activities
              and performance.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { title: "Total agents", value: totalAgents },
              { title: "Active today", value: activeAgentsToday },
              { title: "Total collected", value: "₦50,000" },
              { title: "Pending contributions", value: "50" },
            ].map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
                <h2 className="text-sm text-gray-600 mb-2">{card.title}</h2>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Search + Add Agent Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <input
              type="text"
              placeholder="Search by name, date, or user's action"
              className="w-full sm:w-2/3 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => navigate("/admin-agent-detail")}
              className="bg-green-800 text-white px-5 py-3 rounded-md hover:bg-green-700 w-full sm:w-auto"
            >
              Add New Agent
            </button>
          </div>

          {/* Agent Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="p-4">Agent Name</th>
                  <th className="p-4">Assigned Area</th>
                  <th className="p-4">Customers</th>
                  <th className="p-4">Collected Today</th>
                  <th className="p-4">Pending</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Samuel Carter",
                    area: "Abuja",
                    customers: 30,
                    collected: "₦50,000",
                    pending: "₦5,000",
                    date: "Aug 15, 2025",
                  },
                  {
                    name: "David James",
                    area: "Lagos",
                    customers: 25,
                    collected: "₦60,000",
                    pending: "₦5,000",
                    date: "Aug 15, 2025",
                  },
                  {
                    name: "Sarah Ben",
                    area: "Benue",
                    customers: 12,
                    collected: "₦90,000",
                    pending: "₦5,000",
                    date: "Aug 15, 2025",
                  },
                ].map((agent, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 text-sm">
                    <td className="p-4">{agent.name}</td>
                    <td className="p-4">{agent.area}</td>
                    <td className="p-4">{agent.customers}</td>
                    <td className="p-4">{agent.collected}</td>
                    <td className="p-4">{agent.pending}</td>
                    <td className="p-4">{agent.date}</td>
                    <td
                      className="p-4 text-green-700 hover:underline cursor-pointer"
                      onClick={() => navigate("/admin-agent-detail")}
                    >
                      View →
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center sm:justify-end mt-6 flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`px-3 py-1 rounded-md ${
                  n === 1
                    ? "bg-green-800 text-white"
                    : "bg-white border text-gray-700"
                }`}
              >
                {n}
              </button>
            ))}
            <button className="px-3 py-1 bg-white border text-gray-700 rounded-md">
              ...
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
