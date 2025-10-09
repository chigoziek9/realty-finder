import { Clock, Bell, Heart, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function AdminPaymentsPending() {
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
      <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
        <div>
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/admin-dashboard")}`}
            >
              <Clock size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/admin-user-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/admin-user-mgt")}`}
            >
              <Bell size={18} />
              <span>User Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-property-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/admin-property-mgt")}`}
            >
              <Heart size={18} />
              <span>Property Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-agents-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/admin-agents-mgt")}`}
            >
              <Heart size={18} />
              <span>Estate Agent Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-payments-transactions")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/admin-payments-transactions")}`}
            >
              <Heart size={18} />
              <span>Payments & transactions</span>
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
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-gray-300">{user?.email}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span
            className="cursor-pointer hover:text-green-700"
            onClick={() => navigate("/admin-payments-transactions")}
          >
            Payment & transactions
          </span>
          <span>›</span>
          <span className="text-green-700 font-medium">Pending payments</span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Pending Payments
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            This section will show all pending or failed transactions awaiting admin review or confirmation.
          </p>
        </div>
      </main>
    </div>
  );
}
