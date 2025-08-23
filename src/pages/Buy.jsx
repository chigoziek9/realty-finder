import { Link } from "react-router-dom";
import React from "react";
import buyImage from "../assets/buy-hero.png";
export default function Buy() {
  return (
    <>
      <section
        style={{ backgroundImage: `url(${buyImage})` }}
        className="bg-cover bg-center flex flex-col  relative px-4 h-110"
      >
        <div className="mt-32">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-snug m">
            Find Your Dream Property.
          </h1>
          <p className="text-white font-bold mb-8 text-base sm:text-lg">
            Looking for houses for sale nearby? Easily explore available listings in your area, complete with high-quality photos, pricing, and detailed<br/> property descriptions to help you make informed decisions.
          </p>
        </div>
      </section>
    </>
  );
}
