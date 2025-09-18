import { useState } from "react";
import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function PropertyManagement() {
  const [filter, setFilter] = useState("Active");
  const [sort, setSort] = useState("Date added");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  const properties = [
    {
      id: 1,
      name: "3 bedroom flat/apartment with bq",
      status: "Pending",
      price: "₦1,500,000",
      img: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "1 bedroom flat/apartment with bq",
      status: "Live",
      price: "₦3,500,000",
      img: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      name: "7 bedroom flat/apartment with bq",
      status: "Sold",
      price: "₦1,500,000",
      img: "https://via.placeholder.com/60",
    },
    {
      id: 4,
      name: "2 bedroom flat/apartment with bq",
      status: "Live",
      price: "₦2,500,000",
      img: "https://via.placeholder.com/60",
    },
    {
      id: 5,
      name: "3 bedroom flat/apartment with bq",
      status: "Live",
      price: "₦1,800,000",
      img: "https://via.placeholder.com/60",
    },
    {
      id: 6,
      name: "3 bedroom flat/apartment with bq",
      status: "Live",
      price: "₦8,500,000",
      img: "https://via.placeholder.com/60",
    },
    {
      id: 7,
      name: "3 bedroom flat/apartment with bq",
      status: "Sold",
      price: "₦6,500,000",
      img: "https://via.placeholder.com/60",
    },
  ];

  const statusColors = {
    Live: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Sold: "bg-red-100 text-red-700",
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
              onClick={() => navigate("/account-settings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                "/account-settings"
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
            <h1 className="text-2xl font-bold">Property management</h1>
            <p className="text-gray-600 mt-1">
              Effortlessly organize, update and monitor all your property
              listings.
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800">
            + List property
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-1/3 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Sold</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option>Sort by: date added</option>
              <option>Sort by: price</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Property</th>
                <th className="p-3">Status</th>
                <th className="p-3">Price</th>
                <th className="p-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-14 h-10 rounded-md object-cover"
                    />
                    {p.name}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        statusColors[p.status]
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3">{p.price}</td>
                  <td className="p-3 text-gray-500">2.4k • 312</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Appointments + Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Appointments */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold mb-4">Appointments</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">New appointment booking</p>
                <p className="text-gray-600">
                  John smith has booked a property viewing on Tuesday, Aug 20 at
                  2:00pm.
                </p>
              </div>
              <div>
                <p className="font-medium">Appointment Confirmation</p>
                <p className="text-gray-600">
                  Your scheduled appointment with John smith for Victoria island
                  duplex on Friday, Aug 23 at 11am has been confirmed.
                </p>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold mb-4">Performance overview</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Total listings managed</span>{" "}
                <span className="font-medium">12</span>
              </li>
              <li className="flex justify-between">
                <span>Active listings</span>{" "}
                <span className="font-medium">8</span>
              </li>
              <li className="flex justify-between">
                <span>Pending/expired listings</span>{" "}
                <span className="font-medium">4</span>
              </li>
              <li className="flex justify-between">
                <span>Average views per listings</span>{" "}
                <span className="font-medium">2.1k</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
