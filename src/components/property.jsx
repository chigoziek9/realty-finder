import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Viewproperty from "./Viewproperty";
import FavoriteButton from "./FavoriteButton";
import { AuthContext } from "../AuthContext";

export default function Property() {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      try {
        const res = await fetch(
          "https://realtyfinder.onrender.com/api/properties/user/approved",
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
          // Limit to first 6
          setProperty(result.data.slice(0, 6));
        } else {
          setError("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching approved properties:", err);
        setError("Failed to load approved properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchApprovedProperties();
    } else {
      setError("You must be logged in to view properties.");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <p className="flex justify-center items-center text-2xl sm:text-3xl md:text-4xl font-bold h-40">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex justify-center items-center text-red-500 text-lg font-semibold h-40">
        {error}
      </p>
    );
  }

  if (property.length === 0) {
    return (
      <p className="flex justify-center items-center text-gray-600 text-lg h-40">
        No approved properties found.
      </p>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-12">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {property.map((house) => (
          <div
            key={house._id}
            onClick={() => navigate(`/property/${house._id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            {/* Top line */}
            <div
              className="w-full border-t-2"
              style={{ borderColor: "#d0d0d0" }}
            ></div>

            {/* Price + Contact Button */}
            <div className="flex items-center justify-between mt-4 px-4">
              <p className="text-[#28563a] font-semibold text-lg sm:text-xl">
                ₦{house.price?.toLocaleString()}
              </p>
              <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border bg-[#28563a] text-white text-sm font-medium hover:bg-black transition">
                View details
              </button>
            </div>

            {/* Beds + Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 mt-4 px-4 text-sm sm:text-base">
              <p>
                {house.bedrooms || 0} beds • {house.bathrooms || 0} baths •{" "}
                {house.area || "N/A"} sqft • RealtyFinder
              </p>
              <p className="mt-1 sm:mt-0 text-gray-500 text-xs sm:text-sm">
                {house.createdAt
                  ? new Date(house.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>

            {/* Image */}
            <img
              src={
                Array.isArray(house.images) && house.images.length > 0
                  ? house.images[0]
                  : "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={house.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover mt-4"
            />

            {/* Title + Description */}
            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                {house.title}
              </h3>
              <p className="text-[#545454] mt-2 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {house.description}
              </p>

              {/* Address + Favourite */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-[#27513d] text-xs sm:text-sm leading-relaxed underline">
                  {house.address || "No address provided"}
                </p>

                <FavoriteButton property={house} />
              </div>

              <p className="text-gray-400 text-xs mt-2 ">
                Listed by {house.createdBy?.name || "Agent"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Section */}
      <div>
        <Viewproperty />
      </div>
    </div>
  );
}
