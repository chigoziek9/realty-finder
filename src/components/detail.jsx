import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import PropertyNav from "./PropertyNav.jsx";
import Contactform from "./Contactagentform.jsx";
import PropertyGallery from "./PropertyGallery";
import { AuthContext } from "../AuthContext";
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

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const res = await fetch(
          `https://realtyfinder.onrender.com/api/properties/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const result = await res.json();

        if (result.success && result.data) {
          setProperty(result.data);
        } else {
          setError("Property not found or invalid response format.");
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPropertyDetails();
    else {
      setError("You must be logged in to view this property.");
      setLoading(false);
    }

    window.scrollTo(0, 0);
  }, [id, token]);

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

  return (
    <>
      <PropertyNav />

      {/* ========== GALLERY ========== */}
      <div className="px-8">
        <h1 className="mt-6 font-bold text-3xl">{property.title}</h1>
        <PropertyGallery
          images={
            Array.isArray(property.images) && property.images.length > 0
              ? property.images
              : ["https://via.placeholder.com/600x400?text=No+Image"]
          }
        />
      </div>

      {/* ========== PROPERTY SUMMARY ========== */}
      <div className="p-10 flex flex-col lg:flex-row justify-between">
        <div className="lg:w-2/3">
          <p>{property.address}</p>
          <div className="flex flex-wrap justify-between text-2xl sm:text-3xl font-semibold mt-3">
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

          <div className="flex mt-6 items-center gap-2">
            <p className="text-[#0d542a] font-bold cursor-pointer">Show More</p>
            <img src={arrow} alt="expand" className="h-4" />
          </div>

          {/* FEATURES SECTION */}
          <div className="flex gap-20 mt-8 flex-wrap">
            <div>
              <div className="flex gap-5">
                <img src={hours} alt="" className="h-8" />
                <p>
                  21 hours <br /> On RealtyFinder
                </p>
              </div>
              <div className="flex mt-6 gap-5">
                <img src={year} alt="" className="h-8" />
                <p>
                  1991 <br /> Year Built
                </p>
              </div>
              <div className="flex mt-6 gap-5">
                <img src={hqa} alt="" className="h-8" />
                <p>
                  ₦479/mo
                  <br /> HOA Dues
                </p>
              </div>
              <div className="flex mt-6 gap-5">
                <img src={commision} alt="" className="h-8" />
                <p>
                  2.5% commission
                  <br /> Buyer's Agent
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-5">
                <img src={propertyicon} alt="" className="h-8" />
                <p>
                  {property.type || "Condo"} <br /> Property Type
                </p>
              </div>
              <div className="flex mt-6 gap-5">
                <img src={measure} alt="" className="h-8" />
                <p>
                  ₦382
                  <br /> Price/Sq.Ft.
                </p>
              </div>
              <div className="flex mt-6 gap-5">
                <img src={parking} alt="" className="h-8" />
                <p>
                  {property.parking || "1 car garage"}
                  <br /> Parking
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== ACTIONS PANEL ========== */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="p-6 border border-[#dadada] rounded-lg w-full">
            <div className="flex flex-col gap-4">
              <button className="text-sm text-white bg-[#27513d] w-full px-6 py-5 rounded-lg">
                Request Showing
              </button>
              <p className="text-gray-500">Tour for free, no strings attached</p>
              <button className="text-sm text-white bg-[#27513d] w-full px-6 py-5 rounded-lg">
                Start an offer
              </button>
              <p className="text-gray-500">
                Make a winning offer with the help of a local agent
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== LISTING INFO ========== */}
      <div className="px-10">
        <h1 className="text-xl font-bold">Listed by RealtyFinder</h1>
        <div className="max-w-200 h-40 border rounded-2xl mt-4 flex gap-4 p-4">
          <img src={poster} alt="Agent" />
          <p className="mt-8 text-2xl font-bold text-[#27513d]">
            {property.createdBy?.name || "Josephine Pauland"} <br />
            <span className="text-black text-xl font-light">
              RealtyFinder Corporation
            </span>
          </p>
        </div>
      </div>

      {/* ========== TOUR SECTION ========== */}
      <div className="p-10">
        <h1 className="text-4xl font-extrabold">See This Home In Person</h1>
        <div className="flex mt-7 gap-8">
          <img src={seehome} alt="" />
          <p>
            We'll connect you with a local agent to show you this home, answer
            your questions, and assist you on your buying journey.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-6">
          <p className="text-lg">
            Next available tour time:{" "}
            <span className="font-bold text-[#28563a]">Today at 2:00 PM</span>
          </p>
          <button className="text-sm text-white bg-[#27513d] px-12 py-5 rounded-lg mt-4 lg:mt-0">
            Check tour times
          </button>
        </div>
      </div>

      <hr className="border-t border-gray-400 my-1" />

      {/* ========== CONTACT AGENT FORM ========== */}
      <Contactform />

      {/* ========== MAP SECTION ========== */}
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

      <div className="p-8 mt-6">
        <h1 className="font-bold text-5xl">Climate Risks</h1>
        <p className="mt-3 text-2xl font-light">
          Risk data is not available for this property.
        </p>
      </div>

      <hr className="border-t border-gray-400" />
    </>
  );
}
