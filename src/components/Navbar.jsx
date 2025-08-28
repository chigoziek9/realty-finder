import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png"; // replace with your logo

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (menu) => {
    setMenuOpen(menuOpen === menu ? null : menu);
  };

  return (
    <header className="bg-white shadow-sm px-6 md:px-10 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="font-bold text-lg">RealtyFinder</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 text-sm font-medium text-black">
          {/* Buy Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleMenu("buy")}
              className="flex items-center hover:text-green-800"
            >
              Buy <ChevronDown size={14} className="ml-1" />
            </button>
            {menuOpen === "buy" && (
              <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-40 z-50">
                <Link
                  to="/buy/houses"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Houses
                </Link>
                <Link
                  to="/buy/apartments"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Apartments
                </Link>
              </div>
            )}
          </li>

          {/* Rent Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleMenu("rent")}
              className="flex items-center hover:text-green-800"
            >
              Rent <ChevronDown size={14} className="ml-1" />
            </button>
            {menuOpen === "rent" && (
              <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-40 z-50">
                <Link
                  to="/rent/short-let"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Short Let
                </Link>
                <Link
                  to="/rent/long-term"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Long Term
                </Link>
              </div>
            )}
          </li>

          {/* Real estate agents Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleMenu("agents")}
              className="flex items-center hover:text-green-800"
            >
              Real estate agents <ChevronDown size={14} className="ml-1" />
            </button>
            {menuOpen === "agents" && (
              <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-48 z-50">
                <Link
                  to="/agents/lagos"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Lagos
                </Link>
                <Link
                  to="/agents/abuja"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Abuja
                </Link>
              </div>
            )}
          </li>

          {/* Feed link */}
          <li>
            <Link to="/feed" className="hover:text-green-800">
              Feed
            </Link>
          </li>
        </ul>
      </nav>

      {/* Desktop Auth */}
      <div className="hidden md:flex gap-4">
       
        <Link
          to="/signin"
          className="px-5 py-2 bg-green-900 text-white rounded-xl hover:bg-green-800"
        >
          Login / Sign-Up
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button inside drawer */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 text-lg font-medium px-6">
          <li>
            <Link
              to="/buy"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-700"
            >
              Buy
            </Link>
          </li>
          <li>
            <Link
              to="/rent"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-700"
            >
              Rent
            </Link>
          </li>
          <li>
            <Link
              to="/agents"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-700"
            >
              Real estate agents
            </Link>
          </li>
          <li>
            <Link
              to="/feed"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-700"
            >
              Feed
            </Link>
          </li>
        </ul>

        {/* Auth buttons */}
        <div className="flex flex-col gap-3 mt-8 px-6">
         
          <Link
            to="/signin"
            className="w-full px-5 py-2 bg-green-900 text-white rounded-full hover:bg-green-800 text-center"
            onClick={() => setIsOpen(false)}
          >
           Login / Sign-Up
          </Link>
        </div>
      </div>
    </header>
  );
}
