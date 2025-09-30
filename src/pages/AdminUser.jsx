// src/pages/UserManagement.jsx
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const tabs = ["Buyers", "Estate agents", "Property owners"];

const users = [
  { id: 1, name: "Samuel Carter", email: "email@email.com", role: "Buyer", status: "Pending", avatar: "" },
  { id: 2, name: "John kennedy", email: "email@email.com", role: "Buyer", status: "Active", avatar: "" },
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
    <div className="p-6">
      <h1 className="text-2xl font-bold">User management</h1>
      <p className="text-gray-500 mb-4">
        Manage all users including buyers, agents, and property owners in one place.
      </p>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab ? "text-green-600 border-b-2 border-green-600 font-medium" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, date, or user's action"
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <select className="border rounded-lg px-4 py-2">
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
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4">
                <input type="checkbox" />
              </th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 flex items-center gap-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-green-600 flex items-center gap-1 cursor-pointer">
                  View <FaArrowRight size={12} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <p>Showing 1–10 from 100</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg">&lt;</button>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`px-3 py-1 rounded-lg ${
                num === 1 ? "bg-green-600 text-white" : "border"
              }`}
            >
              {num}
            </button>
          ))}
          <button className="px-3 py-1 border rounded-lg">...</button>
          <button className="px-3 py-1 border rounded-lg">&gt;</button>
        </div>
      </div>
    </div>
  );
}
