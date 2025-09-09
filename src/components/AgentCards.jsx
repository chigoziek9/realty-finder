import React from "react";

export default function AgentCards() {
  const cards = [
    {
      id: "01",
      title: "Work with a local expert",
      text: "RealthyFinder’s  agents rank in the top 1% of agents working at any nationwide brokerages .",
  
    },
    {
      id: "02",
      title: "Save money in fees",
      text: "When you buy and sell with us,you’ll pay half the fee other brokerages often charge.",
  
    },
    {
      id: "03",
      title: "Reach more buyers",
      text: "RealtyFinder  is the #1 brokerage website, with five times more traffic than the next closet competitor.",
   
    },
  ];

  return (
    <div className="w-full bg-[#fafafa]">
      {/* Header Section */}
      <section className="w-full flex  px-4 py-8 mt-10 bg-[#fafafa]">
        <div className="max-w-4xl text-center">
          <h1 className="text-3xl  sm:text-4xl md:text-3xl font-bold text-gray-900">
            Why Chooose A <span className="text-[#026630]">RealtyFinder</span>
          </h1>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="w-full flex justify-center px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group border border-gray-200 bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-lg transition hover:bg-[#28563a]"
            >
              {/* Number aligned right */}
              <div className="w-full flex justify-end mb-3 sm:mb-4">
                <span className="text-5xl sm:text-6xl md:text-7xl text-black group-hover:text-white transition">
                  {card.id}
                </span>
              </div>

              {/* Title + Text */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-4 mt-4 group-hover:text-white transition">
                {card.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg flex-1 leading-relaxed mb-6 sm:mb-10 group-hover:text-white transition">
                {card.text}
              </p>

              {/* Rounded Pill Button */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
