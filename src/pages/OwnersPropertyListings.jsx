import { Clock, Bell, Heart, Settings, LogOut, X, Trash2 } from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { useContext } from "react";
import Graph from "../components/Graph.jsx";
import RecentActivity from "../components/RecentActivity.jsx";
import InboxInquiry from "../components/InboxInquiry.jsx";

export default function OwnersPropertyListings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Utility to check if a link is active
  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";
  const appointments = [
    {
      message:
        "John smith has booked a property viewing on Tuesday, Aug 20 at 2:00pm. Please review thw details in your dashboard",
      title: "New appointment booking",
    },
    {
      message:
        "Your scheduled appointment with John smith for Victoria island duplex on Friday, August 23 at am has been confirmed.",
      title: "Appointment Confirmation",
    },
    {
      message:
        "John smith has rescheduled  the tour for banana island villa to Saturday, August 24 at 4:00pm. Updated details are available in your calendar.",
      title: "New appointment booking",
    },
    {
      message:
        "John smith has rescheduled  the tour for banana island villa to Saturday, August 24 at 4:00pm. Updated details are available in your calendar.",
      title: "Appointment cancellation",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
        <div>
          {/* Menu */}
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/owners-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white  ${isActive(
                "/owners-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard </span>
            </button>

            <button
              onClick={() => navigate("/owners-listings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                "/owners-listings"
              )}`}
            >
              <Bell size={18} />
              <span>My Listings</span>
            </button>

            <button
              onClick={() => navigate("/owners-saved-property")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg  hover:text-green-900 hover:bg-white  ${isActive(
                "/owners-saved-property"
              )}`}
            >
              <Heart size={18} />
              <span>My saved property</span>
            </button>
            <button
              onClick={() => navigate("/owners-documents")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/owners-documents"
              )}`}
            >
              <Heart size={18} />
              <span>My-documents</span>
            </button>
            <button
              onClick={() => navigate("/owners-agreement")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/owners-agreement"
              )}`}
            >
              <Heart size={18} />
              <span>New tenancy agreement</span>
            </button>

            <button
              onClick={() => navigate("/owners-settings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg  hover:text-green-900 hover:bg-white ${isActive(
                "/owners-settings"
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
            onClick={() => navigate("/agents-form")}
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
        <div className="flex gap-[27px] max-w-7xl">
          <div className="max-w-2xl  w-full border rounded-xl mt-[27px]  bg-white">
            {/* Section header (only once, not inside map) */}
            <div className="flex justify-between mt-[27px] px-[20px] py-[12px]">
              <h1 className="font-jakarta text-[30px] leading-[30px] font-bold">
                Appointments
              </h1>
              <button className="font-jakarta text-[#28563a] text-[16px] font-medium hover:text-black transition">
                View all
              </button>
            </div>
            <hr className="border-t border-gray-400 mt-2" />{" "}
            {/* List of appointments */}
            {appointments.map((appointment, index) => (
              <div className="flex">
                <div key={index} className="px-[20px] py-[12px]">
                  <p className="font-jakarta text-[#08110C]-700 text-[20px] font-semibold">
                    {appointment.title}
                  </p>
                  <li>
                    <p className="font-jakarta font-normal text-[14px] w-[500px] text-wrap leading-[21px] text-[#313131]">
                      {appointment.message}
                    </p>
                  </li>
                </div>
                <button className="font-jakarta text-[#28563a] text-[16px] font-medium hover:text-black transition">
                  See detail
                </button>
              </div>
            ))}
          </div>
          <div>
            <InboxInquiry />
          </div>
        </div>
      </main>
    </div>
  );
}
