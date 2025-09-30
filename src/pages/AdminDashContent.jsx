import { useState } from "react";
import { Bell } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";

export default function Dashboard() {
      const { user } = useContext(AuthContext) || {};
  const [activities] = useState([
    {
      id: 1,
      name: "Samuel Carter",
      action: "Samuel Carter added a new property",
      date: "Aug 15, 2024",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "John Kennedy",
      action: "John Kennedy added a new property",
      date: "Aug 15, 2024",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Lucy Jones",
      action: "Lucy Jones updated a new listing",
      date: "Aug 15, 2024",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "Michael Donald",
      action: "Michael Donald deleted a property",
      date: "Aug 15, 2024",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Peace Patrick",
      action: "Peace Patrick added a new agent",
      date: "Aug 15, 2024",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Helen Paul",
      action: "Helen Paul approved a payment",
      date: "Aug 15, 2024",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "Samson Green",
      action: "Samson Green added a new property",
      date: "Aug 15, 2024",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ]);

  return (
    <div className="min-h-screen ">
      

      {/* Page Content */}
      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold">Hello {user?.firstName || "CHIGGYY"}</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-10">
          <StatCard title="Total listings" value="10,353" />
          <StatCard title="Active listings" value="2050" />
          <StatCard title="Agents" value="150" />
          <StatCard title="Buyers" value="1,500" />
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-800">
              Recent activity list
            </h2>
            <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100">
              Filters
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name, date, or user's action"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3">User</th>
                  <th className="p-3">User action</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act) => (
                  <tr
                    key={act.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={act.avatar}
                        alt={act.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {act.name}
                    </td>
                    <td className="p-3">{act.action}</td>
                    <td className="p-3 text-gray-600">{act.date}</td>
                    <td className="p-3 text-right text-green-600 font-medium cursor-pointer">
                      View →
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <p>Showing 1–10 from 100</p>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border rounded">‹</button>
              <button className="px-3 py-1 border rounded bg-green-600 text-white">
                1
              </button>
              <button className="px-2 py-1 border rounded">2</button>
              <button className="px-2 py-1 border rounded">3</button>
              <button className="px-2 py-1 border rounded">4</button>
              <button className="px-2 py-1 border rounded">5</button>
              <button className="px-2 py-1 border rounded">…</button>
              <button className="px-2 py-1 border rounded">›</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Reusable stat card */
function StatCard({ title, value }) {
  return (
    <div className="border rounded-xl p-6 bg-white shadow text-center">
      <p className="text-gray-600">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
