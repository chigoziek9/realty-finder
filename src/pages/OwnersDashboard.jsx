// src/pages/OwnersDashboard.jsx
import { useState, useMemo, useRef, useEffect } from "react";
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
import { useContext } from "react";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  TimeScale
);

/**
 * OwnersDashboard.jsx
 * - Sidebar (collapsible on mobile)
 * - Hello Merit header (no search nav)
 * - 3 stat cards (Active listing, Saved properties, Listing views)
 * - Property Views Chart (30 days) using Chart.js
 * - Market Insights panel (dynamic array inside component)
 * - Active listings table
 *
 * TailwindCSS is used for styling. Adjust classes if needed.
 */

export default function OwnersDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext) || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active link helper
  const isActive = (path) =>
    location.pathname === path ? "bg-white text-green-900 font-medium" : "hover:bg-green-800";

  // ---------- Stat cards (screenshot values) ----------
  const stats = {
    activeListing: 45678,
    savedProperties: 2405,
    listingViews: 10353,
  };

  // ---------- Market Insights (dynamic local array) ----------
  const insights = [
    { date: "Feb 12", text: "3-bedroom flats in Kubwa saw 15% price increase this month." },
    { date: "Feb 11", text: "3-bedroom flats in Kubwa saw 15% price increase this month." },
    { date: "Feb 07", text: "3-bedroom flats in Kubwa saw 15% price increase this month." },
    // Add more items as needed
  ];

  // ---------- Chart data: 30 days dynamic example ----------
  // Create labels for last 30 days (1..30 or dates)
  const labels = useMemo(() => {
    // you can replace with actual date strings
    return Array.from({ length: 30 }, (_, i) => (i + 1).toString());
  }, []);

  // Example: generate a sample dataset (replace with your API data later)
  const generateSampleData = () => {
    // smooth-ish sample numbers
    const base = 180;
    const arr = [];
    for (let i = 0; i < 30; i++) {
      // small random walk
      const variance = Math.round(Math.sin(i / 3) * 30 + Math.random() * 30 - 10);
      arr.push(Math.max(30, base + variance));
    }
    return arr;
  };

  const [chartDataPoints, setChartDataPoints] = useState(generateSampleData());

  // To mimic dynamic data, you can later fetch API and call setChartDataPoints(data)
  // --- Chart.js config ---
  const lineRef = useRef(null);

  // Create gradient for the chart fill
  const chartData = useMemo(() => {
    const ctx = lineRef?.current?.canvas?.getContext("2d");
    let gradient = null;
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "rgba(96,165,250,0.18)"); // tailwind blue-400-ish
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
          borderColor: "#6366f1", // indigo-500-ish
          tension: 0.35,
          pointRadius: 3.5,
          pointBackgroundColor: "#6366f1",
        },
      ],
    };
  }, [labels, chartDataPoints, lineRef]);

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

  // ---------- Active listings example ----------
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

  // optional effect: update gradient when ref becomes available
  useEffect(() => {
    // trigger a re-render of chartData (since gradient depends on canvas context)
    if (lineRef.current) {
      setChartDataPoints((d) => [...d]); // re-set same data to rebuild memo
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineRef.current]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`z-30 fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-72 w-64 bg-green-900 text-white flex flex-col`}
      >
        <div className="px-6 py-6 border-b border-green-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold">RF</div>
            <div className="text-lg font-bold">RealtyFinder</div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-1 flex-1">
          <button
            onClick={() => navigate("/owners-dashboard")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive("/owners-dashboard")}`}
          >
            <Clock size={18} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => navigate("/owners-listings")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive("/owners-listings")}`}
          >
            <Bell size={18} />
            <span>My listings</span>
          </button>

          <button
            onClick={() => navigate("/owners-saved-property")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive("/owners-saved-property")}`}
          >
            <Heart size={18} />
            <span>My saved property</span>
          </button>

          <button
            onClick={() => navigate("/owners-documents")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive("/owners-documents")}`}
          >
            <FileText size={18} />
            <span>My documents</span>
          </button>

          <button
            onClick={() => navigate("/owners-agreement")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive("/owners-agreement")}`}
          >
            <FileText size={18} />
            <span>New tenancy agreement</span>
          </button>

          <button
            onClick={() => navigate("/owners-settings")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left border-t border-green-800 mt-4 ${isActive("/owners-settings")}`}
          >
            <Settings size={18} />
            <span>Account settings</span>
          </button>
        </nav>

        <div className="p-6 border-t border-green-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
              {user?.firstName?.[0] || "C"}
            </div>
            <div>
              <p className="font-medium">{user?.firstName || "Merit"}</p>
              <p className="text-xs text-green-200">{user?.email || "email@gmail.com"}</p>
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

      {/* Content wrapper */}
      <div className="flex-1 lg:pl-72">
        {/* header */}
        <header className="flex items-center justify-between px-6 py-6 bg-white border-b">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-bold">Hello {user?.firstName || "Merit"}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/agents-form")} className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md font-semibold shadow">
              + List Property
            </button>
            <button className="p-2 rounded hover:bg-gray-100"><Bell size={18} /></button>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">{(user?.firstName || "Merit").slice(0, 2).toUpperCase()}</div>
          </div>
        </header>

        {/* main content */}
        <main className="p-6">
          {/* stat cards: 3 from screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-sm text-gray-600">Active listing</p>
              <p className="text-4xl font-bold mt-4">{stats.activeListing.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-3">+20% month over month</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-sm text-gray-600">Saved properties</p>
              <p className="text-4xl font-bold mt-4">{stats.savedProperties.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-3">+33% month over month</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-sm text-gray-600">Listing views</p>
              <p className="text-4xl font-bold mt-4">{stats.listingViews.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-3">-8% month over month</p>
            </div>
          </div>

          {/* graph and market insights */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">Property views</h2>
                <div className="text-sm text-gray-500">Your list at Kubwa got 12 new views today.</div>
              </div>

              <div className="mt-4 h-72 relative">
                <Line ref={lineRef} data={chartData} options={chartOptions} />
              </div>
            </div>

            <aside className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-3">Market Insights</h3>
              <div className="text-sm text-gray-500 mb-3">This Week</div>

              <div className="divide-y divide-gray-100">
                {insights.map((it, idx) => (
                  <div key={idx} className="py-3 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-xs text-gray-400">{it.date}</div>
                      <div className="text-sm">{it.text}</div>
                    </div>
                    <div className="ml-3">
                      <button className="p-1 rounded-full border border-gray-100 text-green-700">⤴︎</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <div>Showing 1 to {insights.length} of {insights.length}</div>
                <div className="flex gap-2">
                  <button className="p-1 rounded hover:bg-gray-100">◀</button>
                  <button className="p-1 rounded hover:bg-gray-100">▶</button>
                </div>
              </div>
            </aside>
          </div>

          {/* Active listings */}
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-lg">Active listings</h3>
              <div className="flex items-center gap-3">
                <button className="text-sm bg-gray-50 px-3 py-2 rounded">Filters</button>
                <button onClick={() => navigate("/agents-form")} className="text-sm bg-green-700 text-white px-3 py-2 rounded">+ List Property</button>
              </div>
            </div>

            <table className="w-full text-left">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="px-6 py-3">Property</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Views</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id} className="align-top border-t">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded bg-gray-200 flex items-center justify-center text-xs">img</div>
                        <div>
                          <div className="font-medium">{l.title}</div>
                          <div className="text-xs text-gray-500">Short address / area</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${statusBadge(l.status)}`}>
                        {l.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">{l.views.toLocaleString()} views</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-gray-600">
                        <button title="Edit" onClick={() => alert("Edit clicked")}>✏️</button>
                        <button title="View" onClick={() => alert("View clicked")}>👁️</button>
                        <button title="Delete" onClick={() => alert("Delete clicked")} className="text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-4 border-t text-sm text-gray-500">Showing 1–10 from {listings.length}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
