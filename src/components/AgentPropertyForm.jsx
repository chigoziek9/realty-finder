import { Clock, Bell, Heart, Settings, LogOut, X, Trash2 } from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import Graph from "../components/Graph.jsx";
import RecentActivity from "../components/RecentActivity";
import InboxInquiry from "../components/InboxInquiry.jsx";
import { Link } from "lucide-react";

export default function AgentPropertyForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Utility to check if a link is active
  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

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
              onClick={() => navigate("/agents-property")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                "/agents-property"
              )}`}
            >
              <Heart size={18} />
              <span>Document Compliance</span>
            </button>
            <button
              onClick={() => navigate("/agents-document")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                "/agents-document"
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
      <main className="flex-1 p-[60px]">
        <div>
          <h1>List Property</h1>
          <p className="mt-[8px]"> Showcase your property to thousands of buyers and renters. List today and get noticed fast.</p>
           <button className="bg-green-900 text-white px-8 py-2 rounded hover:bg-green-800 transition mt-[16px]">
              View Listed Property
            </button>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          {/* Basic Information */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold">
            Basic information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <input
              type="text"
              placeholder="Property title*"
              className="border rounded px-3 py-2"
            />
            <select className="border rounded px-3 py-2">
              <option>Select an option</option>
            </select>
            <input
              type="text"
              placeholder="Price"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="SqFt*"
              className="border rounded px-3 py-2"
            />
            <select className="border rounded px-3 py-2">
              <option>Select an option</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Select an option</option>
            </select>
          </div>

          {/* Location */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <input
              type="text"
              placeholder="Enter address"
              className="border rounded px-3 py-2"
            />
            <select className="border rounded px-3 py-2">
              <option>Choose state</option>
            </select>
            <input
              type="text"
              placeholder="Postal code"
              className="border rounded px-3 py-2"
            />
          </div>

          {/* Property Gallery */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Property gallery
          </h2>
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-12 text-center text-gray-500">
            Drop files here to upload
          </div>

          {/* Detailed Information */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Detailed information
          </h2>
          <textarea
            placeholder="Description"
            rows={5}
            className="w-full border rounded px-3 py-2 mt-4"
          ></textarea>

          {/* Features */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Features (optional)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
            {[
              "Free parking",
              "Air condition",
              "Laundry room",
              "Swimming pool",
              "Lobby/sit out",
              "Window covering",
              "Alarm",
              "Bar",
            ].map((feature, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>{feature}</span>
              </label>
            ))}
          </div>

          {/* Contact Detail */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Contact detail
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <input
              type="text"
              placeholder="Name"
              className="border rounded px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email address*"
              className="border rounded px-3 py-2"
            />
            <input
              type="tel"
              placeholder="Phone*"
              className="border rounded px-3 py-2"
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button className="bg-green-900 text-white px-8 py-2 rounded hover:bg-green-800 transition">
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
