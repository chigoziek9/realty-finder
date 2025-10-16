// src/pages/UserManagement.jsx
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const tabs = ["Buyers", "Estate agents", "Property owners"];

const users = [
  { id: 1, name: "Samuel Carter", email: "email@email.com", role: "Buyer", status: "Pending", avatar: "" },
  { id: 2, name: "John Kennedy", email: "email@email.com", role: "Buyer", status: "Active", avatar: "" },
  { id: 3, name: "Lucy Jones", email: "email@email.com", role: "Buyer", status: "Inactive", avatar: "" },
  { id: 4, name: "Micheal Donald", email: "email@email.com", role: "Buyer", status: "Active", avatar: "" },
  { id: 5, name: "Peace Patrick", email: "email@email.com", role: "Buyer", status: "Active", avatar: "" },
  { id: 6, name: "Helen Paul", email: "email@email.com", role: "Buyer", status: "Pending", avatar: "" },
  { id: 7, name: "Samson Green", email: "email@email.com", role: "Buyer", status: "Inactive", avatar: "" },
];

const statusColors = {
  Active: "bg-green-100 text-green-600",
  Pending: "bg-orange-100 text-orange-600",
  Inactive: "bg-red-100 text-red-600",
};

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("Buyers");

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>
      <p className="text-gray-500 mb-4 text-sm sm:text-base">
        Manage all users including buyers, agents, and property owners in one place.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm sm:text-base ${
              activeTab === tab
                ? "text-green-600 border-b-2 border-green-600 font-medium"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, date, or user's action"
          className="w-full sm:flex-1 border rounded-lg px-4 py-2 text-sm sm:text-base"
        />
        <select className="border rounded-lg px-4 py-2 text-sm sm:text-base w-full sm:w-auto">
          <option>Filter by status or role</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
          <option>Buyer</option>
          <option>Agent</option>
          <option>Owner</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left text-sm sm:text-base">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 sm:p-4">
                <input type="checkbox" />
              </th>
              <th className="p-3 sm:p-4">Name</th>
              <th className="p-3 sm:p-4 hidden md:table-cell">Email</th>
              <th className="p-3 sm:p-4 hidden md:table-cell">Role</th>
              <th className="p-3 sm:p-4">Status</th>
              <th className="p-3 sm:p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-3 sm:p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-3 sm:p-4 flex items-center gap-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-gray-400 text-xs md:hidden">{user.email}</span>
                  </div>
                </td>
                <td className="p-3 sm:p-4 hidden md:table-cell">{user.email}</td>
                <td className="p-3 sm:p-4 hidden md:table-cell">{user.role}</td>
                <td className="p-3 sm:p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${statusColors[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3 sm:p-4 text-green-600 flex items-center gap-1 cursor-pointer">
                  <span className="text-xs sm:text-sm">View</span> <FaArrowRight size={12} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-xs sm:text-sm text-gray-500 gap-3 sm:gap-0">
        <p>Showing 1–10 from 100</p>
        <div className="flex gap-1 sm:gap-2">
          <button className="px-2 sm:px-3 py-1 border rounded-lg">&lt;</button>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`px-2 sm:px-3 py-1 rounded-lg ${
                num === 1 ? "bg-green-600 text-white" : "border"
              }`}
            >
              {num}
            </button>
          ))}
          <button className="px-2 sm:px-3 py-1 border rounded-lg">...</button>
          <button className="px-2 sm:px-3 py-1 border rounded-lg">&gt;</button>
        </div>
      </div>
    </div>
  );
}
