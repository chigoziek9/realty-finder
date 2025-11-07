import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contactform({ agentEmail, agentName, propertyTitle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      title: propertyTitle,
      to_email: agentEmail, // 🔥 dynamically passed to the template
      to_name: agentName || "Agent",
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          console.error("FAILED...", err);
          setStatus("error");
        }
      );
  };

  return (
    <div className="mt-10 px-8">
      <h1 className="text-2xl font-bold mb-4">Contact Agent</h1>

      <form onSubmit={sendEmail} className="flex flex-col gap-4 max-w-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border p-3 rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="border p-3 rounded-md"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="border p-3 rounded-md h-32"
          required
        />
        <button
          type="submit"
          className="bg-[#27513d] text-white py-3 rounded-md"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-600 font-semibold mt-2">
            Message sent successfully to {agentName || "the agent"}!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-semibold mt-2">
            Failed to send message. Try again later.
          </p>
        )}
      </form>
    </div>
  );
}
