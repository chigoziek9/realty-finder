import { useNavigate, useLocation } from "react-router-dom"; 
import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";
import profileImg from "../assets/profile.png";
import House1 from "../assets/House1.png";

export default function AgentsClients() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "bg-green-800 font-medium" : "hover:bg-green-800";

  const clientStats = {
    total: 45,
    active: 10,
    past: 33,
  };

  // ✅ Updated listings to use House1.png
  const listings = [
    { id: 1, name: "Oakwood apartments", interested: 8, active: "Active", image: House1 },
    { id: 2, name: "Seaside estate villa", interested: 8, active: "Closed", image: House1 },
  ];

  const clients = [
    { id: 1, name: "Emily Smith", request: "Requested tour", time: "5 mins ago", img: "https://via.placeholder.com/40" },
    { id: 2, name: "James Johnson", request: "Asked for docs", time: "2 hours ago", img: "https://via.placeholder.com/40" },
    { id: 3, name: "Juliet Roberts", request: "Requested tour", time: "1 day ago", img: "https://via.placeholder.com/40" },
    { id: 4, name: "Kelvin Young", request: "Requested tour", time: "3 days ago", img: "https://via.placeholder.com/40" },
    { id: 5, name: "Adara Joromie", request: "Requested tour", time: "1 week ago", img: "https://via.placeholder.com/40" },
    { id: 6, name: "Musa Ibrahim", request: "Asked for docs", time: "1 month ago", img: "https://via.placeholder.com/40" },
    { id: 7, name: "Godson Friday", request: "Asked for docs", time: "1 month ago", img: "https://via.placeholder.com/40" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-900 text-white flex flex-col justify-between">
        <div>
          <nav className="mt-6 space-y-1">
            <button onClick={() => navigate("/agents-dashboard")} className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/agents-dashboard")}`}>
              <Clock size={18} />
              <span>Dashboard overview</span>
            </button>
            <button onClick={() => navigate("/agents-transaction")} className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/agents-transaction")}`}>
              <Bell size={18} />
              <span>Transaction & Commission</span>
            </button>
            <button onClick={() => navigate("/agents-client")} className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/agents-client")}`}>
              <Heart size={18} />
              <span>Clients</span>
            </button>
            <button onClick={() => navigate("/agents-property")} className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/agents-property")}`}>
              <Heart size={18} />
              <span>Document compliance</span>
            </button>
            <button onClick={() => navigate("/agents-document")} className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive("/agents-document")}`}>
              <Heart size={18} />
              <span>Property management</span>
            </button>
            <button onClick={() => navigate("/account-settings")} className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg ${isActive("/account-settings")}`}>
              <Settings size={18} />
              <span>Account settings</span>
            </button>
          </nav>
        </div>

        {/* User Info */}
        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img src={profileImg} alt="User Avatar" className="w-10 h-10 rounded-full border" />
            <div>
              <p className="font-medium">Charles Doe</p>
              <p className="text-sm text-gray-300">email@gmail.com</p>
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
        <h1 className="text-2xl font-bold">Clients</h1>
        <p className="text-gray-600 mt-1">
          Quickly manage and engage with all your clients across active and past property listings.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm text-gray-500">Total clients</p>
            <h2 className="text-2xl font-bold">{clientStats.total}</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm text-gray-500">Active clients</p>
            <h2 className="text-2xl font-bold">{clientStats.active}</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm text-gray-500">Past clients</p>
            <h2 className="text-2xl font-bold">{clientStats.past}</h2>
          </div>
        </div>

        {/* Client Engagement by Listing */}
        <h2 className="font-semibold mt-8 mb-4">Client engagement by listing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
              <img src={listing.image} alt={listing.name} className="w-24 h-20 rounded-lg object-cover" />
              <div>
                <p className="font-medium">{listing.name}</p>
                <p className="text-sm text-gray-500">Interested {listing.interested}</p>
                <p className="text-sm text-gray-500">{listing.active}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Clients Interaction Table */}
        <h2 className="font-semibold mt-8 mb-4">Clients interaction</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Client name</th>
                <th className="p-3">Requests</th>
                <th className="p-3">Time</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">
                    <input type="checkbox" className="form-checkbox" />
                  </td>
                  <td className="p-3 flex items-center space-x-3">
                    <img src={c.img} alt={c.name} className="w-8 h-8 rounded-full" />
                    <span>{c.name}</span>
                  </td>
                  <td className="p-3">{c.request}</td>
                  <td className="p-3">{c.time}</td>
                  <td className="p-3">
                    <button className="px-4 py-1 bg-green-900 text-white rounded-lg">Start chat</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-4 flex items-center justify-between text-sm text-gray-500">
            <span>Showing 1–10 from 100</span>
            <div className="flex space-x-1">
              <button className="px-2 py-1 border rounded">&lt;</button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`px-3 py-1 border rounded ${n === 1 ? "bg-green-900 text-white" : "bg-white"}`}
                >
                  {n}
                </button>
              ))}
              <button className="px-2 py-1 border rounded">...</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
