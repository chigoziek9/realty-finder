import { Clock, Bell, Heart, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function ReassignArea() {
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
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive("/admin-dashboard")}`}
            >
              <Clock size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/admin-user-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive("/admin-user-mgt")}`}
            >
              <Bell size={18} />
              <span>User Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-property-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive("/admin-property-mgt")}`}
            >
              <Heart size={18} />
              <span>Property Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-agents-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive("/admin-agents-mgt")}`}
            >
              <Heart size={18} />
              <span>Estate Agents Management</span>
            </button>

            <button
              onClick={() => navigate("/reassign-area")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive("/reassign-area")}`}
            >
              <Heart size={18} />
              <span>Re-Assign Area</span>
            </button>

            <button
              onClick={() => navigate("/admin-payments-transactions")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive("/admin-payments-transactions")}`}
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
            <div className="flex-colunm">
              <p className="font-medium ">
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
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-6">Re-assign area</h2>

        {/* Form Section */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Agent Name</label>
            <input
              type="text"
              defaultValue="Adanna Chukwu"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Current Assigned Area</label>
            <input
              type="text"
              defaultValue="Ikeja, Lagos State, Teju Osho Market, Yaba"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Assigned Area</label>
            <input
              type="text"
              placeholder="Enter the new area"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="mb-6 flex items-center space-x-2">
            <input type="checkbox" id="delete-area" className="w-4 h-4 text-green-600" />
            <label htmlFor="delete-area" className="text-gray-700">
              Delete the Current Assigned Area
            </label>
          </div>

          <div className="flex space-x-4">
            <button className="px-6 py-2 border rounded-lg hover:bg-gray-200">Cancel</button>
            <button className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
              Confirm Reassignment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
