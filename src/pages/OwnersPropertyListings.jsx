import {
  Clock,
  Bell,
  Heart,
  Settings,
  LogOut,
  Edit,
  EyeOff,
  Trash2,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { useContext } from "react";

// Import your listing images
import List1 from "../assets/list 1.png";
import List2 from "../assets/list 2.png";
import List3 from "../assets/list 3.png";

export default function OwnersPropertyListings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Utility to check if a link is active
  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  // Example listings with different images
  const listings = [
    {
      id: 1,
      title: "Home in Coral Gables",
      address: "Jeronimo Drive, Coral Gables, FL 33146, Enugu",
      beds: 4,
      baths: 4,
      sqft: 3800,
      price: "₦850,000",
      status: "Live",
      date: "March 8, 2025",
      image: List3, // first listing uses List 3
    },
    {
      id: 2,
      title: "Home in Coral Gables",
      address: "Jeronimo Drive, Coral Gables, FL 33146, Enugu",
      beds: 4,
      baths: 4,
      sqft: 3800,
      price: "₦850,000",
      status: "Pending",
      date: "March 8, 2025",
      image: List1, // second listing uses List 1
    },
    {
      id: 3,
      title: "Home in Coral Gables",
      address: "Jeronimo Drive, Coral Gables, FL 33146, Enugu",
      beds: 4,
      baths: 4,
      sqft: 3800,
      price: "₦850,000",
      status: "Rejected",
      date: "March 8, 2025",
      image: List2, // third listing uses List 2
    },
  ];

  const statusColors = {
    Live: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

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
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
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
        <h1 className="text-2xl font-bold">My listings</h1>
        <p className="text-gray-600 mt-1">
          View, manage, and update all your properties in one place.
        </p>
        <button
          onClick={() => navigate("/agents-form")}
          className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
        >
          + List property
        </button>

        {/* Listings */}
        <h2 className="font-semibold mt-8 mb-4">My Listings</h2>
        <div className="space-y-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl shadow p-4 flex items-center gap-6"
            >
              {/* Left image */}
              <img
                src={listing.image}
                alt={listing.title}
                className="w-60 h-40 rounded-lg object-cover"
              />

              {/* Right content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{listing.title}</p>
                    <p className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin size={16} className="mr-1" /> {listing.address}
                    </p>
                    <div className="flex items-center text-gray-600 text-sm mt-2 space-x-4">
                      <span className="flex items-center">
                        <BedDouble size={16} className="mr-1" /> {listing.beds}
                      </span>
                      <span className="flex items-center">
                        <Bath size={16} className="mr-1" /> {listing.baths}
                      </span>
                      <span className="flex items-center">
                        <Ruler size={16} className="mr-1" /> {listing.sqft} sq ft
                      </span>
                    </div>
                    <p className="text-green-800 font-bold text-lg mt-2">
                      {listing.price}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[listing.status]}`}
                  >
                    {listing.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 mt-4">
                  <button className="flex items-center space-x-1 border px-3 py-1 rounded-lg text-sm hover:bg-gray-50">
                    <Edit size={16} /> <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-1 border px-3 py-1 rounded-lg text-sm hover:bg-gray-50">
                    <EyeOff size={16} /> <span>Hide</span>
                  </button>
                  <button className="flex items-center space-x-1 border px-3 py-1 rounded-lg text-sm text-red-600 hover:bg-gray-50">
                    <Trash2 size={16} /> <span>Delete</span>
                  </button>
                  <p className="text-sm text-gray-500 ml-auto">
                    Added: {listing.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
