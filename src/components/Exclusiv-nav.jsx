import { useState } from "react";
import Properties from "./property.jsx";

export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState("new");

  const tabs = [
    { id: "new", label: "New to market" },
    { id: "nature", label: "Nature Nearby" },
    { id: "most", label: "Most viewed homes" },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10">
      {/* Tabs */}
      <div className="flex md:justify-center">
        <div className="flex gap-6 sm:gap-8 border-b border-gray-200 pb-2 overflow-x-auto no-scrollbar md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm sm:text-base transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-black font-semibold text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "new" && (
          <div className="mt-6">
            <Properties />
          </div>
        )}
        {activeTab === "nature" && (
          <div className="mt-6">
            <Properties />
          </div>
        )}
        {activeTab === "most" && (
          <div className="mt-6">
            <Properties />
          </div>
        )}
      </div>
    </div>
  );
}
