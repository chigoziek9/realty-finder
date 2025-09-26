import {
  Clock,
  Bell,
  Heart,
  Settings,
  LogOut,
  Home,
  BedDouble,
  Bath,
  Square,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { useContext } from "react";
import List1 from "../assets/list1.png";
import List2 from "../assets/list2.png";
import List3 from "../assets/list3.png";

const savedProperties = [
  {
    id: 1,
    title: "Home in Coral Gables",
    address: "Jeronimo Drive, Coral Gables, FL 33146, Enugu",
    beds: 4,
    baths: 4.5,
    sqft: 3800,
    price: "₦850,000",
    date: "March 8, 2025",
    image: List3,
  },
  {
    id: 2,
    title: "Home in Coral Gables",
    address: "Jeronimo Drive, Coral Gables, FL 33146, Enugu",
    beds: 4,
    baths: 4.5,
    sqft: 3800,
    price: "₦850,000",
    date: "March 8, 2025",
    image: List1,
  },
  {
    id: 3,
    title: "Home in Coral Gables",
    address: "Jeronimo Drive, Coral Gables, FL 33146, Enugu",
    beds: 4,
    baths: 4.5,
    sqft: 3800,
    price: "₦850,000",
    date: "March 8, 2025",
    image: List2,
  },
];

export default function OwnersPropertySaved() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Highlight active link
  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
        <div>
          {/* Menu */}
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/owners-dashboard")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/owners-dashboard"
              )}`}
            >
              <Clock size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/owners-listings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/owners-listings"
              )}`}
            >
              <Bell size={18} />
              <span>My Listings</span>
            </button>

            <button
              onClick={() => navigate("/owners-saved-property")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/owners-saved-property"
              )}`}
            >
              <Heart size={18} />
              <span>My saved property</span>
            </button>

            <button
              onClick={() => navigate("/owners-documents")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/owners-documents"
              )}`}
            >
              <Heart size={18} />
              <span>My documents</span>
            </button>

            <button
              onClick={() => navigate("/owners-agreement")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg ${isActive(
                "/owners-agreement"
              )}`}
            >
              <Heart size={18} />
              <span>New tenancy agreement</span>
            </button>

            <button
              onClick={() => navigate("/owners-settings")}
              className={`flex w-full items-center space-x-3 px-6 py-3 border-t border-green-700 mt-4 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/owners-settings"
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">My saved property</h1>
          <p className="text-gray-600 mt-1">
            Easily access and review the homes you’ve previously saved.
          </p>
        </div>

        {/* Result Count */}
        <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600 mt-6">
          Result 1–{savedProperties.length} of {savedProperties.length}
        </div>

        {/* Saved Properties */}
        <div className="space-y-4 mt-4">
          {savedProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-sm p-4 flex gap-4"
            >
              {/* Image */}
              <img
                src={property.image}
                alt={property.title}
                className="w-48 h-32 rounded-lg object-cover"
              />

              {/* Details */}
              <div className="flex-1 space-y-2">
                <h2 className="text-lg font-semibold">{property.title}</h2>
                <p className="text-gray-500 flex items-center gap-2 text-sm">
                  <Home className="w-4 h-4" /> {property.address}
                </p>

                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-4 h-4" /> {property.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4" /> {property.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="w-4 h-4" /> {property.sqft} sq ft
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-semibold text-green-700">
                    {property.price}
                  </p>
                  <p className="text-gray-400 text-sm">Added: {property.date}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 text-sm">
                    Hide
                  </button>
                  <button className="px-3 py-1 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
