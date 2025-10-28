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

  // 👇 For modals
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [soldModalOpen, setSoldModalOpen] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // ✅ Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          "https://realtyfinder.onrender.com/api/properties/user/pending",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
          console.log("Fetched property IDs:", filtered.map((p) => p._id));
        } else {
          setError("Unexpected API response");
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [token, user]);

  // ✅ Handle delete property
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

      if (!res.ok) throw new Error(`Failed to delete property (${res.status})`);

      const result = await res.json();
      if (result.success) {
        setProperties((prev) => prev.filter((p) => p._id !== propertyId));
        alert("Property deleted successfully!");
      } else {
        throw new Error(result.message || "Delete failed");
      }
    } catch (err) {
      console.error("Error deleting property:", err);
      alert(err.message || "An error occurred while deleting property.");
    } finally {
      setDeleting(null);
    }
  };

  // ✅ Handle Sold submission
  const handleSoldSubmit = (e) => {
    e.preventDefault();
    console.log("Buyer details:", buyerDetails);
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
        {/* ===== Mobile Close Button ===== */}
        <div className="flex items-center justify-between px-6 py-4 md:hidden border-b border-green-800">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* ===== Sidebar Menu ===== */}
        <nav className="mt-[85px] space-y-1 flex-1 overflow-y-auto">
          <button
            onClick={() => navigate("/agents-dashboard")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/agents-dashboard"
            )}`}
          >
            <Clock size={18} />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => navigate("/agents-transaction")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/agents-transaction"
            )}`}
          >
            <Bell size={18} />
            <span>Transaction & Commission</span>
          </button>

          <button
            onClick={() => navigate("/agents-client")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/agents-client"
            )}`}
          >
            <Heart size={18} />
            <span>Clients</span>
          </button>

          <button
            onClick={() => navigate("/agents-property")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/agents-property"
            )}`}
          >
            <Heart size={18} />
            <span>Document Compliance</span>
          </button>

          <button
            onClick={() => navigate("/agents-document")}
            className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition ${isActive(
              "/agents-document"
            )}`}
          >
            <Heart size={18} />
            <span>Property Management</span>
          </button>

          <button
            onClick={() => navigate("/account-settings")}
            className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg transition ${isActive(
              "/account-settings"
            )}`}
          >
            <Settings size={18} />
            <span>Account Settings</span>
          </button>
        </nav>

        {/* ===== User Info ===== */}
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

      {/* ===== Overlay (mobile only) ===== */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col w-full p-4 md:p-8 overflow-y-auto">
        {/* ===== Top Nav (Mobile) ===== */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-green-900 p-2 rounded-md hover:bg-green-100"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-green-900">
            Pending Properties
          </h1>
        </div>

        {/* ===== Property Listings ===== */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Pending Listings</h2>
          <p className="text-gray-600 mb-4">
            View and manage properties awaiting approval.
          </p>

          {loading && (
            <p className="text-gray-500 text-center">Loading properties...</p>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && !error && properties.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              No pending properties found.
            </p>
          )}

          <div className="space-y-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="flex flex-col md:flex-row gap-4 border rounded-xl shadow-sm p-4 bg-white"
              >
                {/* Property Image */}
                <img
                  src={
                    property.images?.[0] ||
                    "https://placehold.co/300x200?text=No+Image"
                  }
                  alt={property.title}
                  className="w-full md:w-48 h-48 object-cover rounded-lg"
                />

                {/* Property Info */}
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
                    ID: {property._id}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Created: {new Date(property.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Status + Actions */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between">
                  <span
                    className={`text-white text-xs px-3 py-1 rounded-full ${
                      statusColors[property.approvalStatus] || "bg-gray-400"
                    }`}
                  >
                    {property.approvalStatus || "Unknown"}
                  </span>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setSoldModalOpen(true)}
                      className="px-3 py-1 border rounded-lg text-green-800 text-sm hover:bg-yellow-200"
                    >
                      Sold
                    </button>
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
        </div>
      </main>

      {/* ===== Property Details Modal ===== */}
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

      {/* ===== SOLD FORM MODAL ===== */}
      {soldModalOpen && (
        <>
          <div
            onClick={() => setSoldModalOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <form
              onSubmit={handleSoldSubmit}
              className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
            >
              <button
                onClick={() => setSoldModalOpen(false)}
                type="button"
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Buyer Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={buyerDetails.firstName}
                  onChange={(e) =>
                    setBuyerDetails({ ...buyerDetails, firstName: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={buyerDetails.lastName}
                  onChange={(e) =>
                    setBuyerDetails({ ...buyerDetails, lastName: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={buyerDetails.email}
                  onChange={(e) =>
                    setBuyerDetails({ ...buyerDetails, email: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={buyerDetails.phone}
                  onChange={(e) =>
                    setBuyerDetails({ ...buyerDetails, phone: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-800 text-white py-2 mt-6 rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
