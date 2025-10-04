import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import footerlogo from "../assets/footerlogo.png"

export default function Footer() {
  return (
    <footer className="bg-[#28563a] py-12 px-6">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-4 gap-10 text-white">
        
        {/* Logo & Socials */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <img
              src={footerlogo}
              alt="RealtyFinder Logo"
            
            />
            
          </div>

          <div className="flex space-x-3 mb-6">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#28563a] transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#28563a] transition">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#28563a] transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#28563a] transition">
              <FaInstagram size={18} />
            </a>
          </div>

          {/* Contact Button */}
          <Link 
            to="/contact" 
            className="px-6 py-2 bg-white text-[#28563a] rounded-full text-sm font-medium hover:bg-white/90 transition"
          >
            Contact us
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Navigation</h4>
          <ul className="space-y-2 text-white text-sm">
            <li><Link to="/buy">Buy</Link></li>
            <li><Link to="/rent">Rent</Link></li>
            <li><Link to="/agents">Real estate agent</Link></li>
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/faq">FAQ’s</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Resources</h4>
          <ul className="space-y-2 text-white text-sm">
            <li><Link to="/agents">Agent</Link></li>
            <li>
              <Link to="/propertydetail" className="hover:underline">
                Property Detail
              </Link>
            </li>
            <li><Link to="/add-property">Add property</Link></li>
            <li><Link to="/testimonials">Testimonial</Link></li>
            <li><Link to="/clients">Our clients</Link></li>
            {/* ✅ New Property Request Alert link */}
            <li>
              <Link to="/property-request-alert" className="hover:underline">
                Property Request Alert
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Support</h4>
          <ul className="space-y-2 text-white text-sm">
            <li><Link to="/contact">Contact us</Link></li>
            <li>
              <Link to="/login">Login</Link> / <Link to="/signup">Sign up</Link>
            </li>
            {/* ✅ Added under Support as well */}
            <li>
              <Link to="/property-request-alert" className="hover:underline">
                Property Request Alert
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white/70 text-sm mt-12 border-t border-white/20 pt-6">
        Copyright © 2025 RealtyFinder. All Rights Reserved.{" "}
        <Link to="/terms" className="underline hover:text-white">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
}
