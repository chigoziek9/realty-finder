import React from "react";
import { MapPin } from "lucide-react"; // using lucide-react for the icon

const locations = [
  {
    id: 1,
    name: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Abuja, Nigeria",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Port Harcourt, Nigeria",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Enugu, Nigeria",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Ibadan, Nigeria",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Benin City, Nigeria",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&h=400&fit=crop",
  },
];

export default function Locations() {
  return (
    <section className="w-full flex justify-center px-4 py-8">
      <div className="max-w-6xl w-full">
        {/* Pill-shaped label */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 border border-gray-400 text-gray-800 px-4 py-2 rounded-full shadow-sm">
            <MapPin size={18} className="text-gray-600" />
            <span className="font-medium">Popular Cities</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-4">
          Prime Locations. Exceptional Living
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Explore top cities with best homes in prime locations.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="rounded-xl overflow-hidden shadow-lg bg-white"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-[#28563a] text-white">
                <h3 className="text-lg font-semibold">{loc.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
