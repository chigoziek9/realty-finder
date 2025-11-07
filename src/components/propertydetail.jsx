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

import arrow from "../assets/downarrow.png";
import commision from "../assets/2comm.png";
import hours from "../assets/21.png";
import hqa from "../assets/479.png";
import year from "../assets/1991.png";
import propertyicon from "../assets/property.png";
import measure from "../assets/measure.png";
import parking from "../assets/parking.png";
import poster from "../assets/poster.png";
import seehome from "../assets/seehome.png";
import joshua from "../assets/joshua.png";

export default function PropertyDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <p className="text-center mt-10 text-xl">Loading property...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-xl font-semibold">
        {error}
      </p>
    );

  if (!property)
    return <p className="text-center mt-10 text-xl">No property found.</p>;

  // ===== Page Layout =====
  return (
    <>
      <PropertyNav />

      {/* GALLERY */}
      <div className="px-8 w-full">
        <h1 className="mt-6 font-bold text-3xl px-8">{property.title}</h1>

        {Array.isArray(property.images) && property.images.length > 0 ? (
          <Carousel className="w-full mt-6 relative">
            <CarouselContent>
              {property.images.map((imgUrl, index) => (
                <CarouselItem key={index} className="w-full">
                  <img
                    src={imgUrl}
                    alt={`${property.title} image ${index + 1}`}
                    className="w-full h-[500px] sm:h-[600px] object-cover rounded-none"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-black/40 text-white hover:bg-black/60" />
            <CarouselNext className="right-4 bg-black/40 text-white hover:bg-black/60" />
          </Carousel>
        ) : (
          <img
            src="https://placehold.co/1200x600?text=No+Image"
            alt="No image available"
            className="w-full h-[500px] sm:h-[600px] object-cover rounded-none mt-6"
          />
        )}
      </div>

      {/* PROPERTY SUMMARY */}
      <div className="p-10 flex flex-col lg:flex-row justify-between">
        <div className="lg:w-2/3">
          <p>{property.address}</p>
          <div className="flex justify-between text-2xl sm:text-3xl font-semibold mt-3">
            <p>
              ₦{property.price?.toLocaleString()} <br />
              <span className="text-xl font-light">Price</span>
            </p>
            <p>
              {property.bedrooms || 0} <br />
              <span className="text-xl font-light">Beds</span>
            </p>
            <p>
              {property.bathrooms || 0} <br />
              <span className="text-xl font-light">Baths</span>
            </p>
            <p>
              {property.area || "N/A"} <br />
              <span className="text-xl font-light">Sqft</span>
            </p>
          </div>

          <h1 className="text-3xl mt-3 font-bold">About this home</h1>
          <p className="mt-2">{property.description}</p>

          <div className="flex mt-6 gap-2 items-center">
            <p className="text-[#0d542a] font-bold cursor-pointer">Show More</p>
            <img src={arrow} alt="expand" />
          </div>

          {/* FEATURES SECTION (unchanged) */}
        </div>

        {/* ACTIONS PANEL */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="p-6 border border-[#dadada] rounded-lg w-full">
            <button className="text-sm text-white bg-[#27513d] w-full px-6 py-5 rounded-lg">
              Request Showing
            </button>
            <p className="mt-3 text-gray-600">
              Tour for free, no strings attached
            </p>
            <button className="text-sm text-white bg-[#27513d] w-full px-6 py-5 rounded-lg mt-3">
              Start an offer
            </button>
            <p className="mt-3 text-gray-600">
              Make a winning offer with the help of a local agent
            </p>
          </div>
        </div>
      </div>

      {/* LISTED BY */}
      <div className="px-10 mt-10">
        <h1 className="text-xl font-bold">Listed by RealtyFinder</h1>
        <div className="max-w-200 h-40 border rounded-2xl mt-4 flex gap-4 p-4 items-center">
          <img
            src={
              property.user?.profilePhoto ||
              "https://placehold.co/100x100?text=No+Image"
            }
            alt={`${property.user?.firstName || "Agent"} ${
              property.user?.lastName || ""
            }`}
            className="w-24 h-24 object-cover rounded-full border border-gray-300"
          />
          <div>
            <p className="text-2xl font-bold text-[#27513d]">
              {property.user
                ? `${property.user.firstName || ""} ${
                    property.user.lastName || ""
                  }`.trim()
                : "Unknown Agent"}
            </p>
            <span className="text-black text-xl font-light">
              {property.user?.companyName || "RealtyFinder Corporation"}
            </span>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="mt-10">
        <Contactform
          agentEmail={property.user?.email}
          agentName={`${property.user?.firstName || ""} ${
            property.user?.lastName || ""
          }`.trim()}
          propertyTitle={property.title}
        />
      </div>

      {/* MAP */}
      <div className="px-8 mt-10">
        <h1 className="font-bold text-5xl mb-4">Around This Home</h1>
        <div className="w-full max-w-4xl h-[400px]">
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
    </>
  );
}
