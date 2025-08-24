import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Viewproperty from "../components/Viewproperty";

export default function Mortgage() {
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProperty = localStorage.getItem("exploreProperty");

    if (storedProperty) {
      setProperty(JSON.parse(storedProperty).slice(0, 6)); // limit to 6
    } else {
      fetch("/properties.json")
        .then((res) => res.json())
        .then((data) => {
          setProperty(data.slice(0, 6));
        });
    }
  }, []);

  if (property.length === 0) {
    return (
      <p className="flex justify-center items-center text-xl sm:text-2xl md:text-3xl font-bold h-40">
        Loading...
      </p>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-12">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {property.map((house) => (
          <div
            key={house.id}
            onClick={() => navigate(`/property/${house.id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            {/* Price + Button */}
            {/* Price + Button */}
            <div className="flex items-center justify-between mt-4 px-4">
              <p className="text-[#28563a] font-semibold text-lg sm:text-xl">
                {house.price}
              </p>
              <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border bg-[#28563a] text-white text-sm font-medium hover:bg-black transition">
                Contact Us
              </button>
            </div>

            {/* Beds + Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 mt-4 px-4 text-sm sm:text-base">
              <p>
                {house.beds} beds • {house.baths} baths • {house.sqft} sqft •
                RealtyFinder
              </p>
              <p className="mt-1 sm:mt-0 text-gray-500 text-xs sm:text-sm">
                2 days ago
              </p>
            </div>

            {/* Image */}
            <img
              src={house.image}
              alt={house.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover mt-4"
            />

            {/* Title + Description */}
            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                {house.title}
              </h3>
              <p className="text-[#545454] mt-2 text-xs sm:text-sm leading-relaxed">
                {house.description}
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Listed {house.listed} • {house.source}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Extra Component */}
      <div className="mt-8">
        <Viewproperty />
       
      </div>
    </div>
  );
}
