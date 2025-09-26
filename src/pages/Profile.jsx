import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { AuthContext } from "../AuthContext";
import React from "react";

export default function AccountSettings() {
  const navigate = useNavigate();
  const { updateProfile } = useContext(AuthContext);

  const initialForm = {
    profileType: "Individual",
    firstName: "",
    middleName: "",
    lastName: "",
    companyName: "",
    address: "",
    state: "",
    email: "",
    phone: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    profilePhoto: null,
  };

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null); // store actual file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file)); // for image preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (file) {
      formData.append("profilePhoto", file);
    }

    await updateProfile(formData);

    navigate("/profile");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-green-700 hover:underline"
          >
            Account settings
          </button>{" "}
          &gt; Profile
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">Account settings</h1>
        <p className="text-gray-600 mb-8">
          Manage your profile, preferences, and security options.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h2 className="text-lg font-medium mb-6">Edit your profile</h2>

          {/* Radio options */}
          <div className="flex items-center gap-6 mb-8">
            {["Individual", "Property owner", "Real estate agent"].map(
              (type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="profileType"
                    value={type}
                    checked={form.profileType === type}
                    onChange={handleChange}
                  />
                  <span>{type}</span>
                </label>
              )
            )}
          </div>

          {/* Profile photo + fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile photo */}
            <div className="flex flex-col items-center">
              <img
                src={preview || "https://via.placeholder.com/400"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <label className="mt-2 text-green-600 text-sm hover:underline cursor-pointer">
                Change photo
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
              <p className="text-xs text-gray-400 mt-1">
                Photo dimension 400×400
              </p>
            </div>

            {/* Input fields */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="border rounded-lg p-3 w-full"
              />
              <input
                type="text"
                name="middleName"
                value={form.middleName}
                onChange={handleChange}
                placeholder="Middle name"
                className="border rounded-lg p-3 w-full"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="border rounded-lg p-3 w-full"
              />
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Company name"
                className="border rounded-lg p-3 w-full"
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="border rounded-lg p-3 w-full"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="border rounded-lg p-3 w-full"
              />
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              >
                <option value="">Choose an option</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Enugu">Enugu</option>
              </select>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border rounded-lg p-3 w-full"
              />
            </div>
          </div>

          {/* Profile detail + socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Socials */}
            <div>
              <h3 className="font-medium mb-4">Socials</h3>
              <input
                type="url"
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
                placeholder="www.facebook.com"
                className="border rounded-lg p-3 w-full mb-4"
              />
              <input
                type="url"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                placeholder="www.twitter.com"
                className="border rounded-lg p-3 w-full mb-4"
              />
              <input
                type="url"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="www.linkedin.com"
                className="border rounded-lg p-3 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border"
              onClick={() => setForm(initialForm)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-green-700 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
