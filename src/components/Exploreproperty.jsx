// src/components/Exploreproperty.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import ViewExplore from "./ViewExplore";

export default function Exploreproperty({ properties, filters }) {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // 🧠 Apply search + filters
  const filteredProperties = properties.filter((house) => {
    const { search, location, type, pricing, size, year } = filters;

    const matchesSearch =
      !search ||
      house.title?.toLowerCase().includes(search.toLowerCase()) ||
      house.address?.toLowerCase().includes(search.toLowerCase()) ||
      house.location?.toLowerCase().includes(search.toLowerCase());

    const matchesLocation = !location || house.location?.toLowerCase() === location.toLowerCase();
    const matchesType = !type || house.type?.toLowerCase() === type.toLowerCase();

    const matchesPricing =
      !pricing ||
      (pricing === "low" && house.priceValue <= 500000) ||
      (pricing === "mid" && house.priceValue > 500000 && house.priceValue <= 2000000) ||
      (pricing === "high" && house.priceValue > 2000000);

    const matchesSize =
      !size ||
      (size === "small" && house.bedrooms <= 2) ||
      (size === "medium" && house.bedrooms >= 3 && house.bedrooms <= 4) ||
      (size === "large" && house.bedrooms >= 5);

    const matchesYear =
      !year ||
      (year === "2020" && house.yearBuilt >= 2020) ||
      (year === "2010" && house.yearBuilt >= 2010 && house.yearBuilt < 2020) ||
      (year === "2000" && house.yearBuilt >= 2000 && house.yearBuilt < 2010);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesPricing &&
      matchesSize &&
      matchesYear
    );
  });

  if (filteredProperties.length === 0) {
    return (
      <p className="flex justify-center items-center text-xl font-semibold text-gray-600 py-10">
        No properties match your search or filters.
      </p>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {filteredProperties.map((house) => (
          <div
            key={house.id}
            onClick={() => navigate(`/property/${house.id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <img src={house.image} alt={house.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{house.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(house.id);
                  }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(house.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-600">{house.location}</p>
              <p className="text-green-700 font-bold mt-2">{house.price}</p>
            </div>
          </div>
        ))}
      </div>
      <ViewExplore />
    </div>
  );
}
