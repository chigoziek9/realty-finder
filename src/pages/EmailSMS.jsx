import { useState } from "react";
import Layout from "../pages/Layout"; 

export default function EmailSms() {   // 👈 renamed here
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <Layout>
      <div className="p-6">
        {/* Page Heading */}
        <h3 className="text-lg font-semibold mb-6">Notification type</h3>

        {/* Email Toggle */}
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

        {/* SMS Toggle */}
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

        {/* Info Text */}
        <p className="text-sm text-gray-600">
          Get notified when new homes match your saved search criteria or recommendations.
        </p>
      </div>
    </Layout>
  );
}
