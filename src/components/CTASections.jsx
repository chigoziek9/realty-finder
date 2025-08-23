import React from "react";

export default function CTASection() {
  return (
    <section className="py-16 px-4  w-full text-center">
      <div className="bg-gray-100 rounded-[20px] h-[400px] w-full flex flex-col justify-center">
        <div className="bg-white rounded-[20px] shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-[28px] font-bold mb-4">
            Ready to find your RealtyFinder <br />
            home?
          </h2>
          <p className="text-gray-600 mb-6 text-[16px]">
            We have homes in 20+ cities across the country to choose from!
          </p>
          <button className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition text-[14px]">
            Browse Homes →
          </button>
        </div>
      </div>
    </section>
  );
}
