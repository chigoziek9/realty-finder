import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const faqs = [
  {
    question: "What makes RealtyFinder different from other real estate agencies?",
    answer:
      "At RealtyFinder, we are committed to promoting sustainability in the real estate industry. We prioritize practices such as green building techniques and energy-efficient systems in all of our transactions. We believe that promoting environmental responsibility is not only the right thing to do, but it also benefits our clients by providing long-term cost savings and a healthier living environment.",
  },
  {
    question: "Do you only work with RealtyFinder properties?",
    answer:
      "While we specialize in promoting and selling RealtyFinder properties, we work with all types of properties. Our focus is on promoting sustainable practices and educating our clients on how they can make their properties more eco-friendly.",
  },
  {
    question: "Can you help me find a RealtyFinder property?",
    answer:
      "Absolutely! We have a database of RealtyFinder properties and can work with you to find a property that aligns with your sustainability goals. Additionally, we can provide guidance on how to make any property more eco-friendly.",
  },
  {
    question: "What is your process for ensuring a property is RealtyFinder?",
    answer:
      "We work with builders and contractors who specialize in RealtyFinder building practices. We also conduct assessments of a property's energy and water usage, as well as its overall sustainability features, to ensure that it aligns with our RealtyFinder standards.",
  },
  {
    question: "Are RealtyFinder properties more expensive?",
    answer:
      "Not necessarily. While some RealtyFinder features may require an initial investment, such as solar panels or energy-efficient systems, they can ultimately lead to long-term cost savings on utility bills. Additionally, there are often government incentives and tax breaks available for RealtyFinder properties and features.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full flex justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <h4 className="uppercase text-sm font-medium text-gray-500 tracking-wider">
            Frequently Asked Questions
          </h4>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-snug">
            Common questions asked about our RealtyFinder homes.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Here are some important questions that are frequently asked and the
            answers to the questions.
          </p>
          <button className="px-6 py-3 rounded-full border border-black bg-white text-black text-sm font-medium hover:bg-black hover:text-white transition w-fit">
            Contact Us
          </button>
        </div>

        {/* RIGHT SIDE - FAQ LIST */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b pb-6 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <span className="text-black text-xl">
                  {openIndex === index ? <FiX /> : <FiPlus />}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-600 mt-3 text-base leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
