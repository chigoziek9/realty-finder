import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";
import FavoriteButton from "../components/FavoriteButton";


export default function Newtomarket() {
  const [approvedProperties, setApprovedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // ✅ Fetch approved properties from backend
  const fetchApprovedProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://realtyfinder.onrender.com/api/properties/user/approved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      // Some APIs return data inside `data`, others directly — handle both cases
      const data = result?.data || result;

      setApprovedProperties(data || []);
    } catch (err) {
      console.error("Error fetching approved properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchApprovedProperties();
    }
  }, [token]);

  if (loading) {
    return (
      <p className="flex justify-center items-center text-2xl sm:text-3xl md:text-4xl font-bold h-40">
        Loading...
      </p>
    );
  }

  if (approvedProperties.length === 0) {
    return (
      <p className="flex justify-center items-center text-xl sm:text-2xl font-semibold h-40">
        No approved properties found.
      </p>
    );
  }

  return (
    <div className="px-2 sm:px-4 pb-8 mt-10">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          New To Market Properties
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedProperties.map((property) => (
          <div
            key={property._id}
            onClick={() => navigate(`/property/${property._id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={
                property.images?.[0] ||
                "https://placehold.co/300x200?text=No+Image"
              }
              alt={property.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold">{property.title}</h3>

              <p className="flex items-center text-gray-600 text-sm mt-1">
                <FaMapMarkerAlt className="mr-1" />
                {property.location || `${property.state || ""}, ${property.country || ""}`}
              </p>

              <div className="flex flex-wrap gap-4 text-gray-700 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <FaBed /> {property.bedrooms || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <FaBath /> {property.bathrooms || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <FaRulerCombined /> {property.sqft || property.size || "N/A"} sq ft
                </span>
              </div>

              <p className="text-green-700 font-bold text-lg mt-3">
                ₦{property.price?.toLocaleString() || "N/A"}
              </p>

              <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                {property.description || "No description available."}
              </p>
              <FavoriteButton property={property} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
