import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { useContext, useState } from "react";
import { Heart, Settings, LogOut, FileText } from "lucide-react";

export default function NewTenancyAgreement() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Form states
  const [tenantName, setTenantName] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [landlordAddress, setLandlordAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agreement created:", {
      tenantName,
      tenantAddress,
      landlordName,
      landlordAddress,
    });
  };

  // Helper for active sidebar button
  const isActive = (path) =>
    location.pathname === path ? "bg-green-800 font-semibold" : "";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-800">
          RealtyFinder
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left hover:bg-green-800 ${isActive(
              "/dashboard"
            )}`}
          >
            <FileText size={18} /> Dashboard
          </button>
          <button
            onClick={() => navigate("/my-listings")}
            className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left hover:bg-green-800 ${isActive(
              "/my-listings"
            )}`}
          >
            <FileText size={18} /> My Listings
          </button>
          <button
            onClick={() => navigate("/saved-properties")}
            className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left hover:bg-green-800 ${isActive(
              "/saved-properties"
            )}`}
          >
            <Heart size={18} /> My Saved Property
          </button>
          <button
            onClick={() => navigate("/documents")}
            className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left hover:bg-green-800 ${isActive(
              "/documents"
            )}`}
          >
            <FileText size={18} /> My Documents
          </button>
          <button
            onClick={() => navigate("/new-tenancy-agreement")}
            className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left ${isActive(
              "/new-tenancy-agreement"
            )}`}
          >
            <FileText size={18} /> New Tenancy Agreement
          </button>
          <button
            onClick={() => navigate("/owners-settings")}
            className={`flex items-center gap-2 px-3 py-2 rounded w-full text-left hover:bg-green-800 ${isActive(
              "/owners-settings"
            )}`}
          >
            <Settings size={18} /> Account Settings
          </button>
        </nav>
        <div className="p-6 border-t border-green-800">
          <div className="flex items-center space-x-3">
            <img
              src={user?.profilePic || "https://via.placeholder.com/40"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="flex flex-col">
              <p className="font-medium">{user?.name || "Charles Doe"}</p>
              <p className="text-sm text-gray-300">
                {user?.email || "email@gmail.com"}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 mt-3 text-sm hover:text-red-400">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Create Tenancy Agreement
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Generate and customize rental agreements in minutes.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-8"
        >
          {/* Document Details */}
          <section>
            <h2 className="bg-gray-200 px-4 py-2 font-semibold text-gray-700 rounded">
              Document details
            </h2>
          </section>

          {/* Tenant Info */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              About the Tenant
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Enter the tenant’s details for inclusion in the agreement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Tenant name"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tenant current address"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={tenantAddress}
                onChange={(e) => setTenantAddress(e.target.value)}
              />
            </div>
          </section>

          {/* Tenancy Details */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              Tenancy details
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Please provide the tenancy details. The information you enter will
              appear on the agreement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <select className="border rounded-lg p-3 w-full">
                <option>1 Year</option>
                <option>6 Months</option>
              </select>
              <input type="date" className="border rounded-lg p-3 w-full" />
              <input type="date" className="border rounded-lg p-3 w-full" />
            </div>
          </section>

          {/* Landlord Info */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              Property information
            </h3>
            <p className="bg-gray-200 px-4 py-2 font-medium text-gray-700 rounded mb-4">
              Landlord information
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Landlord’s name"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={landlordName}
                onChange={(e) => setLandlordName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Landlord’s address"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={landlordAddress}
                onChange={(e) => setLandlordAddress(e.target.value)}
              />
            </div>
          </section>

          {/* Agreement Preferences */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              Agreement preferences
            </h3>
            <p className="bg-gray-200 px-4 py-2 font-medium text-gray-700 rounded mb-4">
              Please select any options below that apply to this agreement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                [
                  "Social conduct clause",
                  "Will the tenant be allowed to sublet the property?",
                ],
                [
                  "Guarantor required",
                  "Is a guarantor required for this tenancy?",
                ],
                [
                  "Subletting prohibited",
                  "Is the tenant prohibited from subletting the property?",
                ],
                [
                  "Structural modifications prohibited",
                  "Is the tenant prohibited from making any structural modifications to the property?",
                ],
                [
                  "Parking allocated",
                  "Will the tenant have an allocated parking space at the property?",
                ],
                [
                  "Pets prohibited",
                  "Is the tenant prohibited from keeping pets on the property?",
                ],
                [
                  "Tenant responsible for own property insurance",
                  "Is the tenant responsible for insuring their personal property on the premises?",
                ],
                [
                  "Tenancy renewal allowed",
                  "Does the tenant have the right to renew the tenancy for an additional term?",
                ],
                [
                  "Rent review allowed",
                  "Does the landlord have the right to review and adjust the rent amount?",
                ],
              ].map(([title, desc], i) => (
                <label key={i} className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <span className="font-medium text-gray-800">{title}</span>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Extra fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <select className="border rounded-lg p-3 w-full">
                <option>-1</option>
                <option>6 Months</option>
                <option>1 Year</option>
              </select>
              <select className="border rounded-lg p-3 w-full">
                <option>1</option>
                <option>5</option>
                <option>10</option>
              </select>
              <input
                type="text"
                placeholder="Enter number of parking lots"
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </section>

          {/* Terms */}
          <section className="flex items-start gap-2 mt-8">
            <input type="checkbox" id="terms" className="mt-1" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              By checking this box, you confirm that you have read and agree to
              our{" "}
              <a href="#" className="text-green-600 underline">
                Terms and Conditions
              </a>
              . Please review them carefully before proceeding.
            </label>
          </section>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg font-medium"
            >
              Save as draft
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-5 py-2 rounded-lg font-medium"
            >
              Save & preview document
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-lg font-medium"
            >
              Create
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
