import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Bell } from "lucide-react";
import logo from "../assets/NavLogo.png";
import { AuthContext } from "../AuthContext";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const timeoutRef = useRef(null);

  const { user, logout } = useContext(AuthContext);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMenuOpen(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMenuOpen(null);
    }, 200);
  };

  return (
    <header className="bg-white shadow-sm px-6 md:px-10 py-4 flex items-center relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 ml-auto">
        <nav>
          <ul className="flex items-center gap-8 text-sm font-medium text-black">
            {/* Buy Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("buy")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center hover:text-green-800">
                Buy <ChevronDown size={14} className="ml-1" />
              </button>
              {menuOpen === "buy" && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-40 z-50 max-h-60 overflow-y-auto">
                  <Link
                    to="/buy/home"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Home For Sale
                  </Link>
                  <Link
                    to="/buy/land"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Land For Sale
                  </Link>
                  <Link
                    to="/buy/home"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Recently Sold
                  </Link>
                </div>
              )}
            </li>

            {/* Rent Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("rent")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center hover:text-green-800">
                Rent <ChevronDown size={14} className="ml-1" />
              </button>
              {menuOpen === "rent" && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-44 z-50 max-h-60 overflow-y-auto">
                  <Link
                    to="/buy/home"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Apartments For Rent
                  </Link>
                  <Link
                    to="/buy/home"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    House For Rent
                  </Link>
                  <Link
                    to="/buy/home"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Condos For Rent
                  </Link>
                  <Link
                    to="/buy/land"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Land For Rent
                  </Link>
                </div>
              )}
            </li>

            {/* Agents */}
            <li>
              <Link to="/agent" className="hover:text-green-800">
                Real estate agents
              </Link>
            </li>

            {/* Feed */}
            <li>
              <Link to="/feed" className="hover:text-green-800">
                Feed
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-6">
            {/* Notification bell */}
            <button className="relative text-black hover:text-green-800 transition">
              <Bell size={22} />
              {/* Optional notification dot */}
              <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <UserDropdown user={user} logout={logout} />
          </div>
        ) : (
          <Link
            to="/signin"
            className="px-5 py-2 bg-green-900 text-white rounded-xl hover:bg-green-800"
          >
            Login / Sign-Up
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded focus:outline-none ml-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </header>
  );
}
