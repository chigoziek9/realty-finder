import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        // ✅ Find the property with matching id
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
    <div className="m-4 md:m-10 bg-gray-200 shadow rounded flex flex-col lg:flex-row p-4 md:p-6 gap-6">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img
          src={property.image}  
          alt={property.title}
          className="w-full max-w-md h-64 object-cover rounded"
        />
      </div>

      {/* Info Section */}
      <div className="w-full lg:w-1/2 px-2 md:px-6 pb-4 md:pb-6">
        <h1 className="text-2xl md:text-4xl font-bold mt-4">{property.title}</h1>
        <p className="text-green-600 text-xl md:text-2xl mt-2">{property.price}</p>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          🛏 {property.beds} beds • 🛁 {property.baths} baths • 📐 {property.sqft} sqft
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Listed {property.listed} • {property.source}
        </p>

        <h3 className="text-xl md:text-2xl font-bold mt-4">Description</h3>
        <p className="mt-1 text-sm md:text-base">{property.description}</p>
      </div>
    </div>
  );
}
