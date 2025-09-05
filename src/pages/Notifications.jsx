import Layout from "../pages/Layout";
import { Bell, Mail, MessageSquare } from "lucide-react";

export default function Notifications() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Bell className="text-green-900" size={24} />
          Notifications
        </h1>

        {/* Example notification list */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <Mail className="text-blue-500" size={20} />
            <div>
              <p className="font-medium">New email alert</p>
              <p className="text-sm text-gray-600">You have a new property update via email.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <MessageSquare className="text-purple-500" size={20} />
            <div>
              <p className="font-medium">New message received</p>
              <p className="text-sm text-gray-600">An agent replied to your property inquiry.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <Bell className="text-green-600" size={20} />
            <div>
              <p className="font-medium">System notification</p>
              <p className="text-sm text-gray-600">Your property request has been reviewed.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
