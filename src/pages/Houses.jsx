import { useState } from "react";
import Frame from "../assets/Frame.png"; // replace with your image
import Size from "../assets/size.png"; // replace with your image
import Location from "../assets/Vector.png"
import Calendar from "../assets/calendar.png"
import Pricing from "../assets/pricing.png"

export default function Houses() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [pricing, setPricing] = useState("");

  return (
    <div className="w-full px-4 bg-[#ffffff]">
      {/* Parent container: column on mobile, row on md+ screens */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {/* Location Box */}
        <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden w-[236px] h-[52px]">
          {/* Icon */}
          <div className="px-3 text-gray-500 flex items-center">
            <img src={Frame} alt="icon" />
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 mx-2" />

          {/* Dropdown */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 p-3 text-gray-700 text-base focus:outline-none"
          >
            <option value="">Location</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
            <option value="portharcourt">Port Harcourt</option>
            <option value="kano">Kano</option>
          </select>
        </div>

        {/* Type Box */}
        <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden w-[236px] h-[52px]">
          <div className="px-3 text-gray-500 flex items-center">
            <img src={Frame} alt="icon" />
          </div>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex-1 p-3 text-gray-700 text-base focus:outline-none"
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="duplex">Duplex</option>
            <option value="bungalow">Bungalow</option>
          </select>
        </div>

        {/* Pricing Box */}
        <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden w-[236px] h-[52px]">
          <div className="px-3 text-gray-500 flex items-center">
            <img src={Frame} alt="icon" />
          </div>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <select
            value={Pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="flex-1 p-3 text-gray-700 text-base focus:outline-none"
          >
            <option value="">Pricing Range</option>
            <option value="low">₦0 - ₦500k</option>
            <option value="mid">₦500k - ₦2M</option>
            <option value="high">₦2M+</option>
          </select>
        </div>

        {/* Size Box */}
        <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden w-[236px] h-[52px]">
          <div className="px-3 text-gray-500 flex items-center">
            <img src={Size} alt="icon" />
          </div>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <select
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="flex-1 p-3 text-gray-700 text-base focus:outline-none"
          >
            <option value="">Property Size</option>
            <option value="low">₦0 - ₦500k</option>
            <option value="mid">₦500k - ₦2M</option>
            <option value="high">₦2M+</option>
          </select>
        </div>

        {/* Year Box */}
        <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden w-[236px] h-[52px]">
          <div className="px-3 text-gray-500 flex items-center">
            <img src={Calendar} alt="icon" />
          </div>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <select
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="flex-1 p-3 text-gray-700 text-base focus:outline-none"
          >
            <option value="">Build Year</option>
            <option value="low">₦0 - ₦500k</option>
            <option value="mid">₦500k - ₦2M</option>
            <option value="high">₦2M+</option>
          </select>
        </div>
      </div>
    </div>
  );
}
