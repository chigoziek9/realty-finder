import Viewproperty from "../components/Viewproperty";
import Filters from "../components/Filters";
import Settings from "../assets/feedsetting.png";
import FeedNav from "../components/FeedNav";
import Footer from "../components/Footer";
import AgentCards from "../components/AgentCards";
import FAQSection from "../components/FAQSection";
import AgentsProfile from "../components/AgentsProfile";

export default function Agent() {
  return (
    <>
      <div className="bg-[#ffffff]">
        {/* hero-section */}
        <div>
          <div className="bg-gradient-to-r from-[#a3ca87] via-green-100 to-white w-full h-auto md:h-[500px] relative">
            <div className="px-4 sm:px-6 md:px-20 py-10 md:py-20 text-center md:text-left">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 leading-snug md:leading-tight">
                Connect with the most experienced real estate agents on{" "}
                <br className="hidden md:block" />
                RealtyFinder
              </h1>
              <p className="mt-4 text-sm sm:text-base md:text-[22px] font-['Plus_Jakarta_Sans'] font-medium leading-relaxed tracking-normal">
                Our network features top-performance agents with a proven track
                record of successful sales and deep local expertise. Whether
                you’re buying, selling or renting, we’ll match you with
                professionals who understand your needs and the market.
              </p>
            </div>

            {/* search-bar */}
            <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 md:p-6 bg-[#f3f3f3] rounded-2xl shadow-md relative md:-bottom-10">
              <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl shadow-sm border border-[#b9b9b9] overflow-hidden">
                {/* Input */}
                <input
                  type="text"
                  placeholder="Find agents in your area"
                  className="flex-1 px-4 py-3 text-sm sm:text-base text-[#313131] focus:outline-none"
                />

                {/* Button */}
                <button className="flex items-center justify-center bg-green-800 hover:bg-green-900 text-white px-5 sm:px-6 py-3 sm:py-0">
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
                  <p className="text-white px-2 text-sm sm:text-base">
                    Find agent
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* sections */}
          <AgentsProfile />
          <AgentCards />

          <div className="mt-12 sm:mt-20 px-3 sm:px-6">
            <FAQSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
