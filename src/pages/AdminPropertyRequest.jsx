// src/pages/AdminPropertyRequest.jsx
import {
  Clock,
  Bell,
  Heart,
  Settings,
  LogOut,
  X,
  Menu,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";

export default function AdminPropertyRequest() {
  const navigate = useNavigate();
  const { user, token, logout } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [processingId, setProcessingId] = useState(null);

  // ✅ API endpoints
  const endpoints = {
    pending: "https://realtyfinder.onrender.com/api/property-requests/pending",
    approved: "https://realtyfinder.onrender.com/api/property-requests",
    rejected: "https://realtyfinder.onrender.com/api/property-requests/rejected",
  };

  // ✅ Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(endpoints[activeTab], {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        console.log("API response:", data);

        if (data && data.length > 0) {

          setRequests(data);
        } else if(data.length==0) {
          setError("No Properties Found.");
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to fetch property requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchRequests();
  }, [token, activeTab]);

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property request?"))
      return;

    try {
      setProcessingId(id);
      const res = await fetch(
        `https://realtyfinder.onrender.com/api/property-requests/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error(`Failed to delete (status: ${res.status})`);
      const result = await res.json();

      if (result.success) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
        alert("Property request deleted successfully!");
      } else {
        throw new Error(result.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Error deleting property request.");
    } finally {
      setProcessingId(null);
    }
  };

  // ✅ Approve/Reject
  const handleStatusChange = async (id, action) => {
    const endpoint = `https://realtyfinder.onrender.com/api/property-requests/${action}/${id}`;
    try {
      setProcessingId(id);
      const res = await fetch(endpoint, {
        method: "PUT",
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`${action} request failed`);
      const result = await res.json();

      if (result.success) {
        alert(`Property request ${action}d successfully!`);
        // Remove it from current tab if approved/rejected
        setRequests((prev) => prev.filter((r) => r._id !== id));
      } else {
        throw new Error(result.message || `${action} failed`);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || `Error trying to ${action} request.`);
    } finally {
      setProcessingId(null);
    }
  };

  // ✅ Active nav highlight
  const isActive = (path) =>
    window.location.pathname === path
      ? "bg-white text-green-900"
      : "hover:bg-white hover:text-green-900";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed md:static z-40 transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-64 bg-green-900 text-white flex flex-col justify-between`}
      >
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
              onClick={() => navigate("/admin-properties")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-properties"
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
              onClick={() => navigate("/admin-property-requests")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/admin-property-requests"
              )}`}
            >
              <Heart size={18} />
              <span>Property Requests</span>
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
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col w-full p-4 md:p-8 overflow-y-auto">
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-semibold text-green-900 mb-6">
            Property Requests
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-300 mb-6">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 capitalize text-lg font-medium ${
                  activeTab === tab
                    ? "text-green-800 border-b-4 border-green-800"
                    : "text-gray-500 hover:text-green-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Requests List */}
          <div className="mt-6 space-y-4">
            {loading && <p className="text-gray-600">Fetching properties...</p>}
            {error && (
              <p className="text-red-600 bg-red-100 px-4 py-2 rounded">
                {error}
              </p>
            )}
            {!loading && !error && requests.length === 0 && (
              <p className="text-gray-600">No property requests found.</p>
            )}

            {!loading &&
              !error &&
              requests.map((req) => (
                <div key={req._id} className="bg-white shadow-md rounded-lg p-6">
                  <div className="space-y-3 text-sm">
                    <p>
                      <span className="font-semibold">Type:</span>{" "}
                      {req.type || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Bedrooms:</span>{" "}
                      {req.bedrooms || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Area:</span>{" "}
                      {req.area || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(req.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`font-medium ${
                          req.status === "approved"
                            ? "text-green-600"
                            : req.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {req.status || "Pending"}
                      </span>
                    </p>
                  </div>

                  {/* ✅ Action Buttons */}
                  <div className="mt-6 flex items-center gap-4">
                    {activeTab === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "approve")
                          }
                          disabled={processingId === req._id}
                          className="flex items-center gap-2 text-green-600 font-medium hover:text-green-800"
                        >
                          <CheckCircle size={18} />
                          {processingId === req._id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          onClick={() => handleStatusChange(req._id, "reject")}
                          disabled={processingId === req._id}
                          className="flex items-center gap-2 text-yellow-600 font-medium hover:text-yellow-800"
                        >
                          <XCircle size={18} />
                          {processingId === req._id ? "Processing..." : "Reject"}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDelete(req._id)}
                      disabled={processingId === req._id}
                      className="flex items-center gap-2 text-red-600 font-medium hover:text-red-800"
                    >
                      <Trash2 size={18} />
                      {processingId === req._id
                        ? "Processing..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
