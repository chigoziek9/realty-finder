// src/pages/OwnersDashboard.jsx
import { useState, useMemo, useRef, useEffect, useContext } from "react";
import {
  Clock,
  Bell,
  Heart,
  Settings,
  LogOut,
  X,
  Menu,
  FileText,
  Trash2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  TimeScale
);

export default function OwnersDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useContext(AuthContext) || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeListingsCount, setActiveListingsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch approved listings
  useEffect(() => {
    const fetchApprovedListings = async () => {
      try {
        const res = await fetch(
          "https://realtyfinder.onrender.com/api/properties/user/approved",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          const userEmail = user?.email?.toLowerCase();
          const userId = user?._id;

          const owned = result.data.filter(
            (p) =>
              p.createdBy?.email?.toLowerCase() === userEmail ||
              p.user?._id === userId
          );

          setActiveListingsCount(owned.length);
        } else {
          setActiveListingsCount(0);
        }
      } catch (err) {
        console.error("Error fetching approved listings:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && user) fetchApprovedListings();
  }, [token, user]);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  // ✅ Dashboard stats
  const stats = {
    activeListing: activeListingsCount,
    savedProperties: 2405,
    listingViews: 10353,
  };

  // ✅ Insights section
  const insights = [
    {
      date: "Feb 12",
      text: "3-bedroom flats in Kubwa saw 15% price increase this month.",
    },
    {
      date: "Feb 11",
      text: "2-bedroom apartments in Maitama up 12% this week.",
    },
    { date: "Feb 07", text: "1-bedroom flats in Garki experienced higher demand." },
  ];

  // ✅ Chart setup
  const labels = useMemo(
    () => Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    []
  );

  const generateSampleData = () => {
    const base = 180;
    return Array.from({ length: 30 }, (_, i) => {
      const variance = Math.round(Math.sin(i / 3) * 30 + Math.random() * 30 - 10);
      return Math.max(30, base + variance);
    });
  };

  const [chartDataPoints] = useState(generateSampleData());
  const lineRef = useRef(null);

  const chartData = useMemo(() => {
    const ctx = lineRef?.current?.canvas?.getContext("2d");
    let gradient = null;
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "rgba(96,165,250,0.18)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
    }

    return {
      labels,
      datasets: [
        {
          label: "Views",
          data: chartDataPoints,
          fill: true,
          backgroundColor: gradient || "rgba(96,165,250,0.12)",
          borderColor: "#6366f1",
          tension: 0.35,
          pointRadius: 3.5,
          pointBackgroundColor: "#6366f1",
        },
      ],
    };
  }, [labels, chartDataPoints]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          backgroundColor: "#fff",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          boxPadding: 6,
        },
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#6b7280", maxTicksLimit: 10 },
        },
        y: {
          grid: { color: "#eef2f7" },
          ticks: { color: "#6b7280", beginAtZero: true, maxTicksLimit: 6 },
        },
      },
    }),
    []
  );

  const listings = [
    { id: 1, title: "3 bedroom flat/apartment with bq", status: "Pending", views: 0 },
    { id: 2, title: "1 bedroom flat/apartment with bq", status: "Live", views: 500 },
    { id: 3, title: "7 bedroom flat/apartment with bq", status: "Sold", views: 10000 },
    { id: 4, title: "2 bedroom flat/apartment with bq", status: "Live", views: 1000 },
  ];

  const statusBadge = (s) => {
    if (s === "Live") return "bg-green-100 text-green-800";
    if (s === "Sold") return "bg-red-100 text-red-700";
    if (s === "Pending") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`z-30 fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:w-72 w-64 bg-green-900 text-white flex flex-col`}
      >
        <div className="px-6 py-6 border-b border-green-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold">
              RF
            </div>
            <div className="text-lg font-bold">RealtyFinder</div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-1 flex-1">
          {[
            { label: "Dashboard", icon: Clock, path: "/owners-dashboard" },
            { label: "My listings", icon: Bell, path: "/owners-listings" },
            { label: "My saved property", icon: Heart, path: "/owners-saved-property" },
            { label: "My documents", icon: FileText, path: "/owners-documents" },
            { label: "New tenancy agreement", icon: FileText, path: "/owners-agreement" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive(item.path)}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={() => navigate("/owners-settings")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left border-t border-green-800 mt-4 ${isActive(
              "/owners-settings"
            )}`}
          >
            <Settings size={18} />
            <span>Account settings</span>
          </button>
        </nav>

        {/* Profile and logout */}
        <div className="p-6 border-t border-green-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
              {user?.firstName?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-medium">{user?.firstName || "User"}</p>
              <p className="text-xs text-green-200">{user?.email || "user@example.com"}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 flex items-center gap-2 text-sm text-red-300 hover:text-red-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8 md:ml-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-4 text-green-900"
        >
          <Menu />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, {user?.firstName || "Owner"} 👋
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg p-6 shadow">
              <p className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </p>
              <p className="text-4xl font-bold mt-4">
                {loading ? "Loading..." : value.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-3">Compared to last month</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow h-72">
          <h2 className="text-lg font-semibold mb-4">Listing Views (Last 30 Days)</h2>
          <Line ref={lineRef} data={chartData} options={chartOptions} />
        </div>

        {/* Insights */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Market Insights</h2>
          <ul className="space-y-3">
            {insights.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Clock size={16} className="text-green-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Active Listings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Views</th>
                  <th className="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{listing.title}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(
                          listing.status
                        )}`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{listing.views.toLocaleString()}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
