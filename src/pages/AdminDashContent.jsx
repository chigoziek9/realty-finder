import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";

export default function Dashboard() {
  const { user, token } = useContext(AuthContext) || {};
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
  ]);

  const [activeListings, setActiveListings] = useState(0);
  const [totalListings, setTotalListings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const endpoints = [
          "https://realtyfinder.onrender.com/api/properties/user/approved",
          "https://realtyfinder.onrender.com/api/properties/user/pending",
          "https://realtyfinder.onrender.com/api/properties/user/rejected",
        ];

        const responses = await Promise.all(
          endpoints.map((url) =>
            fetch(url, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        const data = await Promise.all(responses.map((res) => res.json()));
        const approved = data[0]?.data || [];
        const pending = data[1]?.data || [];
        const rejected = data[2]?.data || [];

        setActiveListings(approved.length);
        setTotalListings(approved.length + pending.length + rejected.length);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchListings();
  }, [token]);

  return (
    <div className="w-full">
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          Hello {user?.firstName || "CHIGGYY"}
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 mb-10">
          <StatCard
            title="Total Listings"
            value={loading ? "Loading..." : totalListings.toLocaleString()}
          />
          <StatCard
            title="Active Listings"
            value={loading ? "Loading..." : activeListings.toLocaleString()}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h2 className="font-semibold text-lg text-gray-800">
              Recent activity list
            </h2>
            <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100">
              Filters
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by name, date, or user's action"
            className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3">User</th>
                  <th className="p-3">User Action</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act) => (
                  <tr key={act.id} className="border-t hover:bg-gray-50">
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

          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-sm text-gray-600 gap-3">
            <p>Showing 1–10 from 100</p>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="px-2 py-1 border rounded">‹</button>
              <button className="px-3 py-1 border rounded bg-green-600 text-white">
                1
              </button>
              {[2, 3, 4, 5].map((n) => (
                <button key={n} className="px-2 py-1 border rounded">
                  {n}
                </button>
              ))}
              <button className="px-2 py-1 border rounded">…</button>
              <button className="px-2 py-1 border rounded">›</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Reusable StatCard */
function StatCard({ title, value }) {
  return (
    <div className="border rounded-xl p-6 bg-white shadow text-center">
      <p className="text-gray-600">{title}</p>
      <p className="text-3xl font-bold mt-2 break-words">{value}</p>
    </div>
  );
}
