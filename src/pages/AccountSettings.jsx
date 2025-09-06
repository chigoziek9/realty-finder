// src/pages/AccountSettings.jsx
import DashboardLayout from "../components/DashboardLayout";

export default function AccountSettings() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <p className="text-gray-600 mt-2">
        Manage your account details and preferences.
      </p>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" className="w-full border rounded-lg p-2" defaultValue="Charles Doe" />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full border rounded-lg p-2" defaultValue="email@gmail.com" />
        </div>
        <button className="mt-4 bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}
