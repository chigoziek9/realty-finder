import { useState } from "react";
import Layout from "./Layout";

export default function Messages() {
  const [smsEnabled, setSmsEnabled] = useState(true);

  return (
    <Layout>
      <h3 className="text-lg font-semibold mb-6">Notification type</h3>

      {/* Text message (SMS) */}
      <div className="flex items-start justify-between border-b pb-4">
        <div>
          <p className="font-medium">Text message (SMS)</p>
          <p className="text-sm text-gray-600">
            Get notified of your saved homes' price drops, tour availability, 
            open houses and more.
          </p>
        </div>
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
    </Layout>
  );
}
