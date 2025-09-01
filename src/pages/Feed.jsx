import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Viewproperty from "../components/Viewproperty";
import Filters from "../components/Filters";
import Settings from "../assets/feedsetting.png";

export default function Feed() {
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
      <>
        <p className="flex justify-center items-center text-xl sm:text-2xl md:text-3xl font-bold h-40">
          Loading...
        </p>
      </>
    );
  }

  return (
    <div className="bg-[#ffffff]">
      {/* hero-sectiomn */}
      <div className="">
        <div className="bg-gradient-to-r from-[#a3ca87] via-green-100 to-white w-full h-[380px] relative">
          <div className="p-20 ">
            <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight ">
              Find your dream property
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] font-medium text-[22px] leading-[32px] tracking-normal">
              Looking for houses for sale nearby? Easily explore available
              listings in your area, complete with high-quality photos, pricing,
              and detailed <br />
              property descriptions to help you make informed decisions.
            </p>
          </div>
          {/* search-bar */}
          <div class="w-full max-w-5xl mx-auto p-4 bg-[#f3f3f3] rounded-2xl shadow-md absolute bottom-[-40px] left-0 right-0 z-10">
            <div class="flex items-center bg-white rounded-2xl shadow-sm border border-[#b9b9b9] overflow-hidden">
              <input
                type="text"
                placeholder="Search for a property"
                class="flex-1  p-4 text-[#313131] text-xl focus:outline-none "
              />

              <button class="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white p-3 m-5 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>
                <span>Find property</span>
              </button>
            </div>
          </div>
        </div>
        <div className="relative z-20 bg-[#f3f3f3] p-4 mt-7 mx-11 rounded-2xl shadow-md">
          <Filters />
        </div>
      </div>
      {/* heading*/}
      <div className="flex justify-between p-10">
        <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight ">
          Feed
        </h1>
        <div className="flex gap-2">
          <img src={Settings} alt="" className="w-8" />
          <p> Feed Setting</p>
        </div>
      </div>

      {/* Grid layout */}
      <div className="px-2 sm:px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {property.map((house) => (
            <div
              key={house.id}
              onClick={() => navigate(`/property/${house.id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer mt-3"
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
    </div>
  );
}
