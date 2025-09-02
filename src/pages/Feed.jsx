import { useEffect, useState } from "react";

import Viewproperty from "../components/Viewproperty";
import Filters from "../components/Filters";
import Settings from "../assets/feedsetting.png";
import FeedNav from "../components/FeedNav";

export default function Feed() {
  const [property, setProperty] = useState([]);

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
      <div>
        <div className="flex justify-between p-10">
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight ">
            Feed
          </h1>
          
            <div className=" pt-3 flex items-center gap-2 text-[#28563a] font-medium text-lg">
              <img src={Settings} alt="settings" className="w-5 h-5" />
              <p>Feed setting</p>
            </div>
          
        </div>

        {/* heading*/}
      </div>

      {/* Grid layout */}
      <FeedNav />

      <div className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-[#f3f3f3] mt-4">
        <h1 className="text-4xl md:text-4xl font-extrabold text-black-200 leading-tight ">
            You're all caught up!
          </h1>
          <p className="text-3xl">Check back shortly for the latest listings.</p>
      </div>
    </div>
  );
}
