// src/pages/MySavedProperty.jsx
import { Heart, Clock, Bell, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import profileImg from "../assets/profile 2.png";
import { Link } from "react-router-dom";
import { useFavorites } from "../FavoriteContext";
import FavoriteButton from "../components/FavoriteButton";
import { FaArrowLeft } from 'react-icons/fa'; // or the correct icon family


export default function MySavedProperty() {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <p className="flex justify-center items-center text-2xl font-bold h-40">
        No favorites yet ❤️
      </p>
    );
  }
    

  const isActive = (path) =>
    location.pathname === path
      ? "bg-green-800 font-medium"
      : "hover:bg-green-800";

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
        {/* Page Title */}
        <h1 className="text-2xl font-bold">My Saved Property</h1>
        <p className="text-gray-600 mt-1">
          View, manage, and update all your properties in one place.
        </p>

        {/* Result Count */}
        <div className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded">
          Result 1–2 of 2
        </div>

        {/* Promo Section */}
        <div className="mt-6 bg-white shadow rounded-lg p-6 flex items-center gap-6">
          <img
            src="https://img.icons8.com/?size=100&id=HhCcFvF6CK5y&format=png&color=000000"
            alt="Agent"
            className="w-20 h-20"
          />
          <div>
            <h2 className="text-lg font-bold">
              Meet with a local RealtyFinder agent
            </h2>
            <p className="text-gray-600 mt-1">
              RealtyFinder Agents help you win, delivering full service while
              closing 2 times more deals on average than traditional agents.
            </p>
            <div className="mt-5">
              <Link
                to="/agent"
                className="mt-8 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
              >
                Find an agent in my area
              </Link>
            </div>
          </div>
        </div>

        {/* Saved Properties */}
        <div className="px-4 sm:px-8 md:px-12 mt-8">
              <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((house) => (
                  <div
                    key={house.id}
                    onClick={() => navigate(`/property/${house.id}`)}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                  >
                    <img
                      src={house.images[0]}
                      alt={house.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{house.title}</h3>
                      <p className="text-gray-500">{house.address}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-green-700 font-medium">
                          {house.price}
                        </span>
                        <FavoriteButton property={house} />
                      </div>
                    </div>
                  </div>
                ))}
                {/* <Link
                    to="/favorites"
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <FaArrowLeft className="w-5 h-5 mr-1" />
                    <span className="text-sm">FAvorites</span>
                    
                  </Link>*/}
              </div>
            </div>
      </main>
    </div>
  );
}
