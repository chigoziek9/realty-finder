// src/pages/RentProperty.jsx
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Footer from "../components/Footer";
import heroImage from "../assets/rent-image.png";

export default function RentProperty() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-200 to-green-50 py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Find Your Dream Property
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Plus explore local market trends and update your property details to
            make your estimate even more accurate
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex items-center gap-2 bg-white rounded-xl shadow-lg p-2 w-full max-w-2xl">
            <input
              type="text"
              placeholder="Find agents in your area"
              className="flex-1 px-4 py-2 rounded-lg focus:outline-none"
            />
            <button className="bg-green-900 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition">
              <Search size={18} /> Find agent
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}

      {/* Property Cards */}
      <div className="bg-[#FAFAFA] ">
        <div className="flex flex-col lg:flex-row items-center gap-10 m-20">
          <div className="flex justify-center flex-1">
            <img
              src={heroImage}
              alt="Phone displaying rental app"
              className="w-full sm:w-[500px] md:w-[700px] lg:w-[900px] h-[600px] rounded-[45px]"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Thinking of renting out your property <br /> with ease?
            </h1>

            <p className="mt-3 text-gray-600 font-['Plus_Jakarta_Sans'] font-normal text-[20px] leading-[32px] tracking-normal align-middle">
              List your property for rent on RealtyFinder and connect with
              millions of potential renters- completely free. The process takes
              just minutes, with no hidden fees or surprises.
            </p>
            <button className="mt-6 px-9 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
