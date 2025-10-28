import { Clock, Bell, Heart, Settings, LogOut, X, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";

export default function AdminProperties() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Pending Properties");

  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const tabs = [
    "Pending Properties",
    "Approved Properties",
    "Rejected Properties",
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  // Fetch all statuses
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
        fetch("https://realtyfinder.onrender.com/api/properties/user/pending", {
          headers: { Authorization: `Bearer ${token}` },
        }),

        fetch(
          "https://realtyfinder.onrender.com/api/properties/user?approvalstatus=approved",

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        fetch(
          "https://realtyfinder.onrender.com/api/properties/admin/rejected",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();
      const rejectedData = await rejectedRes.json();

      setPending(pendingData?.data || []);
      setApproved(approvedData?.data || []);
      setRejected(rejectedData?.data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProperties();
    }
  }, [token]);

  // Approve or reject property
  const updatePropertyStatus = async (id, action) => {
    // action === "approve" or "reject"
    if (!window.confirm(`Are you sure you want to ${action} this property?`))
      return;

    try {
      setActionLoading(id);
      const endpoint =
        action === "approve"
          ? `https://realtyfinder.onrender.com/api/properties/approve/${id}`
          : `https://realtyfinder.onrender.com/api/properties/reject/${id}`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        alert(`Property ${action}d successfully!`);
        await fetchProperties();
      } else {
        alert(result.message || `Failed to ${action} property`);
      }
    } catch (err) {
      console.error(`Error updating property to ${action}:`, err);
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const renderProperties = (properties) => (
    <div className="space-y-6 mt-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        properties.map((property) => (
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

              <p className="text-xs text-gray-500 mt-1">
                Created: {new Date(property.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between">
              <span
                className={`text-white text-xs px-3 py-1 rounded-full ${
                  property.approvalStatus === "approved"
                    ? "bg-green-600"
                    : property.approvalStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {property.approvalStatus || "pending"}
              </span>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedProperty(property)}
                  className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100"
                >
                  View
                </button>

                {activeTab === "Pending Properties" && (
                  <>
                    <button
                      onClick={() =>
                        updatePropertyStatus(property._id, "approve")
                      }
                      disabled={actionLoading === property._id}
                      className="px-3 py-1 border rounded-lg text-sm text-green-600 hover:bg-green-50"
                    >
                      {actionLoading === property._id
                        ? "Processing..."
                        : "Approve"}
                    </button>

                    <button
                      onClick={() =>
                        updatePropertyStatus(property._id, "reject")
                      }
                      disabled={actionLoading === property._id}
                      className="px-3 py-1 border rounded-lg text-sm text-red-600 hover:bg-red-50"
                    >
                      {actionLoading === property._id
                        ? "Processing..."
                        : "Reject"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-900 text-white flex flex-col justify-between transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div>
          <nav className="mt-[85px] space-y-1">
            {[
              {
                path: "/admin-dashboard",
                label: "Dashboard",
                icon: <Clock size={18} />,
              },
              {
                path: "/admin-user-mgt",
                label: "User Management",
                icon: <Bell size={18} />,
              },
              {
                path: "/admin-properties",
                label: "Property Management",
                icon: <Heart size={18} />,
              },
              {
                path: "/admin-agents-mgt",
                label: "Estate Agent Management",
                icon: <Heart size={18} />,
              },
              {
                path: "/admin-payments-transactions",
                label: "Payments & Transactions",
                icon: <Heart size={18} />,
              },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                  item.path
                )}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img
              src={user?.profilePic || "https://placehold.co/40x40"}
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

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
        ></div>
      )}

      <main className="flex-1 p-4 md:p-8">
        <div className="flex items-center justify-between md:hidden bg-white p-4 shadow mb-4 rounded-md">
          <h1 className="text-lg font-semibold text-gray-800">
            Properties Management
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-green-800 text-white"
          >
            ☰
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Users Property Management
        </h1>

        <div className="flex flex-wrap gap-4 border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm sm:text-base ${
                activeTab === tab
                  ? "text-green-600 border-b-2 border-green-600 font-medium"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Pending Properties" && renderProperties(pending)}
        {activeTab === "Approved Properties" && renderProperties(approved)}
        {activeTab === "Rejected Properties" && renderProperties(rejected)}

        {selectedProperty && (
          <>
            <div
              onClick={() => setSelectedProperty(null)}
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative p-6 overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-semibold mb-3 text-green-800">
                  {selectedProperty.title}
                </h2>
                <img
                  src={
                    selectedProperty.images?.[0] ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={selectedProperty.title}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
                <p className="flex items-center text-gray-600 text-sm mb-3">
                  <FaMapMarkerAlt className="mr-2" />
                  {selectedProperty.location || "Unknown location"}
                </p>
                <div className="flex flex-wrap gap-4 text-gray-700 mb-3 text-sm">
                  <span className="flex items-center gap-1">
                    <FaBed /> {selectedProperty.bedrooms || "N/A"} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBath /> {selectedProperty.bathrooms || "N/A"} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRulerCombined /> {selectedProperty.sqft || "N/A"} sq ft
                  </span>
                </div>
                <p className="text-green-700 font-bold text-lg mb-3">
                  ₦{selectedProperty.price?.toLocaleString() || "N/A"}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  {selectedProperty.description ||
                    "No detailed description available."}
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
