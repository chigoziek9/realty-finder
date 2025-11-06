import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Download, ArrowRight } from "lucide-react";

export default function AdminPaymentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("completed");

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-white text-green-900 font-semibold border-l-4 border-green-700"
      : "hover:bg-green-800 hover:text-white";

  const completedPayments = [
    {
      id: "TRAN-001",
      amount: "₦500,000",
      type: "Commission",
      date: "2024-12-30",
    },
    {
      id: "TRAN-002",
      amount: "₦350,000",
      type: "Commission",
      date: "2025-01-15",
    },
    {
      id: "TRAN-003",
      amount: "₦250,000",
      type: "Commission",
      date: "2025-02-05",
    },
  ];

  const paymentHistory = [
    { date: "2025-12-15", amount: "₦25,000", status: "Completed" },
    { date: "2025-12-15", amount: "₦25,000", status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col justify-between shadow-lg">
        <div>
          <div className="p-6 text-2xl font-bold border-b border-green-700">
            RealtyFinder
          </div>
          <nav className="mt-6 flex-1">
            <ul className="space-y-1">
              <li
                className={`px-6 py-3 cursor-pointer ${isActive("/admin-dashboard")}`}
                onClick={() => navigate("/admin-dashboard")}
              >
                Dashboard
              </li>
              <li
                className={`px-6 py-3 cursor-pointer ${isActive("/user-management")}`}
                onClick={() => navigate("/user-management")}
              >
                User Management
              </li>
              <li
                className={`px-6 py-3 cursor-pointer ${isActive("/admin-properties")}`}
                onClick={() => navigate("/admin-properties")}
              >
                Property Management
              </li>
              <li
                className={`px-6 py-3 cursor-pointer ${isActive("/estate-agent-management")}`}
                onClick={() => navigate("/estate-agent-management")}
              >
                Estate Agent Management
              </li>
              <li
                className={`px-6 py-3 cursor-pointer ${isActive("/admin-property-request")}`}
                onClick={() => navigate("/admin-property-request")}
              >
                Property Requests
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

      {/* Main Content */}
      <main className="flex-1 px-10 py-8 overflow-y-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-3">
          Payments & transactions <span className="mx-1">›</span> Transaction overview{" "}
          <span className="mx-1">›</span> Transaction details
        </div>

        {/* Header */}
        <h1 className="text-3xl font-semibold mb-8 text-green-900">
          Transaction Details
        </h1>

        {/* Transaction Details Card */}
        <div className="bg-white shadow-md rounded-2xl p-8 mb-10 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Payment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-gray-700">
            <p>
              <strong>Name:</strong> Samuel Charles
            </p>
            <p>
              <strong>Transaction ID:</strong> TRAN-001
            </p>
            <p>
              <strong>Transaction type:</strong> Commission
            </p>
            <p>
              <strong>Associated property:</strong> 123 Main Street, Victoria Island, Lagos
            </p>
            <p>
              <strong>Transaction amount:</strong> ₦50,000
            </p>
            <p>
              <strong>Email:</strong> email@email.com
            </p>
            <p>
              <strong>Phone:</strong> +234-123-456-7890
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-700 font-medium">Paid</span>
            </p>
            <p>
              <strong>Registration date:</strong> Sept 21, 2025
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-3 mb-8">
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition ${
              activeTab === "completed"
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed Payments
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition ${
              activeTab === "history"
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Payment History
          </button>
        </div>

        {/* Completed Payments */}
        {activeTab === "completed" && (
          <div>
            <div className="bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-green-50 text-green-900 text-sm uppercase">
                  <tr>
                    <th className="p-4 text-left">Transaction ID</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {completedPayments.map((t, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4">{t.id}</td>
                      <td className="p-4">{t.amount}</td>
                      <td className="p-4">{t.type}</td>
                      <td className="p-4">{t.date}</td>
                      <td className="p-4 flex items-center space-x-3">
                        <button className="text-green-700 font-medium hover:underline flex items-center space-x-1">
                          <span>View</span>
                          <ArrowRight size={14} />
                        </button>
                        <button className="px-3 py-1 bg-green-700 text-white rounded flex items-center space-x-2 hover:bg-green-800 text-sm">
                          <Download size={14} />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
              <span>Showing 1–3 of 3</span>
              <div className="flex space-x-1">
                <button className="px-3 py-1 rounded hover:bg-gray-100">&lt;</button>
                <button className="px-3 py-1 rounded bg-green-100 text-green-800 font-medium">
                  1
                </button>
                <button className="px-3 py-1 rounded hover:bg-gray-100">&gt;</button>
              </div>
            </div>
          </div>
        )}

        {/* Payment History */}
        {activeTab === "history" && (
          <div>
            <div className="bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-green-50 text-green-900 text-sm uppercase">
                  <tr>
                    <th className="p-4 text-left">Payment Date</th>
                    <th className="p-4 text-left">Amount Paid</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {paymentHistory.map((p, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4">{p.date}</td>
                      <td className="p-4">{p.amount}</td>
                      <td
                        className={`p-4 font-medium ${
                          p.status === "Completed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
              <span>Showing 1–2 of 2</span>
              <div className="flex space-x-1">
                <button className="px-3 py-1 rounded hover:bg-gray-100">&lt;</button>
                <button className="px-3 py-1 rounded bg-green-100 text-green-800 font-medium">
                  1
                </button>
                <button className="px-3 py-1 rounded hover:bg-gray-100">&gt;</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
