
// src/pages/RentProperty.jsx
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Footer from "../components/Footer";
import heroImage from "../assets/hero-image.png";

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
      <section className="flex flex-col lg:flex-row max-w-6xl mx-auto py-12 px-6 lg:px-20 gap-10">
        {/* Property Cards */}
        <div className="flex-1 grid sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="relative">
              <img
                src={heroImage}
                alt="Rustic Retreat Cottage"
                className="w-full h-56 object-cover"
              />
              {/* Top Overlay with price + button */}
              <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent text-white">
                <p className="text-lg font-bold">₦550,000</p>
                <button className="px-3 py-1 bg-green-900 text-white text-sm rounded-lg hover:bg-green-800">
                  View Details
                </button>
              </div>
              {/* Bottom Overlay with property details */}
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent text-xs text-white">
                4 beds • 1 baths • 1913sqft • RealtyFinder
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold">Rustic Retreat Cottage</h3>
              <p className="text-sm text-gray-500">
                An elegant 3-bedroom, 2.5-bathroom in a gated community...
              </p>
              <Link
                to="#"
                className="text-green-800 text-sm font-medium mt-2 block"
              >
                Plot 16 Chief Nkufe Street, Trans Amadi Industrial Layout
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="relative">
              <img
                src={heroImage}
                alt="Metropolitan Haven"
                className="w-full h-56 object-cover"
              />
              {/* Top Overlay with price + button */}
              <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent text-white">
                <p className="text-lg font-bold">₦550,000</p>
                <button className="px-3 py-1 bg-green-900 text-white text-sm rounded-lg hover:bg-green-800">
                  View Details
                </button>
              </div>
              {/* Bottom Overlay with property details */}
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent text-xs text-white">
                4 beds • 1 baths • 1913sqft • RealtyFinder
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold">Metropolitan Haven</h3>
              <p className="text-sm text-gray-500">
                A chic and fully-furnished 2-bedroom apartment with panoramic
                city views...
              </p>
              <Link
                to="#"
                className="text-green-800 text-sm font-medium mt-2 block"
              >
                Plot 16 Chief Nkufe Street, Trans Amadi Industrial Layout
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-900">
            Thinking of renting out your property with ease?
          </h2>
          <p className="mt-4 text-gray-600">
            List your property for rent on RealtyFinder and connect with millions
            of potential renters – completely free. The process takes just
            minutes, with no hidden fees or surprises.
          </p>
          <button className="mt-6 px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
