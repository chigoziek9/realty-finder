import { Clock, Bell, Heart, Settings, LogOut, X, Trash2 } from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState } from "react";
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
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles([...files, ...Array.from(e.dataTransfer.files)]);
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
          <h1 className="text-3xl font-bold">List property</h1>
          <p className="mt-[16px]">
            Showcase your property to thousands of buyers and <br/>renters. List today and get noticed fast.
          </p>
          <button
            onClick={() => navigate("/agents-listed-property")}
            className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            View Listed Property
          </button>
        </div>

        <div className="max-w-4xl mt-[32px] bg-white p-6 rounded-lg shadow">
          {/* Basic Information */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold">
            Basic information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Property title*
              </label>
              <input type="text" className="border rounded px-3 py-2" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Status
              </label>
              <select className="border rounded px-3 py-2">
                <option>Select an option</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Price
              </label>
              <input type="text" className="border rounded px-3 py-2" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Area*
              </label>
              <input type="text" className="border rounded px-3 py-2" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Rooms
              </label>
              <select className="border rounded px-3 py-2">
                <option>Select an option</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Bathrooms
              </label>
              <select className="border rounded px-3 py-2">
                <option>Select an option</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Address
              </label>
              <input type="text" className="border rounded px-3 py-2" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                State
              </label>
              <select className="border rounded px-3 py-2">
                <option>Choose state</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Postal code
              </label>
              <input type="text" className="border rounded px-3 py-2" />
            </div>
          </div>

          {/* Property Gallery */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Property gallery
          </h2>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("fileInput").click()}
            className="border-2 border-dashed border-gray-400 rounded-lg p-12 text-center text-gray-500 cursor-pointer hover:bg-gray-50"
          >
            <p>Drop files here to upload or click to browse</p>
            <input
              id="fileInput"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {/* Preview selected files */}
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="border rounded p-2 text-sm text-gray-700 flex flex-col items-center"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded mb-2">
                      <span className="text-xs text-gray-500">File</span>
                    </div>
                  )}
                  <p className="truncate w-full text-center">{file.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Information */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Detailed information
          </h2>
          <div className="flex flex-col mt-4">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={5}
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

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
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input type="text" className="border rounded px-3 py-2" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Email address*
              </label>
              <input type="email" className="border rounded px-3 py-2" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Phone*
              </label>
              <input type="tel" className="border rounded px-3 py-2" />
            </div>
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
