import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Realty Finder Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-green-900">RealtyFinder</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-green-800">
            Home
          </Link>
          <Link to="/newtomarket" className="hover:text-green-800">
            New to Market
          </Link>
          <Link to="/popular" className="hover:text-green-800">
            Popular
          </Link>
          <Link to="/contact" className="hover:text-green-800">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/signin"
            className="px-5 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 bg-green-900 text-white rounded-full hover:bg-green-800"
          >
            Create an account
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-green-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/newtomarket" onClick={() => setIsOpen(false)}>
            New to Market
          </Link>
          <Link to="/popular" onClick={() => setIsOpen(false)}>
            Popular
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          <Link
            to="/signin"
            className="w-full px-5 py-2 bg-green-900 text-white rounded-full hover:bg-green-800 text-center"
            onClick={() => setIsOpen(false)}
          >
            Login / Sign-Up
          </Link>
        </div>
      )}
    </header>
  );
}
