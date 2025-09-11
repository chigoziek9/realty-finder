import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyNav from "./PropertyNav.jsx"; // make sure this matches the file name exactly
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
import Contactform from "./Contactagentform.jsx";
import PropertyGallery from "./PropertyGallery";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProperty = data.find((item) => String(item.id) === id);
        setProperty(foundProperty);
      })
      .catch((err) => console.error("Failed to load property", err));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return <p className="text-center mt-10 text-xl">Loading property...</p>;
  }

  return (
    <>
      <PropertyNav />
      {/* GALLERY SECTION */}
      <div className="px-8">
        <h1 className="mt-6 font-bold text-3xl"> {property.title}</h1>
         <PropertyGallery images={property.images} />
      </div>
      <div className="p-10 flex justify-between">
        <div>
          <p> {property.address}</p>
          <div className=" flex justify-between text-2xl sm:text-3xl font-semibold mt-3">
            <p>
              {property.price} <br />{" "}
              <span className="text-xl font-light">price</span>
            </p>
            <p>
              {property.beds} <br />{" "}
              <span className="text-xl font-light">beds</span>
            </p>
            <p>
              {property.baths} <br />{" "}
              <span className="text-xl font-light">baths</span>
            </p>
            <p>
              {property.sqft} <br />{" "}
              <span className="text-xl font-light">sqft</span>
            </p>
          </div>
          <h1 className="text-3xl mt-3 font-bold">About this home</h1>
          <p className="mt-2">{property.description}</p>
          <div className="flex mt-6">
            <p className="text-[#0d542a] font-bold">Show More</p>
            <img src={arrow} alt="" />
          </div>
          <div className="flex gap-20 mt-8">
            <div>
              <div className="flex gap-5  ">
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
                  N479/mo
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
              <div className="flex  gap-5">
                <img src={propertyicon} alt="" className="h-8" />
                <p>
                  Condo
                  <br /> Property Type
                </p>
              </div>
              <div className="flex mt-6 gap-5">
                <img src={measure} alt="" className="h-8" />
                <p>
                  N382
                  <br /> Price/Sq.Ft.
                </p>
              </div>
              <div className="flex mt-6 gap-5">
                <img src={parking} alt="" className="h-8" />
                <p>
                  1 car garage
                  <br /> Parking
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" p-6 border border-[#dadada] rounded-lg w-full  ">
            <div className="flex items-center justify-between mt-3">
              <button className="text-sm text-white bg-[#27513d] w-full px-6 py-5 rounded-lg">
                Request Showing
              </button>
            </div>
            <p className="mt-3">Tour for free , no strings attached</p>
            <div className="flex items-center justify-between mt-3">
              <button className="text-sm text-white bg-[#27513d] w-full px-6 py-5 rounded-lg">
                Start an offer
              </button>
            </div>
            <p className="mt-3">
              Make a winning offer with the help of a local agent
            </p>
          </div>
        </div>
      </div>
      <div className="px-10">
        <h1 className="text-xl font-bold">Listed by RealtyFinder</h1>
        <div className="max-w-200 h-40 border rounded-2xl mt-4 flex gap-4 p-4">
          <img src={poster} alt="" />
          <p className="mt-8 text-2xl font-bold text-[#27513d]">
            Josephine Pauland <br />
            <span className="text-black text-xl font-light">
              RealtyFinder Corporation
            </span>
          </p>
        </div>
      </div>
      <div className=" p-10">
        <h1 className="text-4xl font-extrabold">See This Home In Person</h1>
        <div className="flex mt-7 gap-8 ">
          <img src={seehome} alt="" />
          <p>
            We'll connect you with a local agent to show you this home, answer
            your <br /> questions, and assist you on your buying journey.
          </p>
        </div>
        <div className="flex gap-40">
          <p className="mt-4">
            Next availaible tour time:
            <span className="font-bold text-[#28563a]">Today at 2:00 PM</span>
          </p>
          <div className="flex px-24">
            <button className="text-sm text-white bg-[#27513d] w-full px-12 py-5 rounded-lg">
              Check tour times
            </button>
          </div>
        </div>
      </div>

      <hr class="border-t border-gray-400 my-1" />
      <div className="px-10 mt-8">
        <h1 className="font-bold text-2xl">Open houses</h1>
        <p className="font-light text-2xl mt-2">No upcoming open houses.</p>
      </div>
      <div className="flex mt-7 gap-4 px-10  ">
        <img src={joshua} alt="" className="h-18" />
        <p className="mt-6 font-bold text-xl">Charles Doe</p>
      </div>
      <Contactform />
      <div className="mt-1 px-8">
        <h1 className="font-bold text-5xl ">Around This Home</h1>
      </div>
      <div className="px-8 mt-10">
        <div className="w-full max-w-4xl  h-[400px]">
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
        <h1 className="font-bold text-5xl">Climate risks</h1>
        <p className="mt-3 text-2xl font-light">
          {" "}
          Risk data is not availaible for this property.
        </p>
      </div>
      <hr class="border-t border-gray-400 " />
      <div className="p-8 ">
        <h1 className="font-bold text-5xl">Property details</h1>
      </div>
      <div className="max-w-4xl px-8 bg-[#f7f7f5] ">
        <p className="p-3 font-bold text-3xl">Interior</p>
      </div>
      <div className="max-w-4xl px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Bedrooms & bathrooms */}

        <div className="px-4">
          <h2 className="font-bold text-lg">Bedrooms & bathrooms</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Bedrooms: 4</li>
            <li>Bathrooms: 3</li>
            <li>Full bathrooms: 2</li>
            <li>1/2 bathrooms: 1</li>
          </ul>
        </div>

        {/* Cooling */}
        <div>
          <h2 className="font-bold text-lg">Cooling</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Has cooling: Yes</li>
          </ul>
        </div>

        {/* Heating */}
        <div className="px-4">
          <h2 className="font-bold text-lg">Heating</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Has Heating (Unspecified Type)</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h2 className="font-bold text-lg">Features</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Basement: Yes</li>
            <li>Has fireplace: Yes</li>
          </ul>
        </div>

        {/* Interior area */}
        <div className="px-4">
          <h2 className="font-bold text-lg">Interior area</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Total structure area: 2,277</li>
            <li>Total interior livable area: 2,277 sqft</li>
          </ul>
        </div>
      </div>
      <div className="max-w-4xl px-8 bg-[#f7f7f5] ">
        <p className="p-3 font-bold text-3xl">Property</p>
      </div>
      <p className="mt-4 px-11 text-3xl">Parking</p>
      <div className="flex mt-12 gap-2 px-11">
        <img src={arrow} alt="" />
        <p className="text-[#0d542a] font-bold text-xl ">Show More</p>
      </div>
      <div className="mt-5 px-8">
        <h1 className=" font-bold text-5xl">Public tax history</h1>
        <p className="mt-4 text-2xl"> Tax history is unavailaible.</p>
      </div>
      <hr class="border-t border-gray-400 mt-6 " />
    </>
  );
}
