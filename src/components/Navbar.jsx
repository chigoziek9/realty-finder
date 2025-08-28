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
    <header className="bg-white shadow-sm px-6 md:px-10 py-4 flex items-center relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" >
          <img src={logo} alt="Logo" className="h-8" />
        </Link>
      </div>

      {/* Desktop Nav + Auth (all to the right) */}
      <div className="hidden md:flex items-center gap-8 ml-auto">
        <nav>
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

            {/* Agents */}
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

            {/* Feed */}
            <li>
              <Link to="/feed" className="hover:text-green-800">
                Feed
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Button */}
        <Link
          to="/signin"
          className="px-5 py-2 bg-green-900 text-white rounded-xl hover:bg-green-800"
        >
          Login / Sign-Up
        </Link>
      </div>

      {/* Mobile Menu Button (unchanged) */}
      <button
        className="md:hidden p-2 rounded focus:outline-none ml-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </header>
  );
}
