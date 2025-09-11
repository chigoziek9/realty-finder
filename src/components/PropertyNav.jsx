import { useState } from "react";
import { Heart, Share2, EyeOff, MoreHorizontal, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PropertyNav() {
  const [active, setActive] = useState("Overview");

  const tabs = ["Overview", "Neighborhood", "Home details", "Property detail"];

  return (
    <div className="flex items-center justify-between border-b px-4 py-2 bg-white shadow-sm ">
      {/* Left Section */}
      <div className="flex items-center  space-x-6">
           <Link
            to="/buy/home"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm">Back to search</span>
            
          </Link>
      </div>
      {/* Tabs */}
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative pb-1 text-sm ${
              active === tab
                ? "text-gray-900 font-medium border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6 text-gray-600">
        <button className="flex items-center hover:text-gray-900">
          <Heart className="w-4 h-4 mr-1" />
          <span className="text-sm">Save</span>
        </button>

        <button className="flex items-center hover:text-gray-900">
          <Share2 className="w-4 h-4 mr-1" />
          <span className="text-sm">Share</span>
        </button>

        <button className="flex items-center hover:text-gray-900">
          <EyeOff className="w-4 h-4 mr-1" />
          <span className="text-sm">Hide</span>
        </button>

        <button className="flex items-center hover:text-gray-900">
          <MoreHorizontal className="w-4 h-4 mr-1" />
          <span className="text-sm">More</span>
        </button>
      </div>
    </div>
  );
}
