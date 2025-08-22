import React from 'react';
import PropertyTabs from '../components/Exclusiv-nav';
import PropertyList from '../components/property'; // Assuming this is the correct import for properties
import ServiceCards from "../components/ServiceCards"; 
import Testimonials from "../components/Testimonials";
import Location from "../components/Location";
import FAQSection from "../components/FAQSection";
import CTASection from "../components/CTASections";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-[#e5e5e5] h-screen flex flex-col items-center justify-center relative">
        <div className="text-center max-w-3xl mt-16">
          <h1 className="text-5xl font-bold mb-4">
            Live Green, Live Luxuriously.
          </h1>
          <p className="text-gray-600 mb-8">
            Discover the Advantages of Eco-Friendly Homes with Our Real Estate
            Agency
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden w-[600px] mx-auto shadow-md">
            <div className="flex items-center bg-gray-800 text-white px-4 py-3 rounded-l-full">
              For Sale
            </div>
            <input
              type="text"
              placeholder="Enter an address, city, neighborhood, or ZIP code."
              className="flex-1 px-4 py-3 outline-none text-gray-700"
            />
            <button className="px-4 text-gray-500 hover:text-gray-800">
              ✕
            </button>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE ACCESS SECTION */}
      <div className="mt-15">
        <div className="flex justify-center">
          <div className="border border-b-black px-6 py-1 rounded-3xl flex">
            <div className="w-9 h-9 rounded-full bg-gray-300"></div>
            <h1 className="p-2">Featured Listings</h1>
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="text-4xl mt-7 font-bold flex justify-center text-center">
            Exclusive Access To Our Most<br /> Desired Properties
          </h1>
        </div>
        <div className="mt-10 flex justify-center">
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
