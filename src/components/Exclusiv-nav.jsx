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
    <div className="">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-1 transition font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-black font-bold"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6 w-screen -mx-[calc((100vw-100%)/2)]">
        {activeTab === "new" && (
          <div>
            <div className="w-[100%] mt-10">
              <Properties />
            </div>
          </div>
        )}
        {activeTab === "nature" && (
          <div>
            <div className="w-[100%] mt-10">
              <Properties />
            </div>
          </div>
        )}
        {activeTab === "most" && (
          <div>
            <div className="w-[100%] mt-10">
              <Properties />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
