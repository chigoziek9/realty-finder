import { useState } from "react";
import Layout from "./Layout";

export default function Hometours() {
  const [discoveryEnabled, setDiscoveryEnabled] = useState(true);
  const [lastCallEnabled, setLastCallEnabled] = useState(false);

  return (
    <Layout>
      <h3 className="text-lg font-semibold mb-6">Notification type</h3>

      {/* Home discovery & trends */}
      <div className="flex items-start justify-between border-b pb-4 mb-6">
        <div>
          <p className="font-medium">Home discovery & trends</p>
          <p className="text-sm text-gray-600">
            Find new homes you'll love and stay on top of the latest market trends.
          </p>
        </div>
        <button
          onClick={() => setDiscoveryEnabled(!discoveryEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            discoveryEnabled ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              discoveryEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>

      {/* Last call */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">Last call</p>
          <p className="text-sm text-gray-600">
            Get notified when a home you've shown interest in receives an offer, 
            or has an offer review date approaching.
          </p>
        </div>
        <button
          onClick={() => setLastCallEnabled(!lastCallEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            lastCallEnabled ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              lastCallEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>
    </Layout>
  );
}
