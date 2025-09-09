// src/pages/AccountSettings.jsx
import DashboardLayout from "../components/DashboardLayout";
import { User, BellRing, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold">Account settings</h1>
        <Info size={18} className="text-green-700" />
      </div>
      <p className="text-gray-600 mb-6">
        Manage your profile, preferences, and security options.
      </p>

      {/* Profile Card */}
      <div
        onClick={() => navigate("/profile")}
        className="bg-gray-100 p-5 rounded-lg flex items-center justify-between mb-4 cursor-pointer transition hover:bg-gray-200"
      >
        <div className="flex items-center gap-4">
          <User size={20} className="text-green-700" />
          <div>
            <p className="font-medium">Profile</p>
            <p className="text-sm text-gray-600">
              Personalize your account and update your sign in preferences.
            </p>
          </div>
        </div>
        <span className="text-gray-500 text-lg">&gt;</span>
      </div>

      {/* Notifications Card */}
      <div
        onClick={() => navigate("/notifications")}
        className="bg-gray-100 p-5 rounded-lg flex items-center justify-between cursor-pointer transition hover:bg-gray-200"
      >
        <div className="flex items-center gap-4">
          <BellRing size={20} className="text-green-700" />
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-sm text-gray-600">
              Manage the content and frequency of your RealtyFinder emails.
            </p>
          </div>
        </div>
        <span className="text-gray-500 text-lg">&gt;</span>
      </div>
    </DashboardLayout>
  );
}
