// src/pages/MySavedProperty.jsx
import {
  Clock,
  Bell,
  Heart,
  Settings,
  LogOut,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
} from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import profileImg from "../assets/profile 2.png";
import { useFavorites } from "../FavoriteContext";
import FavoriteButton from "../components/FavoriteButton";

export default function MySavedProperty() {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  if (favorites.length === 0) {
    return (
      <p className="flex justify-center items-center text-2xl font-bold h-40">
        No favorites yet ❤️
      </p>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-70 bg-green-900 text-white flex flex-col justify-between">
        <div>
          {/* Menu */}
          <nav className="mt-[85px] space-y-1">
            <button
              onClick={() => navigate("/property-request-alert")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/property-request-alert"
              )}`}
            >
              <Clock size={18} />
              <span>Property Request Alert</span>
            </button>

            <button
              onClick={() => navigate("/my-property-alerts")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/my-property-alerts"
              )}`}
            >
              <Bell size={18} />
              <span>My Property Alerts</span>
            </button>

            <button
              onClick={() => navigate("/saved-properties")}
              className={`flex w-full items-center space-x-3 px-6 py-3 rounded-r-lg hover:text-green-900 hover:bg-white ${isActive(
                "/saved-properties"
              )}`}
            >
              <Heart size={18} />
              <span>My Saved Property</span>
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
              src={profileImg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border object-cover"
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
        {/* Header */}
        <h1 className="text-2xl font-bold">My Saved Properties</h1>
        <p className="text-gray-600 mt-1">
          View, manage, and update all your saved properties in one place.
        </p>

        {/* Saved Properties */}
        <h2 className="font-semibold mt-8 mb-4">My Favorites</h2>
        <div className="space-y-6">
          {favorites.map((house) => (
            <div
              key={house.id}
              className="bg-white rounded-xl shadow p-4 flex items-center gap-6"
            >
              {/* Left image */}
              <img
                src={house.images[0]}
                alt={house.title}
                className="w-60 h-40 rounded-lg object-cover"
              />

              {/* Right content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{house.title}</p>
                    <p className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin size={16} className="mr-1" /> {house.address}
                    </p>
                    <div className="flex items-center text-gray-600 text-sm mt-2 space-x-4">
                      {house.beds && (
                        <span className="flex items-center">
                          <BedDouble size={16} className="mr-1" /> {house.beds}
                        </span>
                      )}
                      {house.baths && (
                        <span className="flex items-center">
                          <Bath size={16} className="mr-1" /> {house.baths}
                        </span>
                      )}
                      {house.sqft && (
                        <span className="flex items-center">
                          <Ruler size={16} className="mr-1" /> {house.sqft} sq ft
                        </span>
                      )}
                    </div>
                    <p className="text-green-800 font-bold text-lg mt-2">
                      {house.price}
                    </p>
                  </div>

                  {/* Favorite action */}
                  <FavoriteButton property={house} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
