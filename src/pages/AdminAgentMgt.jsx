import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function AdminAgentMgt() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-900 text-white flex flex-col justify-between">
        <div>
          {/* Menu */}
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/admin-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/admin-user-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/admin-user-mgt"
              )}`}
            >
              <Bell size={18} />
              <span>User Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-property-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
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
              <span>Estate Agent Management</span>
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
            <div className="flex-col">
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Estate agent management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Monitor and support estate agents while tracking their activities and performance.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-600 mb-2">Total agents</h2>
            <p className="text-3xl font-bold">150</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-600 mb-2">Active today</h2>
            <p className="text-3xl font-bold">95</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-600 mb-2">Total collected</h2>
            <p className="text-3xl font-bold">₦50,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-600 mb-2">Pending contributions</h2>
            <p className="text-3xl font-bold">50</p>
          </div>
        </div>

        {/* Search and Add Agent Button */}
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search by name, date, or user's action"
            className="w-2/3 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={() => navigate("/admin-agent-detail")}
            className="bg-green-800 text-white px-5 py-3 rounded-md hover:bg-green-700"
          >
            Add New Agent
          </button>
        </div>

        {/* Agent Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
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
                { name: "Samuel Carter", area: "Abuja", customers: 30, collected: "₦50,000", pending: "₦5,000", date: "Aug 15, 2025" },
                { name: "Samuel Carter", area: "Lagos", customers: 25, collected: "₦60,000", pending: "₦5,000", date: "Aug 15, 2025" },
                { name: "Samuel Carter", area: "Abuja", customers: 12, collected: "₦90,000", pending: "₦5,000", date: "Aug 15, 2025" },
                { name: "Samuel Carter", area: "Benue", customers: 20, collected: "₦50,000", pending: "₦5,000", date: "Aug 15, 2025" },
              ].map((agent, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
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
        <div className="flex justify-end mt-6 space-x-2">
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
      </main>
    </div>
  );
}
