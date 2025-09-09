import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/NavLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

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
            {/* Buy */}
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
                  <Link to="/buy/home" className="block px-4 py-2 hover:bg-gray-100">
                    Home For Sale
                  </Link>
                  <Link to="/buy/land" className="block px-4 py-2 hover:bg-gray-100">
                    Land For Sale
                  </Link>
                  <Link to="/buy/sold" className="block px-4 py-2 hover:bg-gray-100">
                    Recently Sold
                  </Link>
                </div>
              )}
            </li>

            {/* Rent */}
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
                  <Link to="/rent/apartments" className="block px-4 py-2 hover:bg-gray-100">
                    Apartments For Rent
                  </Link>
                  <Link to="/rent/houses" className="block px-4 py-2 hover:bg-gray-100">
                    House For Rent
                  </Link>
                  <Link to="/rent/condos" className="block px-4 py-2 hover:bg-gray-100">
                    Condos For Rent
                  </Link>
                  <Link to="/rent/land" className="block px-4 py-2 hover:bg-gray-100">
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

        {/* 🔹 User Section (Conditional) */}
        {user ? (
          <div className="relative flex items-center gap-3">
            {/* Bell icon */}
            <button className="hover:text-green-800">
              🔔
            </button>

            {/* Avatar + Name */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:text-green-800"
            >
              <span>{user.firstName} {user.lastName}</span>
              <img
                src={user.avatar || "https://i.pravatar.cc/40"} 
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <ChevronDown size={14} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md w-40 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
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
