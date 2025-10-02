import { Clock, Bell, Heart, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AgentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  // 📊 Weekly chart data
  const data = [
    { day: "MON", customers: 3800 },
    { day: "TUE", customers: 800 },
    { day: "WED", customers: 1150 },
    { day: "THU", customers: 600 },
    { day: "FRI", customers: 2000 },
    { day: "SAT", customers: 3000 },
    { day: "SUN", customers: 2000 },
  ];

  // 🍩 Semi-donut data
  const pieData = [
    { name: "Collected", value: 80 },
    { name: "Pending", value: 20 },
  ];
  const COLORS = ["#0D0C52", "#FF9BA6"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-900 text-white flex flex-col justify-between">
        <div>
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/admin-user-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-user-mgt"
              )}`}
            >
              <Bell size={18} />
              <span>User Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-property-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-property-mgt"
              )}`}
            >
              <Heart size={18} />
              <span>Property Management</span>
            </button>

            <button
              onClick={() => navigate("/admin-agents-mgt")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
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
              <span>Payments & Transactions</span>
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
              <p className="font-medium">
                {user?.firstName || "Charles"} {user?.lastName || "Doe"}
              </p>
              <p className="text-sm text-gray-300">
                {user?.email || "email@gmail.com"}
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          Estate agent management <span className="mx-2">›</span>{" "}
          <span className="text-green-800 font-medium">Adanna Chukwu</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Estate agent details
        </h1>

        {/* Agent Details Card */}
        <div className="bg-white rounded-lg p-6 shadow mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Agent Details</h2>
            <div className="space-x-4 text-sm">
              <button className="text-green-700 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/80"
              alt="Agent"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-800 font-medium text-lg">Adanna Chukwu</p>
              <p className="text-gray-600">📞 +234 810 000 0000</p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Assigned Area:</span> Ikeja, Lagos
                State, Teju Osho Market, Yaba
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total Customers:</span> 25
              </p>
              <button className="mt-3 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Re-Assign Area
              </button>
            </div>
          </div>
        </div>

        {/* 📊 Agent Activity Tracker */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Agent Activity Tracker
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* 🍩 Semi Donut Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800 mb-4 uppercase">Today</h3>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <p className="text-gray-500 font-medium text-lg">Total Collected</p>
              <h2 className="text-3xl font-bold mt-2">₦150,000</h2>

              <div className="flex justify-between w-full mt-6 text-center">
                <div>
                  <p className="text-sm font-semibold text-gray-800">25</p>
                  <p className="text-xs text-gray-500">Active customers</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">20</p>
                  <p className="text-xs text-gray-500">Contributions today</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">05</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* 📈 Weekly Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">
                Active Customers: <span className="text-green-800 font-bold">45</span>
              </h3>
              <p className="text-sm text-gray-500">This Week</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#0C5C3F"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#0C5C3F" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Customer List</h2>
          <input
            type="text"
            placeholder="Search by name, date, or user's action"
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Address</th>
                <th className="p-4">Daily Contribution</th>
                <th className="p-4">Paid This Week</th>
                <th className="p-4">Pending</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Lizzy Jones",
                  address: "03, Tejuosho Market, Yaba, Lagos",
                  daily: "₦500",
                  paid: "₦50,000",
                  pending: "₦5,000",
                  status: "Paid",
                },
                {
                  name: "Donald Trump",
                  address: "03, Tejuosho Market, Yaba, Lagos",
                  daily: "₦500",
                  paid: "₦50,000",
                  pending: "₦5,000",
                  status: "Delayed",
                },
                {
                  name: "Wisdom Combell",
                  address: "03, Tejuosho Market, Yaba, Lagos",
                  daily: "₦500",
                  paid: "₦50,000",
                  pending: "₦0",
                  status: "Completed",
                },
                {
                  name: "Larry James",
                  address: "03, Tejuosho Market, Yaba, Lagos",
                  daily: "₦500",
                  paid: "₦50,000",
                  pending: "₦5,000",
                  status: "Paid",
                },
              ].map((c, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-4">{c.name}</td>
                  <td className="p-4">{c.address}</td>
                  <td className="p-4">{c.daily}</td>
                  <td className="p-4">{c.paid}</td>
                  <td className="p-4">{c.pending}</td>
                  <td className="p-4">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end mt-6 space-x-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`px-3 py-1 rounded-md ${
                  n === 2
                    ? "bg-green-800 text-white"
                    : "bg-white border text-gray-700"
                }`}
              >
                {n}
              </button>
            ))}
            <button className="px-3 py-1 bg-white border text-gray-700 rounded-md">
              ...
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
