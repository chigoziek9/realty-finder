// src/pages/AddPropertyRequestAlert.jsx
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function AddPropertyRequestAlert() {
  const [formData, setFormData] = useState({
    category: "Any",
    type: "Any",
    subtype: "Any",
    bedrooms: "Any",
    state: "Any",
    area: "Any",
    minPrice: "Select Min",
    maxPrice: "Select Max",
    comments: "",
    name: "",
    accountType: "Individual",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ UPDATED handleSubmit FUNCTION (using fetch)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data in the format expected by your API
    const requestData = {
      email: formData.email,
      propertyType:
        formData.subtype !== "Any"
          ? formData.subtype
          : formData.category !== "Any"
          ? formData.category
          : "apartment",
      location:
        formData.area !== "Any"
          ? formData.area
          : formData.state !== "Any"
          ? formData.state
          : "Lagos",
      minPrice: parseInt(formData.minPrice.replace(/\D/g, "")) || 500,
      maxPrice: parseInt(formData.maxPrice.replace(/\D/g, "")) || 2000,
      bedrooms: formData.bedrooms !== "Any" ? Number(formData.bedrooms) : 1,
      bathrooms: 1, // You can extend this later if your form includes bathrooms
    };

    try {
      const response = await fetch(
        "https://realtyfinder.onrender.com/api/property-requests/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("✅ Property request created successfully!");
        console.log("Response:", data);

        // Reset form
        setFormData({
          category: "Any",
          type: "Any",
          subtype: "Any",
          bedrooms: "Any",
          state: "Any",
          area: "Any",
          minPrice: "Select Min",
          maxPrice: "Select Max",
          comments: "",
          name: "",
          accountType: "Individual",
          phone: "",
          email: "",
        });
      } else {
        alert("⚠️ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error creating property request:", error);
      alert("❌ Failed to create property request. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category / Type / Subtype */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Any</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Any</option>
              <option>Rent</option>
              <option>Buy</option>
            </select>
            <select
              name="subtype"
              value={formData.subtype}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Any</option>
              <option>Duplex</option>
              <option>Flat</option>
            </select>
          </div>

          {/* Bedrooms / State / Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Any</option>
              <option>1</option>
              <option>2</option>
            </select>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Any</option>
              <option>Lagos</option>
              <option>Rivers</option>
            </select>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Any</option>
              <option>Ikeja</option>
              <option>Port Harcourt</option>
            </select>
          </div>

          {/* Min / Max Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="minPrice"
              value={formData.minPrice}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Select Min</option>
              <option>₦100k</option>
              <option>₦500k</option>
            </select>
            <select
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Select Max</option>
              <option>₦1m</option>
              <option>₦5m</option>
            </select>
          </div>

          {/* Comments */}
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Comments"
            className="w-full border rounded-lg p-2 h-24"
          ></textarea>

          {/* Name / Account Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border rounded-lg p-2"
            />
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option>Individual</option>
              <option>Property Owner</option>
              <option>Agent</option>
            </select>
          </div>

          {/* Phone / Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="border rounded-lg p-2"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-lg p-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-900 hover:bg-green-800"
            }`}
          >
            {loading ? "Creating Request..." : "Create Request"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
