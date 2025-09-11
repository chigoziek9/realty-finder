import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "I am interested in Seaside Verinity Villa.",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add API call here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-8 bg-white rounded-lg"
    >
      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-md p-3 bg-gray-50"
        />
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-md p-3 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-3 bg-gray-50"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Message</label>
        <textarea
          name="message"
          rows="3"
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded-md p-3 bg-gray-50"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-green-800 text-white py-3 rounded-md font-semibold hover:bg-green-900 transition"
      >
        Contact agent
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 mt-3">
        By clicking "Contact Agent," you consent to receive calls and/or texts
        from the real estate professional listed above regarding your property
        search. These communications may use automated systems and pre-recorded
        or artificial voice messages. Your consent is not a condition for
        purchasing any property, product, or service. Standard message and data
        rates may apply. You also agree to our{" "}
        <a href="#" className="underline">
          Terms of Use
        </a>
        . Please note: RealtyFinder does not endorse any specific real estate
        professionals. We may share details about your recent and future
        activity on our site with your selected agent to help them better
        understand your home preferences.
      </p>
    </form>
  );
}
