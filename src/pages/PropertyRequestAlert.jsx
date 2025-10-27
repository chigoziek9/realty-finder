// src/pages/PropertyRequestAlert.jsx
import { useEffect, useState } from "react";
import { Clock, Trash2, X } from "lucide-react";
import profileImg from "../assets/profile.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function PropertyRequestAlert() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "bg-green-800 font-medium" : "hover:bg-green-800";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://realtyfinder.onrender.com/api/properties");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProperties(data.data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please check API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col justify-between">
        <div>
          <nav className="mt-6 space-y-1">
            <button
              onClick={() => navigate("/property-request-alert")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/property-request-alert"
              )}`}
            >
              <Clock size={18} />
              <span>Property Request Alert</span>
            </button>

            <button
              onClick={() => navigate("/my-property-alerts")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/my-property-alerts"
              )}`}
            >
              <Clock size={18} />
              <span>My Property Alerts</span>
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img
              src={profileImg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-medium">Charles Doe</p>
              <p className="text-sm text-gray-300">email@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Clock className="text-green-900" size={22} />
          <span>Property Request Alert</span>
        </h1>
        <p className="text-gray-600 mt-1">
          View, manage and update all your properties in one place.
        </p>

        <button
          onClick={() => navigate("/add-property-request-alert")}
          className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
        >
          + Add Property Request Alert
        </button>

        {/* Status Alert */}
        <div className="mt-6 flex items-center justify-between bg-green-100 text-green-700 px-4 py-3 rounded-md">
          <p>
            Your request has been queued for review and will be posted after it
            has been reviewed.
          </p>
          <X size={18} className="cursor-pointer" />
        </div>

        {/* Property List */}
        <div className="mt-6">
          {loading ? (
            <p className="text-gray-600">Loading properties...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : properties.length === 0 ? (
            <p className="text-gray-600">No properties found.</p>
          ) : (
            <div className="space-y-6">
              {properties.map((prop) => (
                <div key={prop._id} className="bg-white shadow-md rounded-lg p-6">
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Title:</span> {prop.title}
                    </p>
                    <p>
                      <span className="font-semibold">Type:</span> {prop.type}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {prop.location}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> ₦{prop.price}
                    </p>
                    <p>
                      <span className="font-semibold">Description:</span>{" "}
                      {prop.description}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span className="text-yellow-600 font-medium">
                        Awaiting Review
                      </span>
                    </p>
                  </div>

                  <button className="mt-4 flex items-center gap-2 text-red-600 font-medium hover:text-red-800">
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
