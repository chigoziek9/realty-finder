import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"; // heart icon
import ViewExplore from "./ViewExplore";


export default function Land() {
  const [Land, setLand] = useState([]);
  const [favorites, setFavorites] = useState([]); // track favs
  const navigate = useNavigate();

  useEffect(() => {
    const storedLand = localStorage.getItem("exploreProperty");

    if (storedLand) {
      setLand(JSON.parse(storedLand).slice(0, 3)); // limit to 6
    } else {
      fetch("/land.json")
        .then((res) => res.json())
        .then((data) => {
          setLand(data.slice(0, 3)); // limit to 6
        });
    }
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  if (Land.length === 0) {
    return (
      <p className="flex justify-center items-center text-2xl sm:text-3xl md:text-4xl font-bold h-40">
        Loading...
      </p>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-12">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {Land.map((Plots) => (
          <div
            key={Plots.id}
            onClick={() => navigate(`/property/${Plots.id}`)}
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
                {Plots.price}
              </p>
              <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border bg-[#28563a] text-white text-sm font-medium hover:bg-black transition">
                View details
              </button>
            </div>

            {/* Beds + Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 mt-4 px-4 text-sm sm:text-base">
              <p>
                 {Plots.sqft} sqft •
                RealtyFinder
              </p>
              <p className="mt-1 sm:mt-0 text-gray-500 text-xs sm:text-sm">
                2 days ago
              </p>
            </div>

            {/* Image */}
            <img
              src={Plots.image}
              alt={Plots.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover mt-4"
            />

            {/* Title + Description */}
            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                {Plots.title}
              </h3>
              <p className="text-[#545454] mt-2 text-xs sm:text-sm leading-relaxed">
                {Plots.description}
              </p>

              {/* Address + Favourite */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-[#27513d] text-xs sm:text-sm leading-relaxed underline">
                  {Plots.address}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    toggleFavorite(Plots.id);
                  }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(Plots.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <p className="text-gray-400 text-xs mt-2 ">
                Listed {Plots.listed} • {Plots.source}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Section */}
      <div>
        <ViewExplore />
      
      </div>
    </div>
  );
}
