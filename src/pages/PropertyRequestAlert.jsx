import { useEffect, useState, useContext } from "react";
import { Clock, Bell, Heart, Settings, LogOut, X, Trash2 } from "lucide-react";
import profileImg from "../assets/profile.png";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../AuthContext";

export default function PropertyRequestAlert() {
  const navigate = useNavigate();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token: contextToken } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-green-800 font-medium"
      : "hover:bg-green-800";

  // ✅ Fetch property requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const authToken = Cookies.get("token") || contextToken;

        if (!authToken) {
          setError("You are not authorized. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://realtyfinder.onrender.com/api/property-requests",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        setRequests(data.data || data || []);
      } catch (err) {
        console.error("Error fetching property requests:", err);
        setError("Failed to fetch properties. Please check your login or connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [contextToken]);

  // ✅ Delete request handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;

    try {
      const authToken = Cookies.get("token") || contextToken;
      if (!authToken) {
        alert("Unauthorized! Please log in again.");
        return;
      }

      const res = await fetch(
        `https://realtyfinder.onrender.com/api/property-requests/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);

      // ✅ Update local state
      setRequests((prev) => prev.filter((req) => req._id !== id));
      alert("Property request deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete property request.");
    }
  };

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
              <Bell size={18} />
              <span>My Property Alerts</span>
            </button>

            <button
              onClick={() => navigate("/saved-properties")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/saved-properties"
              )}`}
            >
              <Heart size={18} />
              <span>My Saved Property</span>
            </button>

            <button
              onClick={() => navigate("/account-settings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg ${isActive(
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
              src={profileImg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-medium">Charles Doe</p>
              <p className="text-sm text-gray-300">email@gmail.com</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-red-400 mt-4 hover:text-red-300">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Clock className="text-green-900" size={22} />
            <span>Property Request Alert</span>
          </h1>
          <p className="text-gray-600 mt-1">
            View, manage and update all your properties in one place
          </p>
          <button
            onClick={() => navigate("/add-property-request-alert")}
            className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            + Add Property Request Alert
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between bg-green-100 text-green-700 px-4 py-3 rounded-md">
            <p>
              Your request has been queued for review and will be posted after it has been reviewed
            </p>
            <X size={18} className="cursor-pointer" />
          </div>

          <div className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded">
            {loading
              ? "Loading..."
              : error
              ? "Error loading results"
              : `Result ${requests.length} of ${requests.length}`}
          </div>
        </div>

        {/* Property Requests List */}
        <div className="mt-6 space-y-4">
          {loading && <p className="text-gray-600">Fetching properties...</p>}
          {error && (
            <p className="text-red-600 bg-red-100 px-4 py-2 rounded">{error}</p>
          )}
          {!loading && !error && requests.length === 0 && (
            <p className="text-gray-600">No property requests found.</p>
          )}

          {!loading &&
            !error &&
            requests.map((req) => (
              <div
                key={req._id}
                className="bg-white shadow-md rounded-lg p-6"
              >
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
                    <span className="font-semibold">Areas:</span>{" "}
                    {req.area || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-yellow-600 font-medium">
                      {req.status || "Pending"}
                    </span>
                  </p>
                </div>

                {/* ✅ Delete Button */}
                <button
                  onClick={() => handleDelete(req._id)}
                  className="mt-6 flex items-center gap-2 text-red-600 font-medium hover:text-red-800"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
