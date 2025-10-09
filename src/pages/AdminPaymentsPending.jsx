import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Search } from "lucide-react";

export default function AdminPaymentsPending() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-white text-green-900 font-semibold border-l-4 border-green-700"
      : "hover:bg-green-800 hover:text-white";

  const transactions = [
    {
      id: "TRAN-001",
      name: "Larry Gaga",
      amount: "₦100,000",
      type: "Commission",
      date: "2025-12-01",
      status: "Pending",
    },
    {
      id: "TRAN-002",
      name: "Samuel Carter",
      amount: "₦100,000",
      type: "Commission",
      date: "2025-12-01",
      status: "Pending",
    },
    {
      id: "TRAN-003",
      name: "Stephnie Uzo",
      amount: "₦100,000",
      type: "Commission",
      date: "2025-12-01",
      status: "Pending",
    },
    {
      id: "TRAN-004",
      name: "Amed Suleman",
      amount: "₦100,000",
      type: "Commission",
      date: "2025-12-01",
      status: "Pending",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold border-b border-green-700">
            RealtyFinder
          </div>
          <nav className="mt-6 flex-1">
            <ul className="space-y-1">
              <li
                className={`px-6 py-3 cursor-pointer ${isActive(
                  "/admin-dashboard"
                )}`}
                onClick={() => navigate("/admin-dashboard")}
              >
                Dashboard
              </li>
              <li
                className={`px-6 py-3 cursor-pointer ${isActive(
                  "/user-management"
                )}`}
                onClick={() => navigate("/user-management")}
              >
                User management
              </li>
              <li
                className={`px-6 py-3 cursor-pointer ${isActive(
                  "/property-management"
                )}`}
                onClick={() => navigate("/property-management")}
              >
                Property management
              </li>
              <li
                className={`px-6 py-3 cursor-pointer ${isActive(
                  "/estate-agent-management"
                )}`}
                onClick={() => navigate("/estate-agent-management")}
              >
                Estate Agent Management
              </li>
              <li
                className={`px-6 py-3 cursor-pointer ${isActive(
                  "/admin-payments-pending"
                )}`}
                onClick={() => navigate("/admin-payments-pending")}
              >
                Payments & transactions
              </li>
            </ul>
          </nav>
        </div>

        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">Charles Doe</p>
              <p className="text-sm text-gray-300">email@gmail.com</p>
            </div>
          </div>
          <button className="mt-4 flex items-center space-x-2 text-sm text-gray-300 hover:text-white">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-3">
          Payments & transactions <span className="mx-1">›</span> Pending payments
        </div>

        {/* Page title */}
        <h1 className="text-2xl font-semibold mb-6">Pending payments</h1>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, date, or user’s action"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-left">Transaction ID</th>
                <th className="p-4 text-left">User Name</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {transactions.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{t.id}</td>
                  <td className="p-4">{t.name}</td>
                  <td className="p-4">{t.amount}</td>
                  <td className="p-4">{t.type}</td>
                  <td className="p-4">{t.date}</td>
                  <td className="p-4 text-red-600 font-medium">{t.status}</td>
                  <td
                    className="p-4 text-green-700 font-medium cursor-pointer hover:underline"
                    onClick={() => navigate(`/admin-payments-pending/${t.id}`)}
                  >
                    View ↗
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <span>Showing 1–10 from 100</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-800 font-medium">1</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100">3</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100">4</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100">...</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100">5</button>
          </div>
        </div>
      </main>
    </div>
  );
}
