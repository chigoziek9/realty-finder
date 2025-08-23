import React from "react";
import PropertyTabs from "../components/Exclusiv-nav";
import PropertyList from "../components/property";
import ServiceCards from "../components/ServiceCards";
import Testimonials from "../components/Testimonials";
import Location from "../components/Location";
import FAQSection from "../components/FAQSection";
import CTASection from "../components/CTASections";
import Footer from "../components/Footer";
import bgImage from "../assets/hero-image.png";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center h-screen flex flex-col items-center justify-center relative px-4"
      >
        <div className="text-center max-w-3xl mt-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-snug">
            Live Green, Live Luxuriously.
          </h1>
          <p className="text-white mb-8 text-base sm:text-lg">
            Discover the Advantages of Eco-Friendly Homes with Our Real Estate
            Agency
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden w-full max-w-lg mx-auto shadow-md">
            <div className="flex items-center bg-gray-800 text-white px-4 py-2 sm:py-3 rounded-l-full text-sm sm:text-base">
              For Sale
            </div>
            <input
              type="text"
              placeholder="Enter an address, city, neighborhood, or ZIP code."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 outline-none text-gray-700 text-sm sm:text-base"
            />
            <button className="px-3 sm:px-4 text-gray-500 hover:text-gray-800">
              ✕
            </button>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE ACCESS SECTION */}
      <div className="mt-12 sm:mt-16 px-4">
        <div className="flex justify-center">
          <div className="border border-b-black px-4 sm:px-6 py-1 rounded-3xl flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300"></div>
            <h1 className="text-sm sm:text-base p-1 sm:p-2">Featured Listings</h1>
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mt-6 font-bold text-center leading-snug">
            Exclusive Access To Our Most <br className="hidden sm:block" /> Desired Properties
          </h1>
        </div>
        <div className="mt-8 flex justify-center">
          <PropertyTabs />
        </div>
      </div>

      {/* EXTRA SECTIONS */}
      <ServiceCards />
      <Testimonials />
      <Location />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
