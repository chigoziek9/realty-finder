import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import Graph from "../components/Graph.jsx";
import RecentActivity from "../components/RecentActivity";
import InboxInquiry from "../components/InboxInquiry.jsx";

export default function AgentsDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useContext(AuthContext);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all agent properties (approved + pending + rejected)
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const endpoints = [
          "https://realtyfinder.onrender.com/api/properties/user/approved",
          "https://realtyfinder.onrender.com/api/properties/user/pending",
          "https://realtyfinder.onrender.com/api/properties/user/rejected",
        ];

        const requests = endpoints.map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        );

        const responses = await Promise.all(requests);
        const allData = await Promise.all(responses.map((res) => res.json()));

        const allProperties = allData.flatMap((result) =>
          result.success && Array.isArray(result.data) ? result.data : []
        );

        const userEmail = user?.email?.toLowerCase();
        const userId = user?._id;

        // ✅ Filter only properties created by this agent
        const filtered = allProperties.filter(
          (p) =>
            p.createdBy?.email?.toLowerCase() === userEmail ||
            p.user?._id === userId
        );

        setProperties(filtered);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token && user) fetchAllProperties();
  }, [token, user]);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
        <div>
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/agents-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/agents-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => navigate("/agents-transaction")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/agents-transaction"
              )}`}
            >
              <Bell size={18} />
              <span>Transaction & Commission</span>
            </button>

            <button
              onClick={() => navigate("/agents-client")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
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
              className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg ${isActive(
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
            <div>
              <p className="font-medium">
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

        {/* ✅ Stats Boxes */}
        <div className="flex gap-[27px] flex-wrap">
          <div className="mt-[31px] inline-block border w-[240px] h-[154px] p-[19px] bg-white rounded-lg shadow">
            <p>Total Listings (All Status)</p>
            <p className="text-5xl font-bold mt-[13px]">
              {loading ? "..." : properties.length}
            </p>
           
          </div>

          <div className="mt-[31px] inline-block border w-[240px] h-[154px] p-[19px] bg-white rounded-lg shadow">
            <p>Total Clients</p>
            <p className="text-5xl font-bold mt-[13px]">25</p>
            <p className="mt-[13.31px] mb-3">This Week</p>
          </div>

          <div className="mt-[31px] inline-block border w-[240px] h-[154px] p-[19px] bg-white rounded-lg shadow">
            <p>Total Inquiries</p>
            <p className="text-5xl font-bold mt-[13px]">45</p>
            <p className="mt-[13.31px] mb-3">This Week</p>
          </div>

          <div className="mt-[31px] inline-block border w-[240px] h-[154px] p-[19px] bg-white rounded-lg shadow">
            <p>Commission Earned</p>
            <p className="text-5xl font-bold mt-[13px]">₦0</p>
            <p className="mt-[13.31px] mb-3">This Week</p>
          </div>
        </div>

        {/* Graph & Activity */}
        <div className="max-w-7xl mt-[24px] flex gap-[27px] flex-wrap">
          <Graph />
          <div>
            <RecentActivity />
          </div>
        </div>

        {/* Appointments */}
        <div className="flex gap-[27px] max-w-7xl flex-wrap">
          <div className="max-w-2xl w-full border rounded-xl mt-[27px] bg-white">
            <div className="flex justify-between mt-[27px] px-[20px] py-[12px]">
              <h1 className="font-jakarta text-[30px] leading-[30px] font-bold">
                Appointments
              </h1>
              <button className="font-jakarta text-[#28563a] text-[16px] font-medium hover:text-black transition">
                View all
              </button>
            </div>
            <hr className="border-t border-gray-400 mt-2" />
          </div>

          <div>
            <InboxInquiry />
          </div>
        </div>
      </main>
    </div>
  );
}
