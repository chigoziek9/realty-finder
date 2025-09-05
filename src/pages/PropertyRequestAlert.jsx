// src/pages/PropertyRequestAlert.jsx
import { Info, Plus, Trash2 } from "lucide-react";
import profileImg from "../assets/profile.png";

export default function PropertyRequestAlert() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col">
        {/* Removed Logo */}

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-3 text-sm">
            <li className="bg-green-700 text-white font-semibold px-3 py-2 rounded-lg cursor-pointer">
              🏠 Dashboard
            </li>
            <li className="text-green-200 hover:text-white cursor-pointer">
              📋 My Requests
            </li>
            <li className="text-green-200 hover:text-white cursor-pointer">
              ❤️ Saved
            </li>
            <li className="text-green-200 hover:text-white cursor-pointer">
              ⚙ Settings
            </li>
          </ul>
        </nav>

        {/* Profile */}
        <div className="p-4 border-t border-green-700 flex items-center gap-3">
          <img
            src={profileImg}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-green-700"
          />
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-green-200">john@example.com</p>
          </div>
        </div>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Property Request Alerts
          </h2>
          <button className="flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800">
            <Plus size={18} /> New Alert
          </button>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
          <Info className="text-green-700 mt-1" size={20} />
          <p className="text-sm text-gray-700">
            Find your ideal home — Explore fresh listings daily, use custom
            filters to narrow your search, and connect directly with property
            managers — all in one convenient platform.
          </p>
        </div>

        {/* Alerts Table */}
        <div className="bg-white rounded-xl shadow-sm border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Budget</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-t">
                <td className="px-6 py-4">Lagos</td>
                <td className="px-6 py-4">Apartment</td>
                <td className="px-6 py-4">₦800,000</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="border-t">
                <td className="px-6 py-4">Abuja</td>
                <td className="px-6 py-4">Duplex</td>
                <td className="px-6 py-4">₦2,000,000</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                    Paused
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
