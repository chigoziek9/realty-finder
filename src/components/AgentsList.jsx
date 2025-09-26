import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";

export default function AgentPropertyForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [properties, setProperties] = useState([]);

  // ✅ helper to check active route
  const isActive = (path) =>
    location.pathname === path ? "bg-white text-green-900" : "text-white";

  // ✅ fetch dummy data (or API later)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let url = "/testing.json"; // ✅ default fallback
        let options = {};

        if (user?.token) {
          // If user has a token, use your real API
          url = "https://yourapi.com/api/properties/my";
          options = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
        }

        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        console.log("Fetched properties:", data);
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [user?.token]);

  // ✅ status color mapping
  const statusColors = {
    Live: "bg-green-600",
    Pending: "bg-yellow-500",
    Rejected: "bg-red-600",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
        <div>
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/agents-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/agents-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => navigate("/agents-transaction")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/agents-transaction"
              )}`}
            >
              <Bell size={18} />
              <span>Transaction & Commission</span>
            </button>

            <button
              onClick={() => navigate("/agents-client")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/agents-client"
              )}`}
            >
              <Heart size={18} />
              <span>Clients</span>
            </button>

            <button
              onClick={() => navigate("/agents-property")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/agents-property"
              )}`}
            >
              <Heart size={18} />
              <span>Document Compliance</span>
            </button>

            <button
              onClick={() => navigate("/agents-document")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/agents-document"
              )}`}
            >
              <Heart size={18} />
              <span>Property Management</span>
            </button>

            <button
              onClick={() => navigate("/account-settings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
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
              src={user?.profilePhoto || "https://via.placeholder.com/40"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="flex flex-col">
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
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">My listings</h2>
          <p className="text-gray-600 mb-4">
            View, manage, and update all your properties in one place.
          </p>

          <button className="bg-green-700 text-white px-4 py-2 rounded-lg mb-6">
            + List property
          </button>

          {/* Listings */}
          <div>
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex gap-4 border rounded-xl shadow-sm p-4 mt-4 py-14"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-100 h-70 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="flex items-center text-gray-600 text-sm">
                    <FaMapMarkerAlt className="mr-1" /> {property.address}
                  </p>

                  <div className="flex items-center gap-4 text-gray-700 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <FaBed /> {property.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {property.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRulerCombined /> {property.sqft} sq ft
                    </span>
                  </div>

                  <p className="text-green-700 font-bold text-lg mt-2">
                    {property.price}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Added: {property.dateAdded}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span
                    className={`text-white text-xs px-3 py-1 rounded-full ${
                      statusColors[property.status]
                    }`}
                  >
                    {property.status}
                  </span>

                  <div className="flex gap-2 mt-4">
                    <button className="px-3 py-1 border rounded-lg text-sm">
                      Edit
                    </button>
                    <button className="px-3 py-1 border rounded-lg text-sm">
                      Hide
                    </button>
                    <button className="px-3 py-1 border rounded-lg text-sm text-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
