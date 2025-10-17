import { Clock, Bell, Heart, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function AdminPaymentsOverview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  const transactions = [
    {
      id: "TRAN-001",
      name: "Steven Jones",
      total: "₦100,000",
      paid: "₦40,000",
      balance: "₦60,000",
      status: "On Track",
    },
    {
      id: "TRAN-002",
      name: "Maggie Bennet",
      total: "₦100,000",
      paid: "₦40,000",
      balance: "₦60,000",
      status: "On Track",
    },
    {
      id: "TRAN-003",
      name: "Samuel Giggs",
      total: "₦100,000",
      paid: "₦40,000",
      balance: "₦60,000",
      status: "On Track",
    },
    {
      id: "TRAN-004",
      name: "Samuel Carter",
      total: "₦100,000",
      paid: "₦40,000",
      balance: "₦60,000",
      status: "On Track",
    },
    {
      id: "TRAN-005",
      name: "Larry Gaga",
      total: "₦100,000",
      paid: "₦40,000",
      balance: "₦60,000",
      status: "On Track",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-900 text-white flex flex-col justify-between">
        <div>
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
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
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
              <span>Payments & transactions</span>
            </button>
          </nav>
        </div>

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

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/admin-payments-transactions")}
          >
            Payments & transactions
          </span>{" "}
          › <span className="text-green-800 font-medium">Transaction overview</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Transaction overview</h1>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, date, or user's action"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 font-semibold">
              <tr>
                <th className="p-4 border-b">Transaction ID</th>
                <th className="p-4 border-b">User Name</th>
                <th className="p-4 border-b">Total Amount</th>
                <th className="p-4 border-b">Amount Paid</th>
                <th className="p-4 border-b">Balance</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{t.id}</td>
                  <td className="p-4 border-b">{t.name}</td>
                  <td className="p-4 border-b">{t.total}</td>
                  <td className="p-4 border-b">{t.paid}</td>
                  <td className="p-4 border-b">{t.balance}</td>
                  <td className="p-4 border-b text-green-600 font-medium">{t.status}</td>
                  <td className="p-4 border-b text-center">
                    <button
                      onClick={() => navigate(`/admin-payment-details/${t.id}`)}
                      className="text-green-700 font-medium hover:underline"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 text-sm text-gray-600">
            <p>Showing 1–10 from 100</p>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`w-8 h-8 rounded-md ${
                    n === 1 ? "bg-green-900 text-white" : "bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="text-gray-400">…</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
