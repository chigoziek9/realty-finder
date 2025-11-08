import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import PropertyNav from "./PropertyNav.jsx";
import Contactform from "./Contactagentform.jsx";
import PropertyGallery from "./PropertyGallery.jsx";
import { AuthContext } from "../AuthContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FiChevronDown } from "react-icons/fi";

export default function PropertyDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // ===== Fetch Property Details =====
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `https://realtyfinder.onrender.com/api/properties/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const result = await res.json();

        if (result.success && result.data) {
          setProperty(result.data);
        } else {
          setError("Property not found or invalid data format.");
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
    window.scrollTo(0, 0);
  }, [id, token]);

  // ===== Loading and Error States =====
  if (loading)
    return <p className="text-center mt-10 text-lg md:text-xl">Loading property...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-lg md:text-xl font-semibold">
        {error}
      </p>
    );

  if (!property)
    return <p className="text-center mt-10 text-lg md:text-xl">No property found.</p>;

  // ===== Page Layout =====
  return (
    <>
      <PropertyNav />

      {/* GALLERY */}
      <div className="px-4 sm:px-6 md:px-8 w-full">
        <h1 className="mt-6 font-bold text-2xl sm:text-3xl md:text-4xl">{property.title}</h1>

        {Array.isArray(property.images) && property.images.length > 0 ? (
          <Carousel className="w-full mt-4 sm:mt-6 relative">
            <CarouselContent>
              {property.images.map((imgUrl, index) => (
                <CarouselItem key={index} className="w-full">
                  <img
                    src={imgUrl}
                    alt={`${property.title} image ${index + 1}`}
                    className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-none"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4 bg-black/40 text-white hover:bg-black/60" />
            <CarouselNext className="right-2 sm:right-4 bg-black/40 text-white hover:bg-black/60" />
          </Carousel>
        ) : (
          <img
            src="https://placehold.co/1200x600?text=No+Image"
            alt="No image available"
            className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover rounded-none mt-4 sm:mt-6"
          />
        )}
      </div>

      {/* PROPERTY SUMMARY */}
      <div className="p-4 sm:p-6 md:p-10 flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Section */}
        <div className="lg:w-2/3 w-full">
          <p className="text-gray-600 text-base md:text-lg">{property.address}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-lg sm:text-2xl font-semibold mt-4">
            <p>
              ₦{property.price?.toLocaleString()} <br />
              <span className="text-sm sm:text-base font-light">Price</span>
            </p>
            <p>
              {property.bedrooms || 0} <br />
              <span className="text-sm sm:text-base font-light">Beds</span>
            </p>
            <p>
              {property.bathrooms || 0} <br />
              <span className="text-sm sm:text-base font-light">Baths</span>
            </p>
            <p>
              {property.area || "N/A"} <br />
              <span className="text-sm sm:text-base font-light">Sqft</span>
            </p>
          </div>

          <h1 className="text-2xl sm:text-3xl mt-5 font-bold">About this home</h1>
          <p className="mt-2 text-base sm:text-lg leading-relaxed">
            {showFullDescription
              ? property.description
              : property.description?.length > 200
              ? property.description.slice(0, 200) + "..."
              : property.description || "No description available."}
          </p>

          {property.description?.length > 200 && (
            <div
              className="flex mt-4 sm:mt-6 gap-2 items-center cursor-pointer select-none"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              <p className="text-[#0d542a] font-bold text-lg sm:text-xl">
                {showFullDescription ? "Show Less" : "Show More"}
              </p>
              <FiChevronDown
                size={24}
                className={`transition-transform duration-300 ${
                  showFullDescription ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          )}
        </div>

        {/* ACTIONS PANEL */}
        <div className="lg:w-1/3 w-full">
          <div className="p-4 sm:p-6 border border-[#dadada] rounded-lg w-full">
            <button className="text-sm sm:text-base text-white bg-[#27513d] w-full px-6 py-4 sm:py-5 rounded-lg">
              Request Showing
            </button>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Tour for free, no strings attached
            </p>
            <button className="text-sm sm:text-base text-white bg-[#27513d] w-full px-6 py-4 sm:py-5 rounded-lg mt-3">
              Start an offer
            </button>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Make a winning offer with the help of a local agent
            </p>
          </div>
        </div>
      </div>

      {/* LISTED BY */}
      <div className="px-4 sm:px-6 md:px-10 mt-10">
        <h1 className="text-lg sm:text-xl font-bold">Listed by RealtyFinder</h1>
        <div className="w-full border rounded-2xl mt-4 flex flex-col sm:flex-row gap-4 p-4 items-center">
          <img
            src={
              property.user?.profilePhoto ||
              "https://placehold.co/100x100?text=No+Image"
            }
            alt={`${property.user?.firstName || "Agent"} ${
              property.user?.lastName || ""
            }`}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border border-gray-300"
          />
          <div className="text-center sm:text-left">
            <p className="text-xl sm:text-2xl font-bold text-[#27513d]">
              {property.user
                ? `${property.user.firstName || ""} ${
                    property.user.lastName || ""
                  }`.trim()
                : "Unknown Agent"}
            </p>
            <span className="text-gray-700 text-base sm:text-lg font-light">
              {property.user?.companyName || "RealtyFinder Corporation"}
            </span>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="mt-10 px-4 sm:px-6 md:px-10">
        <Contactform
          agentEmail={property.user?.email}
          agentName={`${property.user?.firstName || ""} ${
            property.user?.lastName || ""
          }`.trim()}
          propertyTitle={property.title}
        />
      </div>

      {/* MAP SECTION */}
      <div className="px-4 sm:px-6 md:px-10 mt-10">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Around This Home
        </h1>
        <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              property.address
            )}&output=embed`}
          ></iframe>
        </div>
      </div>

      {/* CLIMATE RISK */}
      <div className="p-4 sm:p-6 md:p-8 mt-8">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">Climate risks</h1>
        <p className="mt-3 text-lg sm:text-xl font-light">
          Risk data is not available for this property.
        </p>
      </div>

      <hr className="border-t border-gray-300 my-6" />

      {/* PROPERTY DETAILS */}
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
          Property details
        </h1>
      </div>

      {/* Interior Section */}
      <div className="max-w-5xl mx-auto bg-[#f7f7f5] p-4 sm:p-6 md:p-8 rounded-lg">
        <p className="font-bold text-2xl sm:text-3xl mb-4">Interior</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h2 className="font-bold text-lg">Bedrooms & bathrooms</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Bedrooms: {property.rooms || "N/A"}</li>
              <li>Bathrooms: {property.bathrooms || "N/A"}</li>
              <li>Total Area: {property.area ? `${property.area} sqft` : "N/A"}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg">Features</h2>
            {Array.isArray(property.features) && property.features.length > 0 ? (
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                {property.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-600">No features listed.</p>
            )}
          </div>

          <div>
            <h2 className="font-bold text-lg">Property Type</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>{property.type || "N/A"}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg">Location</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>{property.address}</li>
              <li>
                {property.state}, {property.country}
              </li>
              <li>Postal Code: {property.postalCode || "N/A"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* TAX HISTORY */}
      <div className="mt-10 px-4 sm:px-6 md:px-10">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
          Public tax history
        </h1>
        <div className="mt-3 bg-[#f7f7f5] p-4 sm:p-6 rounded-lg">
          <p className="font-bold text-xl sm:text-2xl md:text-3xl">
            Tax history is unavailable
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-300 mt-8 mb-4" />
    </>
  );
}
