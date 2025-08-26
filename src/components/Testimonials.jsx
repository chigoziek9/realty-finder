// Testimonials.jsx
import React from "react";
import { FaStar, FaUser, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Felix Jimoh",
    rating: 4.9,
    text: "I had a wonderful experience working with RealtyFinder to find my new home. They really took the time to understand what was important to me and helped me find a home that was not only beautiful but also eco-friendly and energy-efficient.",
  },
  {
    name: "David T.",
    rating: 4.5,
    text: "RealtyFinder is an amazing real estate agency that truly understands the importance of sustainability and eco-friendliness. They helped me find a beautiful home that was not only environmentally conscious.",
  },
  {
    name: "Kimbella Hassan",
    rating: 4.5,
    text: "I recently sold my home with RealtyFinder, and couldn’t be happier with the experience. The team was knowledgeable, professional, and really took the time to understand what was important to me.",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full flex flex-col items-center px-4 py-12 bg-white">
      <h2 className="text-2xl md:text-5xl font-bold text-center mt-6 mb-2">
        What our customers say?
      </h2>
      <p className="text-gray-600 text-center text-2xl mb-10">
        Hear from our satisfied customers and clients.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative bg-white border rounded-xl shadow-sm p-6 flex flex-col"
          >
            {/* Quote icon */}
            <div className="absolute -top-6 left-6 bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center shadow">
              <FaQuoteLeft className="text-gray-600" />
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg">{t.name}</h3>

              {/* Rating */}
              <div className="flex items-center text-sm text-gray-600">
                {t.rating}
                <span className="ml-2 flex">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`${
                        idx < Math.floor(t.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </span>
              </div>

              <p className="mt-3 text-gray-700 leading-relaxed">{t.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons (non-functional for now) */}
      <div className="flex gap-4 mt-10">
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow hover:bg-gray-200">
          <span className="text-xl">‹</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow hover:bg-gray-200">
          <span className="text-xl">›</span>
        </button>
      </div>
    </section>
  );
}
