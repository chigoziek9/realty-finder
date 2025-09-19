import { useState } from "react";
import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AgentsTransaction() {
  const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    
  
  const isActive = (path) =>
      location.pathname === path
        ? "bg-white text-green-900 font-medium"
        : "hover:bg-green-800";

  // 🔽 Filter states
  const [timeframe, setTimeframe] = useState("This week");
  const [propertyType, setPropertyType] = useState("Rent");
  const [status, setStatus] = useState("Pending");

  // Dummy data
  const commissions = [
    {
      id: 1,
      commission: "1.5%",
      property: "St. feb homes",
      client: "John smith",
      status: "Pending",
      amount: 5000000,
    },
    {
      id: 2,
      commission: "20%",
      property: "Banana island villa",
      client: "Patrick will",
      status: "Paid",
      amount: 8000000,
    },
    {
      id: 3,
      commission: "30%",
      property: "Lekki apartment",
      client: "Mercy okeke",
      status: "Pending",
      amount: 5000000,
    },
    {
      id: 4,
      commission: "2.4%",
      property: "Senister Villa house",
      client: "Sandra lange",
      status: "Paid",
      amount: 7000000,
    },
    {
      id: 5,
      commission: "5.5%",
      property: "Monserrate Terrace",
      client: "Lukeman john",
      status: "Cancelled",
      amount: 1500000,
    },
  ];

  const transactions = [
    {
      id: "#00123",
      property: "St. feb homes",
      client: "John smith",
      type: "Rent",
      status: "Pending",
      amount: 5000000,
      date: "12 Aug",
    },
    {
      id: "#00124",
      property: "Banana island villa",
      client: "Patrick will",
      type: "Sale",
      status: "Complete",
      amount: 8000000,
      date: "16 Aug",
    },
    {
      id: "#00125",
      property: "Lekki apartment",
      client: "Mercy okeke",
      type: "Rent",
      status: "Pending",
      amount: 5000000,
      date: "17 Aug",
    },
    {
      id: "#00126",
      property: "Senister Villa house",
      client: "Sandra lange",
      type: "Sale",
      status: "Complete",
      amount: 7000000,
      date: "15 Aug",
    },
    {
      id: "#00127",
      property: "Monserrate Terrace",
      client: "Lukeman john",
      type: "Sale",
      status: "Cancelled",
      amount: 1500000,
      date: "19 Aug",
    },
  ];

  // Chart Data
  const lineData = [
    { name: "Jan, 2025", earning: 4800 },
    { name: "Feb, 2025", earning: 7200 },
    { name: "Mar, 2025", earning: 6800 },
  ];

  const pieData = [
    { name: "Sales", value: 84.5 },
    { name: "Rentals", value: 14.2 },
  ];

  const COLORS = ["#4F46E5", "#FACC15"];

  const statusColors = {
    Paid: "bg-green-100 text-green-700",
    Complete: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
         {/* Sidebar */}
         <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
           <div>
             {/* Menu */}
             <nav className="mt-[85px] space-y-1">
               <button
                 onClick={() => navigate("/agents-dashboard")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white  ${isActive(
                   "/agents-dashboard"
                 )}`}
               >
                 <Clock size={18} />
                 <span>Dashboard Overview</span>
               </button>
   
               <button
                 onClick={() => navigate("/agents-transaction")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                   "/agents-transaction"
                 )}`}
               >
                 <Bell size={18} />
                 <span>Transaction & Commission</span>
               </button>
   
               <button
                 onClick={() => navigate("/agents-client")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white  ${isActive(
                   "/agents-client"
                 )}`}
               >
                 <Heart size={18} />
                 <span>Clients</span>
               </button>
               <button
                 onClick={() => navigate("/agents-document")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                   "/agents-document"
                 )}`}
               >
                 <Heart size={18} />
                 <span>Document Compliance</span>
               </button>
               <button
                 onClick={() => navigate("/agents-property")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                   "/agents-property"
                 )}`}
               >
                 <Heart size={18} />
                 <span>Property Management</span>
               </button>
   
               <button
                 onClick={() => navigate("/agent-settings")}
                 className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                   "/agent-settings"
                 )}`}
               >
                 <Settings size={18} />
                 <span>Account Settings</span>
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
               <div className="flex-colunm">
                 <p className="font-medium ">
                   {user?.firstName} {user?.lastName}
                 </p>
                 <p className="text-sm text-gray-300">{user?.email}</p>
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transaction & Commission</h1>
            <p className="text-gray-600 mt-1">
              Track your property transactions and monitor earned commissions
              with clear insights.
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800">
            + List property
          </button>
        </div>

        {/* 🔽 Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 bg-white p-4 rounded-lg shadow">
          {/* Time frame */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Time frame
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option>This week</option>
              <option>This month</option>
              <option>Last month</option>
            </select>
          </div>

          {/* Property type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Property type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option>Rent</option>
              <option>Sale</option>
              <option>Lease</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option>Pending</option>
              <option>Complete</option>
              <option>Paid</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm text-gray-500">Total commissions earned</p>
            <h2 className="text-2xl font-bold">₦5,000,000</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm text-gray-500">Pending commissions</p>
            <h2 className="text-2xl font-bold">₦30,000</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm text-gray-500">Highest earning property</p>
            <h2 className="text-2xl font-bold">Lekki apartment</h2>
          </div>
        </div>

        {/* Commissions Table */}
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between p-4 border-b font-medium">
            <span>Commissions</span>
            <button className="text-green-700 text-sm">View all</button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Commission %</th>
                <th className="p-3">Property Name</th>
                <th className="p-3">Client name</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Amount earned</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.commission}</td>
                  <td className="p-3">{c.property}</td>
                  <td className="p-3">{c.client}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        statusColors[c.status]
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">₦{c.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Commission Overview + Profit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Line Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Commission Overview</h2>
              <div className="flex space-x-2 text-xs">
                <button className="px-2 py-1 border rounded">7D</button>
                <button className="px-2 py-1 border rounded bg-gray-100">
                  1M
                </button>
                <button className="px-2 py-1 border rounded">3M</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="earning"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Profit</h2>
              <select className="text-xs border rounded px-2 py-1">
                <option>30 Days</option>
                <option>90 Days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between p-4 border-b font-medium">
            <span>Transactions</span>
            <button className="text-green-700 text-sm">View all</button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Property Name</th>
                <th className="p-3">Client name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="p-3">{t.id}</td>
                  <td className="p-3">{t.property}</td>
                  <td className="p-3">{t.client}</td>
                  <td className="p-3">{t.type}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        statusColors[t.status]
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3">₦{t.amount.toLocaleString()}</td>
                  <td className="p-3">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
