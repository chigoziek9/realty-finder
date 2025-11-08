import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch agent properties
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
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-green-900 text-white flex flex-col justify-between transform transition-transform duration-200 md:sticky md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden bg-white p-4 shadow mb-4 rounded-md">
          <h1 className="text-lg font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-green-800 text-white"
          >
            ☰
          </button>
        </div>

        {/* Header */}
        <div className="flex justify-between w-full">
          <h1 className="mt-4 text-3xl">Hello {user?.firstName}</h1>
          <button
            onClick={() => navigate("/agents-form")}
            className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            + List Property
          </button>
        </div>

        {/* Stats Boxes (Centered on mobile) */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="w-full sm:w-[240px] h-[154px] p-4 bg-white rounded-lg shadow">
            <p>Total Listings (All Status)</p>
            <p className="text-5xl font-bold mt-3">
              {loading ? "..." : properties.length}
            </p>
          </div>

          <div className="w-full sm:w-[240px] h-[154px] p-4 bg-white rounded-lg shadow">
            <p>Total Clients</p>
            <p className="text-5xl font-bold mt-3">25</p>
            <p className="mt-3">This Week</p>
          </div>

          <div className="w-full sm:w-[240px] h-[154px] p-4 bg-white rounded-lg shadow">
            <p>Total Inquiries</p>
            <p className="text-5xl font-bold mt-3">45</p>
            <p className="mt-3">This Week</p>
          </div>

          <div className="w-full sm:w-[240px] h-[154px] p-4 bg-white rounded-lg shadow">
            <p>Commission Earned</p>
            <p className="text-5xl font-bold mt-3">₦0</p>
            <p className="mt-3">This Week</p>
          </div>
        </div>

        {/* Graph & Recent Activity Side by Side */}
        <div className="flex flex-col md:flex-row gap-6 mt-6 max-w-7xl">
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <Graph />
          </div>
          <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
            <RecentActivity />
          </div>
        </div>

        {/* Appointments */}
        <div className="flex gap-6 flex-wrap mt-6 max-w-7xl">
          <div className="w-full max-w-2xl bg-white rounded-xl border mt-6">
            <div className="flex justify-between px-5 py-3 mt-3">
              <h1 className="text-2xl font-bold">Appointments</h1>
              <button className="text-green-900 font-medium hover:text-black">
                View all
              </button>
            </div>
            <hr className="border-t border-gray-400" />
          </div>
          <InboxInquiry />
        </div>
      </main>
    </div>
  );
}
