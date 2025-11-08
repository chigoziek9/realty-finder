import { useState, useContext, useEffect } from "react";
import {
  Clock,
  Bell,
  Heart,
  LogOut,
  X,
  Menu,
  CheckCircle,
  XCircle,
  Trash2,
  Users,
  Building,
  ClipboardList,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function AdminPropertyRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [processingId, setProcessingId] = useState(null);

  const endpoints = {
    pending: "https://realtyfinder.onrender.com/api/property-requests/pending",
    approved: "https://realtyfinder.onrender.com/api/property-requests",
    rejected: "https://realtyfinder.onrender.com/api/property-requests/rejected",
  };

  const navItems = [
    { label: "Dashboard", path: "/admin-dashboard", icon: Clock },
    { label: "User Management", path: "/admin-user-mgt", icon: Users },
    { label: "Property Management", path: "/admin-properties", icon: Building },
    { label: "Estate Agent Management", path: "/admin-agents-mgt", icon: Bell },
    { label: "Property Requests", path: "/admin-property-requests", icon: ClipboardList },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-semibold"
      : "hover:bg-green-800";

  // Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(endpoints[activeTab], {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          cache: "no-cache",
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setRequests(data || []);
        if (!data || data.length === 0) setError("No property requests found.");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch property requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchRequests();
  }, [token, activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property request?")) return;
    try {
      setProcessingId(id);
      const res = await fetch(`https://realtyfinder.onrender.com/api/property-requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok && result.success) {
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

  const handleStatusChange = async (id, action) => {
    try {
      setProcessingId(id);
      const res = await fetch(`https://realtyfinder.onrender.com/api/property-requests/${action}/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok && result.success) {
        alert(`Property request ${action}d successfully!`);
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

  return (
    <div className="flex min-h-screen bg-gray-100 relative overflow-hidden">
      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden md:flex w-72 bg-green-900 text-white flex-col justify-between fixed inset-y-0">
        <div className="flex flex-col flex-1 overflow-y-auto mt-10">
          <div className="mb-6 px-6">
            <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
          </div>
          <nav className="space-y-1">
            {navItems.map(({ label, path, icon: Icon }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition-colors duration-200 ${isActive(path)}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Info */}
        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img src={user?.profilePic || "https://via.placeholder.com/40"} alt="profile" className="w-10 h-10 rounded-full object-cover border" />
            <div>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-gray-300 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== Mobile Sidebar ===== */}
      {sidebarOpen && (
        <>
          <aside className="fixed inset-y-0 left-0 w-72 bg-green-900 text-white z-50 flex flex-col justify-between shadow-xl transition-transform transform translate-x-0">
            <div className="flex items-center justify-between p-4 border-b border-green-800">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300"><X size={24} /></button>
            </div>
            <nav className="mt-6 space-y-1 px-4 flex-1 overflow-y-auto">
              {navItems.map(({ label, path, icon: Icon }) => (
                <button
                  key={path}
                  onClick={() => { navigate(path); setSidebarOpen(false); }}
                  className={`flex w-full items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive(path)}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
            <div className="p-6 border-t border-green-800">
              <div className="flex items-center space-x-3">
                <img src={user?.profilePic || "https://via.placeholder.com/40"} alt="profile" className="w-10 h-10 rounded-full object-cover border" />
                <div>
                  <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-sm text-gray-300 truncate">{user?.email}</p>
                </div>
              </div>
              <button onClick={logout} className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </aside>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
        </>
      )}

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col w-full md:ml-72 transition-all duration-300 overflow-y-auto p-4 md:p-8">
        {/* Top Bar Mobile */}
        <div className="flex items-center justify-between md:hidden bg-white p-4 shadow mb-4 rounded-md">
          <button onClick={() => setSidebarOpen(true)} className="text-green-900 p-2 rounded-md hover:bg-green-100"><Menu size={24} /></button>
          <h1 className="text-lg font-semibold text-green-900">Property Requests</h1>
          <div className="w-8" />
        </div>

        <h1 className="text-2xl font-semibold text-green-900 mb-6">Property Requests</h1>

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
          {error && <p className="text-red-600 bg-red-100 px-4 py-2 rounded">{error}</p>}
          {!loading && !error && requests.length === 0 && <p className="text-gray-600">No property requests found.</p>}

          {!loading &&
            !error &&
            requests.map((req) => (
              <div key={req._id} className="bg-white shadow-md rounded-lg p-6">
                <div className="space-y-3 text-sm">
                  <p><span className="font-semibold">Type:</span> {req.type || "N/A"}</p>
                  <p><span className="font-semibold">Bedrooms:</span> {req.bedrooms || "N/A"}</p>
                  <p><span className="font-semibold">Area:</span> {req.area || "N/A"}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(req.createdAt).toLocaleDateString()}</p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={`font-medium ${
                      req.status === "approved" ? "text-green-600" :
                      req.status === "rejected" ? "text-red-600" : "text-yellow-600"
                    }`}>{req.status || "Pending"}</span>
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  {activeTab === "pending" && (
                    <>
                      <button onClick={() => handleStatusChange(req._id, "approve")} disabled={processingId === req._id} className="flex items-center gap-2 text-green-600 font-medium hover:text-green-800">
                        <CheckCircle size={18} />
                        {processingId === req._id ? "Processing..." : "Approve"}
                      </button>
                      <button onClick={() => handleStatusChange(req._id, "reject")} disabled={processingId === req._id} className="flex items-center gap-2 text-yellow-600 font-medium hover:text-yellow-800">
                        <XCircle size={18} />
                        {processingId === req._id ? "Processing..." : "Reject"}
                      </button>
                    </>
                  )}

                  <button onClick={() => handleDelete(req._id)} disabled={processingId === req._id} className="flex items-center gap-2 text-red-600 font-medium hover:text-red-800">
                    <Trash2 size={18} />
                    {processingId === req._id ? "Processing..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
