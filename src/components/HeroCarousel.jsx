import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function HeroCarousel() {
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
        <h1 className="text-5xl font-bold mb-4">
          Live Green, Live Luxuriously.
        </h1>
        <p className="mb-6">
          Discover the Advantages of Eco-Friendly Homes with Our Real Estate Agency
        </p>

        {/* Search Bar */}
        <div className="flex bg-white rounded-full overflow-hidden shadow-md w-full max-w-lg">
          <button className="px-4 py-2 bg-blue-900 text-white">For Sale</button>
          <input
            type="text"
            placeholder="Enter an address, city, neighborhood, or ZIP code"
            className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button className="px-4 text-gray-500">✕</button>
        </div>
      </div>
    </div>
  );
}
