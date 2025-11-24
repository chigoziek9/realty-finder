// src/pages/AgentPropertyForm.jsx
import {
  Clock,
  Bell,
  Heart,
  Settings,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function AgentPropertyForm() {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Modal states
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [soldModalOpen, setSoldModalOpen] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Active tab: "pending" | "approved" | "rejected"
  const [activeTab, setActiveTab] = useState("pending");

  // API endpoints
  const endpoints = {
    pending: "https://realtyfinder.onrender.com/api/properties/user/pending",
    approved: "https://realtyfinder.onrender.com/api/properties/user/approved",
    rejected: "https://realtyfinder.onrender.com/api/properties/user/rejected",
  };

  // Fetch properties depending on activeTab
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(endpoints[activeTab], {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          const userEmail = user?.email?.toLowerCase();
          const userId = user?._id;

          const filtered = result.data.filter(
            (p) =>
              p.createdBy?.email?.toLowerCase() === userEmail ||
              p.user?._id === userId
          );

          setProperties(filtered);
        } else {
          setError("Unexpected API response.");
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token && user) fetchProperties();
  }, [token, user, activeTab]);

  // Handle delete
  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      setDeleting(propertyId);
      const res = await fetch(
        `https://realtyfinder.onrender.com/api/properties/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to delete (${res.status})`);
      const result = await res.json();

      if (result.success) {
        setProperties((prev) => prev.filter((p) => p._id !== propertyId));
        alert("Property deleted successfully!");
      } else {
        throw new Error(result.message || "Delete failed");
      }
    } catch (err) {
      console.error("Error deleting property:", err);
      alert(err.message || "Error deleting property.");
    } finally {
      setDeleting(null);
    }
  };

  // Handle Sold Submission
  const handleSoldSubmit = (e) => {
    e.preventDefault();
    alert("Buyer details submitted successfully!");
    setBuyerDetails({ firstName: "", lastName: "", email: "", phone: "" });
    setSoldModalOpen(false);
  };

  const isActive = (path) =>
    window.location.pathname === path
      ? "bg-white text-green-900"
      : "hover:bg-white hover:text-green-900";

  const statusColors = {
    pending: "bg-yellow-500",
    approved: "bg-green-600",
    rejected: "bg-red-600",
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed md:static top-0 left-0 min-h-screen w-72 bg-green-900 text-white flex flex-col justify-between transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:hidden border-b border-green-800">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-[85px] space-y-1 flex-1 overflow-y-auto">
          <button
            onClick={() => navigate("/agents-dashboard")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive("/agents-dashboard")}`}
          >
            <Clock size={18} />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => navigate("/agents-transaction")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive("/agents-transaction")}`}
          >
            <Bell size={18} />
            <span>Transaction & Commission</span>
          </button>
          <button
            onClick={() => navigate("/agents-client")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive("/agents-client")}`}
          >
            <Heart size={18} />
            <span>Clients</span>
          </button>
          <button
            onClick={() => navigate("/agents-property")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive("/agents-property")}`}
          >
            <Heart size={18} />
            <span>Document Compliance</span>
          </button>
          <button
            onClick={() => navigate("/agents-document")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive("/agents-document")}`}
          >
            <Heart size={18} />
            <span>Property Management</span>
          </button>
          <button
            onClick={() => navigate("/account-settings")}
            className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg transition ${isActive("/account-settings")}`}
          >
            <Settings size={18} />
            <span>Account Settings</span>
          </button>
        </nav>

        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img
              src={user?.profilePic || "https://placehold.co/40x40"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium">
                {user?.firstName || "Agent"} {user?.lastName || ""}
              </p>
              <p className="text-sm text-gray-300">
                {user?.email || "user@email.com"}
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== Overlay (mobile) ===== */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col w-full p-4 md:p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-green-900 p-2 rounded-md hover:bg-green-100"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-green-900">
            Agent Properties
          </h1>
        </div>

        {/* ===== Tabs ===== */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
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

        {/* ===== Property Listings ===== */}
        {loading && (
          <p className="text-gray-500 text-center mt-10">
            Loading {activeTab} properties...
          </p>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && properties.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No {activeTab} properties found.
          </p>
        )}

        {!loading && !error && properties.length > 0 && (
          <div className="space-y-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="flex flex-col md:flex-row gap-4 border rounded-xl shadow-sm p-4 bg-white"
              >
                <img
                  src={
                    property.images?.[0] ||
                    "https://placehold.co/300x200?text=No+Image"
                  }
                  alt={property.title}
                  className="w-full md:w-48 h-48 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="flex items-center text-gray-600 text-sm">
                    <FaMapMarkerAlt className="mr-1" />{" "}
                    {property.location || "Unknown location"}
                  </p>
                  <div className="flex flex-wrap gap-4 text-gray-700 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <FaBed /> {property.bedrooms || "N/A"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {property.bathrooms || "N/A"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRulerCombined /> {property.sqft || "N/A"} sq ft
                    </span>
                  </div>
                  <p className="text-green-700 font-bold text-lg mt-2">
                    ₦{property.price?.toLocaleString() || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">ID: {property._id}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Created:{" "}
                    {new Date(property.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Status + Actions */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between">
                  <span
                    className={`text-white text-xs px-3 py-1 rounded-full ${
                      statusColors[activeTab] || "bg-gray-400"
                    }`}
                  >
                    {activeTab}
                  </span>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100"
                    >
                      View
                    </button>

                    {activeTab === "approved" && (
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setSoldModalOpen(true);
                        }}
                        className="px-3 py-1 border rounded-lg text-green-800 text-sm hover:bg-yellow-200"
                      >
                        Sold
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(property._id)}
                      disabled={deleting === property._id}
                      className={`px-3 py-1 border rounded-lg text-sm text-red-600 hover:bg-red-50 ${
                        deleting === property._id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {deleting === property._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ===== Sold Modal ===== */}
      {soldModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setSoldModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Enter Buyer Details</h2>
            <form onSubmit={handleSoldSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={buyerDetails.firstName}
                  onChange={(e) =>
                    setBuyerDetails((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  className="flex-1 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={buyerDetails.lastName}
                  onChange={(e) =>
                    setBuyerDetails((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  className="flex-1 px-3 py-2 border rounded"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                required
                value={buyerDetails.email}
                onChange={(e) =>
                  setBuyerDetails((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={buyerDetails.phone}
                onChange={(e) =>
                  setBuyerDetails((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
