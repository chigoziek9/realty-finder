import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTimes } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#28563a] py-12 px-6 border-t border-white">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-4 gap-10 text-white">
        
        {/* Logo & Socials */}
        <div>
          {/* Logo with white X sign */}
          <div className="flex items-center space-x-2 mb-6">
            <FaTimes className="text-2xl text-white" />
            <span className="text-2xl font-bold">RealtyFinder</span>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3 mb-6">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#28563a] transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#28563a] transition"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#28563a] transition"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#28563a] transition"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>

          {/* Contact Button */}
          <button className="px-6 py-2 border border-white rounded-full text-sm font-medium hover:bg-white hover:text-[#28563a] transition">
            Contact Us
          </button>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Navigation</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Buy</li>
            <li>Sell</li>
            <li>Rent</li>
            <li>Mortgage</li>
            <li>Manage Rental</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Resources</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Agent</li>
            <li>Properties Details</li>
            <li>Add property</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Support</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Contact us</li>
            <li>Login</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white/70 text-sm mt-12">
        Copyright © 2025. All rights reserved
      </div>
    </footer>
  );
}
