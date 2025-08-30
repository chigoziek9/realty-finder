import { useState } from "react";
import Layout from "./Layout";

export default function HomeMatches() {
  const [recommendationsEnabled, setRecommendationsEnabled] = useState(true);
  const [searchMatchEnabled, setSearchMatchEnabled] = useState(false);

  return (
    <Layout>
      {/* ✅ Home Recommendations Section */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Homes you might like</h3>
        <button
          onClick={() => setRecommendationsEnabled(!recommendationsEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            recommendationsEnabled ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              recommendationsEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>

      {/* Email + SMS (inline, no checkboxes) */}
      <p className="text-gray-700 mb-6">Email, Text message (SMS)</p>

      <hr className="my-6 border-gray-300" />

      {/* ✅ For Sale Saved Search Matches Section */}
      <div className="mb-2">
        <h4 className="text-md font-semibold mb-1">For sale saved search matches</h4>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">For sale in Nigeria</h3>
        <button
          onClick={() => setSearchMatchEnabled(!searchMatchEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            searchMatchEnabled ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              searchMatchEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>

      {/* Email + SMS (inline, no checkboxes) */}
      <p className="text-gray-700 mb-6">Email, Text message (SMS)</p>

      <hr className="my-6 border-gray-300" />

      {/* ✅ Edit All Saved Search */}
      <div className="flex justify-center">
        <button className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition">
          Edit all saved searches
        </button>
      </div>
    </Layout>
  );
}
