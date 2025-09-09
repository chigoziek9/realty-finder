// src/pages/AddPropertyRequestAlert.jsx
import DashboardLayout from "../components/DashboardLayout";

export default function AddPropertyRequestAlert() {
  return (
    <DashboardLayout>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>Property request alert</span> &gt;{" "}
        <span className="text-green-800 font-medium">
          Add property request alert
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">
        Property Request Alert
      </h1>
      <p className="text-gray-600 mt-1">
        View, manage, and update all your properties in one place.
      </p>

      {/* Form */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Property Request Detail</h2>

        <form className="space-y-4">
          {/* Category / Type / Subtype */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="border rounded-lg p-2">
              <option>Any</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
            <select className="border rounded-lg p-2">
              <option>Any</option>
              <option>Rent</option>
              <option>Buy</option>
            </select>
            <select className="border rounded-lg p-2">
              <option>Any</option>
              <option>Duplex</option>
              <option>Flat</option>
            </select>
          </div>

          {/* Bedrooms / State / Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="border rounded-lg p-2">
              <option>Any</option>
              <option>1</option>
              <option>2</option>
            </select>
            <select className="border rounded-lg p-2">
              <option>Any</option>
              <option>Lagos</option>
              <option>Rivers</option>
            </select>
            <select className="border rounded-lg p-2">
              <option>Any</option>
              <option>Ikeja</option>
              <option>Port Harcourt</option>
            </select>
          </div>

          {/* Min / Max Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="border rounded-lg p-2">
              <option>Select Min</option>
              <option>₦100k</option>
              <option>₦500k</option>
            </select>
            <select className="border rounded-lg p-2">
              <option>Select Max</option>
              <option>₦1m</option>
              <option>₦5m</option>
            </select>
          </div>

          {/* Comments */}
          <textarea
            placeholder="Comments"
            className="w-full border rounded-lg p-2 h-24"
          ></textarea>

          {/* Name / Account Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border rounded-lg p-2"
            />
            <select className="border rounded-lg p-2">
              <option>Individual</option>
              <option>Property Owner</option>
              <option>Agent</option>
            </select>
          </div>

          {/* Phone / Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter phone number"
              className="border rounded-lg p-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800"
          >
            Create Request
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
