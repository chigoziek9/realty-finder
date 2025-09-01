import { useState } from "react";
import Layout from "./Layout";

export default function SavedProperty() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <Layout>
      <h3 className="text-lg font-semibold mb-6">Notification type</h3>

      {/* Email */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <p className="font-medium">Email</p>
        <button
          onClick={() => setEmailEnabled(!emailEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            emailEnabled ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              emailEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>

      {/* SMS */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium">Text message (SMS)</p>
        <button
          onClick={() => setSmsEnabled(!smsEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            smsEnabled ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              smsEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>

      {/* Write up */}
      <p className="text-sm text-gray-600 mb-6">
        Get notified of your saved homes' price drops, tour availability, 
        open houses and more.
      </p>

      {/* Divider */}
      <hr className="my-6" />

      {/* Saved homes info */}
      <div>
        <p className="font-medium mb-1">Saved homes</p>
        <p className="text-sm text-gray-600 mb-4">You have 2 saved homes</p>
        <p className="text-green-600 underline cursor-pointer">Manage saved homes</p>
      </div>
    </Layout>
  );
}
