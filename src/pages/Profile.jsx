import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { AuthContext } from "../AuthContext";

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, updateProfile } = useContext(AuthContext);

  const [form, setForm] = useState({
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
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  // 🟢 Prefill form with current user info
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        companyName: user.companyName || "",
        address: user.address || "",
        state: user.state || "",
        email: user.email || "",
        phone: user.phone || "",
        facebook: user.socials?.facebook || "",
        twitter: user.socials?.twitter || "",
        linkedin: user.socials?.linkedin || "",
        profilePhoto: user.profilePhoto || null,
      });
      setPreview(user.profilePhoto || "https://via.placeholder.com/400");
    }
  }, [user]);

  // 🟢 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 Handle profile photo upload
  const handlePhotoChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // 🟢 Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const formData = new FormData();

      // Append normal text fields
      const exclude = ["facebook", "twitter", "linkedin", "profilePhoto"];
      for (const key in form) {
        if (!exclude.includes(key) && form[key]) {
          formData.append(key, form[key]);
        }
      }

      // Append socials in correct format
      if (form.facebook) formData.append("socials[facebook]", form.facebook);
      if (form.twitter) formData.append("socials[twitter]", form.twitter);
      if (form.linkedin) formData.append("socials[linkedin]", form.linkedin);

      // Append profile photo if any
      if (file) formData.append("profilePhoto", file);

      // Debug payload
      for (let [k, v] of formData.entries()) console.log(k, v);

      await updateProfile(formData);

      setStatus("✅ Profile updated successfully!");
      setTimeout(() => setStatus(""), 4000);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to update profile. Please try again.");
    }
  };

  // 🟢 JSX
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
                placeholder="Email address"
                className="border rounded-lg p-3 w-full bg-gray-100"
                disabled
              />
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              >
                <option value="">Select state</option>
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

          {/* Socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
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

          {/* Reset Password */}
          <div className="mt-10">
            <Link
              to="/forgot-password"
              className="px-5 py-2 bg-green-900 mt-6 text-white rounded-xl hover:bg-green-800"
            >
              Reset Password
            </Link>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border"
              onClick={() => window.location.reload()}
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

          {/* Status Message */}
          {status && (
            <p className="text-sm mt-4 text-gray-600 text-center">{status}</p>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
