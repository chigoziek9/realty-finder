import { useState } from "react";
import Frame from "../assets/Frame.png"; 
import Size from "../assets/size.png"; 
import Location from "../assets/Vector.png";
import Calendar from "../assets/calendar.png";
import Pricing from "../assets/pricing.png";

export default function Filters() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [pricing, setPricing] = useState("");
   const [Sizes , setSizes] = useState("");
    const [Years , setYears] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const FilterBox = ({ icon, value, setValue, options, placeholder }) => (
    <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden w-full sm:w-[236px] h-[52px]">
      <div className="px-3 flex items-center">
        <img src={icon} alt="icon" />
      </div>
      <div className="h-6 w-px bg-gray-300 mx-2" />
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 p-2 text-gray-700 text-sm sm:text-base focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full px-4">
      {/* Feed header + Filter button in same row */}
      <div className="flex justify-between items-center mb-3 sm:hidden">
        <h2 className="text-lg font-semibold text-gray-800">Feeds</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-green-900 text-white rounded-lg text-sm"
        >
          {showFilters ? "Close Filters" : "Filter"}
        </button>
      </div>

      {/* Filters container */}
      <div
        className={`
          flex flex-col sm:flex-row gap-4 justify-center items-center
          ${showFilters ? "block" : "hidden sm:flex"}
        `}
      >
        {/* Location */}
        <FilterBox
          icon={Location}
          value={location}
          setValue={setLocation}
          placeholder="Location"
          options={[
            { value: "lagos", label: "Lagos" },
            { value: "abuja", label: "Abuja" },
            { value: "portharcourt", label: "Port Harcourt" },
            { value: "kano", label: "Kano" },
          ]}
        />

        {/* Type */}
        <FilterBox
          icon={Frame}
          value={type}
          setValue={setType}
          placeholder="Property Type"
          options={[
            { value: "apartment", label: "Apartment" },
            { value: "duplex", label: "Duplex" },
            { value: "bungalow", label: "Bungalow" },
          ]}
        />

        {/* Pricing */}
        <FilterBox
          icon={Pricing}
          value={pricing}
          setValue={setPricing}
          placeholder="Pricing Range"
          options={[
            { value: "low", label: "₦0 - ₦500k" },
            { value: "mid", label: "₦500k - ₦2M" },
            { value: "high", label: "₦2M+" },
          ]}
        />

        {/* Size */}
        <FilterBox
          icon={Size}
          value={Sizes}
          setValue={setSizes}
          placeholder="Property Size"
          options={[
            { value: "small", label: "1-2 Bedroom" },
            { value: "medium", label: "3-4 Bedroom" },
            { value: "large", label: "5+ Bedroom" },
          ]}
        />

        {/* Year */}
        <FilterBox
          icon={Calendar}
          value={Years}
          setValue={setYears}
          placeholder="Build Year"
          options={[
            { value: "2020", label: "2020+" },
            { value: "2010", label: "2010 - 2019" },
            { value: "2000", label: "2000 - 2009" },
          ]}
        />
      </div>
    </div>
  );
}
