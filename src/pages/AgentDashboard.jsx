import { Clock, Bell, Heart, Settings, LogOut, X, Trash2 } from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import Graph from "../components/Graph.jsx";
import RecentActivity from "../components/RecentActivity";

export default function AgentsDashboard() {
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
        <div className="flex justify-between w-full">
          <h1 className="mt-4 text-3xl">Hello {user?.firstName}</h1>
          <button
            onClick={() => navigate("/add-property-request-alert")}
            className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            + List Property
          </button>
        </div>
        <div className="flex gap-[27px]">
          <div className="mt-[31px] inline-block border max-w-[240px ] w-[240px] h-[154px]  p-[19px] ">
            <p className="">Total Listing </p>
            <p className="text-5xl  font-bold mt-[13px]">48</p>

            <p className="mt-[13.31px] mb-3">This Week</p>
          </div>
          <div className="mt-[31px] inline-block border max-w-[216px ] w-[240px] h-[154px]  p-[19px] ">
            <p className="">Total Clients </p>
            <p className="text-5xl  font-bold mt-[13px]">25</p>

            <p className="mt-[13.31px] mb-3">This Week</p>
          </div>
          <div className="mt-[31px] inline-block border max-w-[216px ] w-[240px] h-[154px]  p-[19px] ">
            <p className="">Total Inquiries </p>
            <p className="text-5xl  font-bold mt-[13px]">45</p>

            <p className="mt-[13.31px] mb-3">This Week</p>
          </div>
          <div className="mt-[31px] inline-block border max-w-[216px ] w-[240px] h-[154px]  p-[19px] ">
            <p className="">Commision Earned </p>
            <p className="text-5xl  font-bold mt-[13px]">0</p>

            <p className="mt-[13.31px] mb-3">This Week</p>
          </div>
        </div>

      {/* Graph left and right side */}
        <div className="max-w-7xl mt-[24px] flex gap-[27px]"> 
          <Graph />
          <div>
             <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}
