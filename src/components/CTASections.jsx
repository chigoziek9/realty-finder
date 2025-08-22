import React from "react";

export default function CTASection() {
  return (
    <section className="py-16 px-4 max-w-[1200px] mx-auto text-center">
      <div className="bg-gray-100 rounded-[20px] p-12 w-full h-[250px] flex flex-col justify-center">
        <h2 className="text-[28px] font-bold mb-4">
          Ready to find your RealtyFinder home?
        </h2>
        <p className="text-gray-600 mb-6 text-[16px]">
          We have homes in 20+ cities across the country to choose from!
        </p>
        <button className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition text-[14px]">
          Browse Homes →
        </button>
      </div>
    </section>
  );
}
