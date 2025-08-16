import { useEffect, useState } from "react";

export default function Property() {
  const [property, setProperty] = useState([]);

  useEffect(() => {
    const storedProperty = localStorage.getItem("exploreProperty");

    if (storedProperty) {
      setProperty(JSON.parse(storedProperty));
    } else {
      fetch("/properties.json") // 👈 fetch your local JSON file
        .then((res) => res.json())
        .then((data) => {
          setProperty(data); // our JSON is already an array
         
        });
    }
  }, []);

  if (property.length === 0) {
    return (
      <p className="flex justify-center items-center text-2xl sm:text-3xl md:text-4xl font-bold h-40">
        Loading...
      </p>
    );
  }

  return (
    <div className="flex justify-center flex-wrap gap-6 px-2 sm:px-4 pb-8">
      {property.map((house) => (
        <div
          key={house.id}
          className="w-72 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={house.image}
            alt={house.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{house.title}</h3>
            <p className="text-gray-600 text-sm">{house.description}</p>
            <p className="text-green-600 font-semibold mt-2">{house.price}</p>
            <p className="text-gray-500 text-xs mt-1">
              🛏 {house.beds} beds • 🛁 {house.baths} baths • 📐 {house.sqft} sqft
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Listed {house.listed} • {house.source}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
