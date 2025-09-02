import { useState } from "react";
import Properties from "./property.jsx";

export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "new", label: "New" },
    { id: "favourite", label: "Favourite" },
    { id: "sold", label: "Sold" },
    { id: "status", label: "Status change" },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Tabs */}
      <div className="flex">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2 rounded-full 
                text-sm sm:text-base font-medium transition-all border 
                ${
                  activeTab === tab.id
                    ? "bg-green-900 text-white border-green-900"
                    : "bg-white text-black border-gray-300 hover:border-gray-400"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-7">
          Previous update
        </h1>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "new" && <Properties />}
        {activeTab === "favourite" && <Properties />}
        {activeTab === "sold" && <Properties />}
        {activeTab === "status" && <Properties />}
        {activeTab === "all" && <Properties />}
      </div>
    </div>
  );
}
