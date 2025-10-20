import { useEffect, useState } from "react";

import Viewproperty from "../components/Viewproperty";
import Filters from "../components/Filters";
import Settings from "../assets/feedsetting.png";
import FeedNav from "../components/FeedNav";
import Footer from "../components/Footer";
import DatePicker from "../components/Datepicker";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // or whichever icon pack you're using

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
        <p className="flex justify-center items-center text-lg sm:text-xl md:text-3xl font-bold h-40 text-center px-4">
          Loading...
        </p>
      </>
    );
  }

  return (
    <>
      <div className="bg-[#ffffff]">
        {/* hero-section */}
        <div>
          <div className="bg-gradient-to-r from-[#a3ca87] via-green-100 to-white w-full h-auto md:h-[380px] md:relative">
            <div className="px-6 py-12 md:p-20">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug md:leading-tight text-center md:text-left">
                Find your dream property
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-[22px] font-['Plus_Jakarta_Sans'] font-medium leading-relaxed tracking-normal text-center md:text-left">
                Looking for houses for sale nearby? Easily explore available
                listings in your area, complete with high-quality photos,
                pricing, and detailed property descriptions to help you make
                informed decisions.
              </p>
            </div>

            {/* search-bar */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:p-3 bg-[#f3f3f3] rounded-2xl shadow-md md:absolute md:-bottom-10 md:left-0 md:right-0 md:z-10">
              <div className="flex items-stretch bg-white rounded-2xl shadow-sm border border-[#b9b9b9] overflow-hidden">
                {/* Input */}
                <input
                  type="text"
                  placeholder="Address, neighbourhood, city, ZIP"
                  className="flex-1 px-4 py-3 text-sm sm:text-base text-[#313131] focus:outline-none"
                />

                {/* Button */}
                <button className="flex items-center justify-center bg-green-800 hover:bg-green-900 text-white px-5 sm:px-6 rounded-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* filters */}
          <div className="bg-[#f3f3f3] p-4 mt-6 sm:mt-7 mx-4 sm:mx-11 rounded-2xl shadow-md md:relative md:z-20">
            {/*  <Filters />  */} 
          </div>
        </div>

        {/* heading */}
        <div className="px-4 sm:px-10 py-6 sm:py-10 flex flex-row items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Feed
          </h1>
          <div className="pt-1 flex items-center gap-2 text-[#28563a] font-medium text-base sm:text-lg">
            <img src={Settings} alt="settings" className="w-5 h-5" />
            <p>Feed setting</p>
          </div>
        </div>

        {/* nav */}
        {/* <FeedNav />  */}<FeedNav />
      
        {/* footer message */}
        <div className="text-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f3f3f3] mt-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black leading-tight">
            You're all caught up!
          </h1>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl">
            Check back shortly for the latest listings.
          </p>
        </div>
      {/*<DatePicker />*/}<DatePicker />
       <Link
          to="/favorites"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm">FAvorites</span>
        </Link>
      </div>
      <Footer />
    </>
  );
}
