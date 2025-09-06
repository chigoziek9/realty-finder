// src/pages/MyPropertyAlerts.jsx
import DashboardLayout from "../components/DashboardLayout";

export default function MyPropertyAlerts() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">My Property Alerts</h1>
      <p className="text-gray-600 mt-2">
        Here you can view all the property alerts you’ve set up.
      </p>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700">No property alerts available yet.</p>
      </div>
    </DashboardLayout>
  );
}
