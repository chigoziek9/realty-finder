// src/pages/Rent.jsx
import { useNavigate } from "react-router-dom";
import { Search, Heart, Settings, Home } from "lucide-react";
import Footer from "../components/Footer";
import heroImage from "../assets/hero-image.png"; 
import logoImg from "../assets/logo.png"; 
import { useState } from "react";

export default function Rent() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
    price: "",
    size: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(
      Object.entries(filters).filter(([, v]) => v !== "")
    ).toString();

    navigate(`/rent-property?${query}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Hero Section */}
      <section className="bg-gradient-to-r from-green-200 to-green-50 py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Find your ideal home
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore fresh listings daily, use custom filters to narrow your
            search, and connect directly with property managers—all in one
            convenient platform.
          </p>

          {/* ✅ Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-8 bg-white rounded-xl shadow-lg p-4 w-full max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleChange}
                placeholder="Search for a property"
                className="flex-1 px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-green-900 text-white px-6 py-2 hover:bg-green-800 flex items-center gap-2"
              >
                <Search size={18} /> Find property
              </button>
            </div>

            {/* ✅ Filter Options */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <select
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg text-gray-600 text-sm"
              >
                <option value="">Location</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="ph">Port Harcourt</option>
              </select>

              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg text-gray-600 text-sm"
              >
                <option value="">Property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="duplex">Duplex</option>
              </select>

              <select
                name="price"
                value={filters.price}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg text-gray-600 text-sm"
              >
                <option value="">Pricing range</option>
                <option value="0-500000">₦0 - ₦500,000</option>
                <option value="500000-1000000">₦500,000 - ₦1,000,000</option>
                <option value="1000000+">₦1,000,000+</option>
              </select>

              <select
                name="size"
                value={filters.size}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg text-gray-600 text-sm"
              >
                <option value="">Property size</option>
                <option value="1-2">1 - 2 Bedrooms</option>
                <option value="3-4">3 - 4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>

              <select
                name="year"
                value={filters.year}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg text-gray-600 text-sm"
              >
                <option value="">Build year</option>
                <option value="2020+">2020+</option>
                <option value="2010-2019">2010 - 2019</option>
                <option value="2000-2009">2000 - 2009</option>
              </select>
            </div>
          </form>
        </div>
      </section>

      {/* ✅ Abuja House Card + Rental Solution Side by Side */}
      <section className="max-w-6xl mx-auto pb-16 px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-start mt-10">
        {/* Abuja House Card - Clean phone-style mockup */}
        <div className="flex justify-center">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-[280px] h-[600px] flex flex-col border">
            
            {/* Top Bar with Logo + Hamburger */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <img src={logoImg} alt="Logo" className="h-5" />
              <div className="space-y-1 cursor-pointer">
                <span className="block w-5 h-0.5 bg-gray-800"></span>
                <span className="block w-5 h-0.5 bg-gray-800"></span>
                <span className="block w-5 h-0.5 bg-gray-800"></span>
              </div>
            </div>

            {/* Intro Text */}
            <div className="px-4 py-3 border-b">
              <h2 className="text-green-900 font-bold text-sm">Find your ideal home</h2>
              <p className="text-gray-600 text-xs mt-1">
                Explore fresh listings daily, use custom filters to narrow your search,
                and connect directly with property managers—all in one convenient
                platform.
              </p>
            </div>

            {/* Price & Button */}
            <div className="flex justify-between items-center px-3 py-2">
              <h3 className="text-lg font-semibold">₦550,000</h3>
              <button className="bg-green-700 text-white text-xs px-3 py-1 rounded-md">
                View details
              </button>
            </div>

            {/* Property Info */}
            <div className="flex justify-between text-gray-500 text-xs px-3 mb-2">
              <span>4 beds • 1 baths • 1931 sqft • RealtyFinder</span>
              <span>2d ago</span>
            </div>

            {/* Image */}
            <img
              src={heroImage}
              alt="Rental Property"
              className="w-full h-40 object-cover"
            />

            {/* Title & Description */}
            <div className="px-3 py-2 flex-1 flex flex-col">
              <h4 className="text-base font-semibold">Rustic retreat cottage</h4>
              <p className="text-gray-600 text-xs mb-1">
                An elegant 3–bedroom townhouse in a gated community…
                <span className="text-green-700 font-medium cursor-pointer"> Read More</span>
              </p>
              <a
                href="#"
                className="block text-green-700 text-xs underline mb-2"
              >
                Plot 16 Chief Nwuke Street <br /> Trans Amadi Industrial Layout
              </a>

              {/* Bottom Icons */}
              <div className="flex justify-between items-center mt-auto">
                <Settings size={16} className="text-gray-500 cursor-pointer" />
                <Heart size={16} className="text-gray-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Rental Solution */}
        <div className="lg:pl-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <Home size={20} className="text-green-900" />
            <span className="text-green-900 font-semibold text-sm uppercase">
              Rental Solution
            </span>
          </div>
          <h2 className="mt-3 text-2xl lg:text-3xl font-bold text-gray-900 leading-snug">
            From budgeting to move-in, everything you need in one place.
          </h2>
          <p className="mt-4 text-gray-600">
            Stay ahead with the latest rental market trends, use our rent
            calculator to find a budget-friendly home and explore expert tips
            tailored for first-time renters. Whether you’re comparing listings
            or preparing to sign a lease, our tools and resources make the
            process simple, informed and stress-free.
          </p>
          <button className="mt-6 px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800">
            See how
          </button>
        </div>
      </section>

      {/* ✅ Rental Resources */}
      <section className="bg-gray-50 py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Rental Resources and Support
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-green-900 text-white rounded-xl p-8 text-left">
              <h3 className="text-xl font-semibold">01</h3>
              <h4 className="text-lg font-bold mt-3">Rental market trend</h4>
              <p className="mt-3 text-sm">
                Explore current insights and data to make informed decisions in
                today’s rental landscape.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-md rounded-xl p-8 text-left">
              <h3 className="text-xl font-semibold text-green-900">02</h3>
              <h4 className="text-lg font-bold mt-3">Rent calculator</h4>
              <p className="mt-3 text-sm text-gray-600">
                Quickly determine your ideal rent based on your income, expenses
                and lifestyle.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-md rounded-xl p-8 text-left">
              <h3 className="text-xl font-semibold text-green-900">03</h3>
              <h4 className="text-lg font-bold mt-3">First-time renter tips</h4>
              <p className="mt-3 text-sm text-gray-600">
                Helpful advice and best practices to guide you through your
                first rental experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
