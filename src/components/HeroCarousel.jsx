import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronDown } from "lucide-react"; // dropdown icon
import "swiper/css";
import search from "../assets/search.png";

export default function HeroCarousel() {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("For Sale");

  const images = [
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
  ];

  return (
    <div className="relative h-screen w-full">
      {/* Background slideshow */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
        <h1 className="text-5xl font-bold mb-4">
          Live Green, Live Luxuriously.
        </h1>
        <p className="mb-6">
          Discover the Advantages of Eco-Friendly Homes with Our Real Estate
          Agency
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl shadow-md w-full max-w-lg relative overflow-visible">
          {/* Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full sm:w-auto px-4 py-3 bg-[#e5e5e5] text-black sm:rounded-l-2xl text-sm sm:text-base"
            >
              {option}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            {open && (
              <div className="absolute top-full left-0 bg-white shadow-md rounded-md w-40 z-50">
                {["For Sale", "For Rent"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setOption(item);
                      setOpen(false);
                    }}
                    className="block w-full text-left text-black px-4 py-2 hover:bg-gray-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input field */}
          <input
            type="text"
            placeholder="Enter an address, city, neighborhood, or ZIP code"
            className="flex-grow px-4 py-3 text-black focus:outline-none text-sm sm:text-base border-t sm:border-t-0 sm:border-l border-gray-200"
          />

          {/* Clear button (hidden on mobile) */}
          <button className="px-4 text-gray-500 hidden sm:flex items-center justify-center">
            ✕
          </button>

          {/* Search button */}
          <button className="px-4 py-3 bg-[#4b642b] text-white rounded-b-2xl sm:rounded-b-none sm:rounded-r-2xl flex items-center justify-center">
            <img src={search} alt="search" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
