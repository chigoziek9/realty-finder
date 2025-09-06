// src/pages/Rent.jsx

import { Search, Heart, Settings, Home } from "lucide-react";
import Footer from "../components/Footer";
import Viewproperty from "../components/Viewproperty";
import Filters from "../components/Filters";
import FeedNav from "../components/FeedNav";
import phoneimg from "../assets/iPhonerent.png";
import Good from "../assets/Goodcheck.png";
import { Link } from "react-router-dom";

export default function Rent() {
 {/*  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
    price: "",
    size: "",
    year: "",
  });
 {/* ✅ Hero Section 
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
  };*/}

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Hero Section */}
      <div>
        <div className="bg-gradient-to-r from-[#a3ca87] via-green-100 to-white w-full h-auto md:h-[380px] md:relative">
          <div className="px-6 py-12 md:p-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug md:leading-tight text-center md:text-left">
              Find your dream property
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-[22px] font-['Plus_Jakarta_Sans'] font-medium leading-relaxed tracking-normal text-center md:text-left">
              Looking for houses for sale nearby? Easily explore available
              listings in your area, complete with high-quality photos, pricing,
              and detailed property descriptions to help you make informed
              decisions.
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
                <Link
                  to="/rent-property"
                  className="px-3"
                >
                  Find Property
                </Link>
              
              </button>
            </div>
          </div>
        </div>

        {/* filters */}
        <div className="bg-[#f3f3f3] p-4 mt-6 sm:mt-7 mx-4 sm:mx-11 rounded-2xl shadow-md md:relative md:z-20">
          <Filters />
        </div>
      </div>

      {/* ✅ Abuja House Card + Rental Solution Side by Side */}
      <div className="bg-[#FAFAFA] ">
        <div className="flex flex-col lg:flex-row items-center gap-10 m-20">
          <div className="flex justify-center flex-1">
            <img
              src={phoneimg}
              alt="Phone displaying rental app"
              className="w-full sm:w-[500px] md:w-[700px] lg:w-[500px] h-auto rounded-[45px]"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <div className="flex mb-4 justify-center lg:justify-start">
              <div className="flex items-center justify-center gap-2 border border-gray-400 text-gray-800 px-4 py-2 rounded-full shadow-sm">
                <img src={Good} alt="" />
                <span className="font-medium">Rental Solution</span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
              From budgeting to move-in, <br />
              everything you need in one <br /> place.
            </h1>

            <p className="mt-3 text-gray-600 font-['Plus_Jakarta_Sans'] font-normal text-[20px] leading-[32px] tracking-normal align-middle">
              Stay ahead with the latest rental market trends, use our rent
              calculator to find a budget-friendly home and explore expert tips
              tailored for first-time renters. Whether you’re comparing listing
              or preparing to sign a lease, our tools and resources make the
              process simple, informed and stress-free.
            </p>
            <button className="mt-6 px-9 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800">
                <Link
                  to="/explore"
                  className="px-3"
                >
                  Explore Rentals
                </Link>
           
          </button>

          </div>
        </div>
      </div>

      {/* ✅ Rental Resources */}
      <section className="bg-gray-50 py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-left">
            Rental Resources and Support
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-green-900 text-white rounded-4xl p-8 text-left  h-[500px]">
              <h3 className="text-7xl font-light text-right">01</h3>
              <h4 className="text-5xl font-semibold mt-15 ">
                Rental market trend
              </h4>
              <p className="mt-10 text-[#f3fff6] font-['Plus_Jakarta_Sans'] font-normal text-[20px] leading-[32px] tracking-normal align-middle">
                Explore current insights and data to make informed decisions in
                today’s rental landscape.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-green-900 text-white rounded-4xl p-8 text-left  h-[500px]">
              <h3 className="text-7xl font-light text-right">02</h3>
              <h4 className="text-5xl font-semibold mt-15 ">Rent calculator</h4>
              <p className="mt-10 text-[#f3fff6] font-['Plus_Jakarta_Sans'] font-normal text-[20px] leading-[32px] tracking-normal align-middle">
                Quickly determine your ideal rent based on your income, expenses
                and lifestyle.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-green-900 text-white rounded-4xl p-8 text-left  h-[500px]">
              <h3 className="text-7xl font-light text-right">03</h3>
              <h4 className="text-5xl font-semibold mt-15 ">
                First-time renter tips
              </h4>
              <p className="mt-10 text-[#f3fff6] font-['Plus_Jakarta_Sans'] font-normal text-[20px] leading-[32px] tracking-normal align-middle">
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
