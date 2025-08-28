import React from "react";
import ctaImage from "../assets/cta-img.png"; // Ensure you have an image at this path or update the path accordingly

export default function CTASection() {
  return (
    <section className="py-16 px-4 w-full text-center">
      <div
        style={{ backgroundImage: `url(${ctaImage})` }}
        className="bg-cover bg-center rounded-[20px] h-[200px] sm:h-[300px] md:h-[400px] w-full flex flex-col justify-center"
      >
        <div className="bg-white rounded-[20px] shadow-lg p-6 sm:p-8 max-w-lg sm:max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold mb-4 leading-snug">
            Ready to find your RealtyFinder <br className="hidden sm:block" />
            home?
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base md:text-[16px]">
            We have homes in 20+ cities across the country to choose from!
          </p>
          <button className="px-5 sm:px-6 py-2 sm:py-3 border bg-[#28563a] text-white rounded-full hover:bg-black transition text-sm sm:text-[14px]">
            Browse Homes →
          </button>
        </div>
      </div>
    </section>
  );
}
