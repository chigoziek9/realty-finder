import React from "react";
import PropertyTabs from "../components/Exclusiv-nav";
import PropertyList from "../components/property";
import ServiceCards from "../components/ServiceCards";
import Testimonials from "../components/Testimonials";
import Location from "../components/Location";
import FAQSection from "../components/FAQSection";
import CTASection from "../components/CTASections";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <HeroCarousel />
     

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
