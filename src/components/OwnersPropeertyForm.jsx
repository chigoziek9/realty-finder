import { Clock, Bell, Heart, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import {
 
 
  X,
  Menu,
  FileText,
  Trash2,
} from "lucide-react";

export default function OwnersPropertyForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useContext(AuthContext); // Access user and token from context

  // ✅ Use token from context or fallback to cookie
  const authToken = token || Cookies.get("token");

  // --- Navigation Active State ---
  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-green-900 font-medium"
      : "hover:bg-green-800";

  // --- Form State ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [locationField, setLocationField] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");

  const [postalCode, setPostalCode] = useState("");
  const [features, setFeatures] = useState([]);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- File Upload Handlers ---
  const handleDrop = (e) => {
    e.preventDefault();
    setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "realtyfinder_unsigned"); // set this in Cloudinary settings

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dbnpqbc6e/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // <-- This is the valid image URL
  };

  // --- Feature Toggle ---
  const toggleFeature = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (files.length === 0) {
        alert("Please upload at least one image.");
        setIsSubmitting(false);
        return;
      }

      // Upload all images to Cloudinary
      const uploadedUrls = await Promise.all(
        files.map((file) => handleImageUpload(file))
      );

      const newProperty = {
        title,
        description,
        price: Number(price),
        location: locationField,
        state,
        postalCode,
        images: uploadedUrls,
        features,
        type,
      };

      const response = await fetch(
        "https://realtyfinder.onrender.com/api/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(newProperty),
        }
      );

      if (response.ok) {
        alert(
          "✅ Your listing has been submitted and is pending admin approval."
        );
        // Reset form
        setTitle("");
        setDescription("");
        setPrice("");
        setLocationField("");
        setState("");
        setType("");
        setPostalCode("");
        setFiles([]);
        setFeatures([]);
      } else {
        const error = await response.json();
        alert(
          "❌ Failed to submit listing: " + (error.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* Sidebar */}
       {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`z-30 fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0 lg:static lg:w-72 w-64 bg-green-900 text-white flex flex-col`}
      >
        <div className="px-6 py-6 border-b border-green-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold">
              RF
            </div>
            <div className="text-lg font-bold">RealtyFinder</div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-1 flex-1">
          <button
            onClick={() => navigate("/owners-dashboard")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive(
              "/owners-dashboard"
            )}`}
          >
            <Clock size={18} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => navigate("/owners-listings")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive(
              "/owners-listings"
            )}`}
          >
            <Bell size={18} />
            <span>My listings</span>
          </button>

          <button
            onClick={() => navigate("/owners-saved-property")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive(
              "/owners-saved-property"
            )}`}
          >
            <Heart size={18} />
            <span>My saved property</span>
          </button>

          <button
            onClick={() => navigate("/owners-documents")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive(
              "/owners-documents"
            )}`}
          >
            <FileText size={18} />
            <span>My documents</span>
          </button>

          <button
            onClick={() => navigate("/owners-agreement")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left ${isActive(
              "/owners-agreement"
            )}`}
          >
            <FileText size={18} />
            <span>New tenancy agreement</span>
          </button>

          <button
            onClick={() => navigate("/owners-settings")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-r-lg text-left border-t border-green-800 mt-4 ${isActive(
              "/owners-settings"
            )}`}
          >
            <Settings size={18} />
            <span>Account settings</span>
          </button>
        </nav>

        <div className="p-6 border-t border-green-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
              {user?.firstName?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-medium">{user?.firstName || "User"}</p>
              <p className="text-xs text-green-200">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 flex items-center gap-2 text-sm text-red-300 hover:text-red-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-[60px]">
        <div>
          <h1 className="text-3xl font-bold">List Property</h1>
          <p className="mt-4">
            Showcase your property to thousands of buyers and renters. List
            today and get noticed fast.
          </p>
          <button
            onClick={() => navigate("/owners-property-list")}
            className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800"
          >
            View Listed Property
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mt-[32px] bg-white p-6 rounded-lg shadow"
        >
          {/* Basic Information */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Property Title*
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Property Type
              </label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Location Details */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Location Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={locationField}
                onChange={(e) => setLocationField(e.target.value)}
                className="border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Property Gallery */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Property Gallery
          </h2>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("fileInput").click()}
            className="border-2 border-dashed border-gray-400 rounded-lg p-12 text-center text-gray-500 cursor-pointer hover:bg-gray-50"
          >
            <p>Drop files here to upload or click to browse</p>
            <input
              id="fileInput"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Preview selected files */}
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="border rounded p-2 text-sm text-gray-700 flex flex-col items-center"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded mb-2">
                      <span className="text-xs text-gray-500">File</span>
                    </div>
                  )}
                  <p className="truncate w-full text-center">{file.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Detailed Information
          </h2>
          <div className="flex flex-col mt-4">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          {/* Features */}
          <h2 className="bg-gray-100 px-4 py-2 font-semibold mt-6">
            Features (optional)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
            {[
              "Free parking",
              "Air condition",
              "Laundry room",
              "Swimming pool",
              "Lobby/sit out",
              "Window covering",
              "Alarm",
              "Bar",
            ].map((feature, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={features.includes(feature)}
                  onChange={() => toggleFeature(feature)}
                  className="h-4 w-4"
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-900 text-white px-8 py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
