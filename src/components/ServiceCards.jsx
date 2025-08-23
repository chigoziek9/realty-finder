import React from "react";

export default function ServiceCards() {
  const cards = [
    {
      id: "01",
      title: "Buy a Home",
      text: "One of the most significant benefits of owning a RealtyFinder home is lower energy costs. Our homes are designed to use less energy with our solar powered system, saving money on bills.",
      button: "Search Homes",
    },
    {
      id: "02",
      title: "Sell a Home",
      text: "Our homes also have a smaller carbon footprint. They constantly use renewable energy sources and produce less waste which means they have a lower impact on the environment.",
      button: "See your Options",
    },
    {
      id: "03",
      title: "Rent a Home",
      text: "Our hybrid ventilation strategy includes both natural and mechanical ventilation, while our airtight wooden structure reduces risk of mold development, ensuring a healthy home.",
      button: "Find Rentals",
    },
  ];

  return (
    <div className="w-full bg-[#fafafa]">
      {/* Header Section */}
      <section className="w-full flex justify-center px-4 py-8 mt-20 bg-[#fafafa]">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            See how RealtyFinder can help
          </h1>
          <p className="text-gray-600 text-2xl mt-2">
            High-quality homes with low-carbon impact.
          </p>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="w-full flex justify-center px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group border border-gray-200 bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-lg transition hover:bg-[#28563a]"
            >
              {/* Number aligned right */}
              <div className="w-full flex justify-end mb-4 mt-3">
                <span className="text-7xl text-black group-hover:text-white transition">
                  {card.id}
                </span>
              </div>

              {/* Title + Text */}
              <h2 className="text-3xl font-semibold text-black mb-6 mt-6 group-hover:text-white transition">
                {card.title}
              </h2>
              <p className="text-gray-700 flex-1 leading-relaxed mb-10 group-hover:text-white transition">
                {card.text}
              </p>

              {/* Rounded Pill Button */}
              <button className="border border-black text-black py-2 px-6 rounded-full group-hover:bg-black group-hover:border-white group-hover:text-white transition">
                {card.button}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
