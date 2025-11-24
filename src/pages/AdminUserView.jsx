import { useState, useContext, useEffect } from "react";
import {
  Clock,
  Bell,
  LogOut,
  Users,
  Building,
  ClipboardList,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";

// ✅ Format "1 hour ago", "2 days ago"
function timeAgo(date) {
  if (!date) return "N/A";

  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 365 * 24 * 3600,
    month: 30 * 24 * 3600,
    week: 7 * 24 * 3600,
    day: 24 * 3600,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

export default function AdminUserMgt() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState("recent");

  const userId = location.state?.userId;
  const role = location.state?.role;

  const [clickedUser, setClickedUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");

  // ============================================
  // FETCH USER BY ROLE
  // ============================================
  useEffect(() => {
    if (!userId || !role) {
      setError("No user selected.");
      setLoadingUser(false);
      return;
    }

    async function fetchUser() {
      try {
        setLoadingUser(true);

        let endpoint = "";

        if (role === "individual") {
          endpoint =
            "https://realtyfinder.onrender.com/api/users/role/individual";
        } else if (role === "property_owner") {
          endpoint =
            "https://realtyfinder.onrender.com/api/users/role/property_owner";
        } else if (role === "real_estate_agent") {
          endpoint =
            "https://realtyfinder.onrender.com/api/users/role/real_estate_agent";
        } else {
          throw new Error("Invalid role provided.");
        }

        const res = await fetch(endpoint);
        const data = await res.json();

        if (!data.success) throw new Error("Failed to fetch users");

        const found = data.users.find((u) => u._id === userId);

        if (!found) {
          setError("User not found in this role list.");
        } else {
          setClickedUser(found);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUser();
  }, [userId, role]);

  const navItems = [
    { label: "Dashboard", path: "/admin-dashboard", icon: Clock },
    { label: "User Management", path: "/admin-user-mgt", icon: Users },
    { label: "Property Management", path: "/admin-properties", icon: Building },
    {
      label: "Estate Agent Management",
      path: "/admin-agents-mgt",
      icon: Bell,
    },
    {
      label: "Property Requests",
      path: "/admin-property-requests",
      icon: ClipboardList,
    },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-semibold"
      : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100 relative overflow-hidden">
      {/* ===== Sidebar ===== */}
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
                className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg transition-colors duration-200 ${isActive(
                  path
                )}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

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
              <p className="text-sm text-gray-300 truncate">{user?.email}</p>
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

      {/* ===== Main ===== */}
      <main className="flex-1 flex flex-col w-full md:ml-72 p-4 md:p-8">
        <div className="p-6 md:p-10 w-full">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>User management</span> <span>{">"}</span>
            <span className="text-black">User detail</span>
          </div>

          {/* User Details */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">User Details</h2>

            {loadingUser && <p className="mt-4 text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}

            {!loadingUser && clickedUser && (
              <div className="mt-4 grid gap-2 text-sm">
                <p>
                  <span className="font-semibold">Name: </span>
                  {clickedUser.firstName} {clickedUser.lastName}
                </p>

                <p>
                  <span className="font-semibold">Email: </span>
                  {clickedUser.email}
                </p>

                <p>
                  <span className="font-semibold">Phone: </span>
                  {clickedUser.phone || "Not provided"}
                </p>

                <p>
                  <span className="font-semibold">Role: </span>
                  {clickedUser.role}
                </p>

                <p>
                  <span className="font-semibold">Status: </span>
                  {clickedUser.isVerified ? "Verified" : "Unverified"}
                </p>

                <p>
                  <span className="font-semibold">Last Login: </span>
                  {clickedUser.lastLogin
                    ? new Date(clickedUser.lastLogin).toLocaleString()
                    : "No login data"}
                </p>

                <p>
                  <span className="font-semibold">Created At: </span>
                  {new Date(clickedUser.createdAt).toLocaleString()}
                </p>

                {clickedUser.address && (
                  <p>
                    <span className="font-semibold">Address: </span>
                    {clickedUser.address}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold">User Activities</h3>

            <div className="flex gap-3 mt-4">
              <button
                className={`px-4 py-2 rounded border ${
                  tab === "recent"
                    ? "bg-green-700 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
                onClick={() => setTab("recent")}
              >
                Recent activity
              </button>

              <button
                className={`px-4 py-2 rounded border ${
                  tab === "documents"
                    ? "bg-green-700 text-white"
                    : "border-gray-300 text-gray-600"
                }`}
                onClick={() => setTab("documents")}
              >
                Documents
              </button>
            </div>

            {/* ============================
                 RECENT ACTIVITIES
            ============================ */}
            {tab === "recent" && clickedUser && (
              <div className="mt-6">
                <h4 className="text-gray-700 font-semibold mb-3">
                  Recent activities
                </h4>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                      <tr>
                        <th className="py-3 px-4">Action</th>
                        <th className="py-3 px-4">Time</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-t">
                        <td className="py-3 px-4">Logged in</td>
                        <td className="py-3 px-4">
                          {clickedUser.lastLogin
                            ? timeAgo(clickedUser.lastLogin)
                            : "No login data"}
                        </td>
                        <td className="py-3 px-4 text-green-600">Approved</td>
                      </tr>

                      <tr className="border-t">
                        <td className="py-3 px-4">Updated profile</td>
                        <td className="py-3 px-4">
                          {clickedUser.updatedAt
                            ? timeAgo(clickedUser.updatedAt)
                            : "No update data"}
                        </td>
                        <td className="py-3 px-4 text-green-600">Success</td>
                      </tr>

                      <tr className="border-t">
                        <td className="py-3 px-4">Account created</td>
                        <td className="py-3 px-4">
                          {timeAgo(clickedUser.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-blue-600">Completed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============================
                 DOCUMENTS
            ============================ */}
            {tab === "documents" && (
              <div className="mt-6">
                <h4 className="text-gray-700 font-semibold mb-3">Documents</h4>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                      <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Time</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-t">
                        <td className="py-3 px-4">Identity proof</td>
                        <td className="py-3 px-4">1 month ago</td>
                        <td className="py-3 px-4 text-green-600">Approved</td>
                      </tr>

                      <tr className="border-t">
                        <td className="py-3 px-4">Address proof</td>
                        <td className="py-3 px-4">2 months ago</td>
                        <td className="py-3 px-4 text-green-600">Approved</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
