import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Bell } from "lucide-react";
import logo from "../assets/NavLogo.png";
import { AuthContext } from "../AuthContext";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [open, setOpen] = useState(false); // notifications
  const timeoutRef = useRef(null);
  const { user, logout } = useContext(AuthContext);

  const notifications = [
    { id: 1, text: "New message from agent" },
    { id: 2, text: "Your property listing was approved" },
  ];

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMenuOpen(menu);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setMenuOpen(null), 200);
  };

  return (
    <header className="bg-white shadow-sm px-6 md:px-10 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
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
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-40 z-50">
                  <Link to="/buy/home" className="block px-4 py-2 hover:bg-gray-100">
                    House For Sale
                  </Link>
                  <Link to="/buy/land" className="block px-4 py-2 hover:bg-gray-100">
                    Land For Sale
                  </Link>
                  <Link to="/buy/recent" className="block px-4 py-2 hover:bg-gray-100">
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
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-52 z-50">
                  <Link to="/rent/apartments" className="block px-4 py-2 hover:bg-gray-100">
                    Apartments / Condos For Rent
                  </Link>
                  <Link to="/rent/houses" className="block px-4 py-2 hover:bg-gray-100">
                    Houses For Rent
                  </Link>
                  <Link to="/rent/land" className="block px-4 py-2 hover:bg-gray-100">
                    Land For Rent
                  </Link>
                </div>
              )}
            </li>
             

            {/* Other links */}
            {user?.role !== "agent" && (
              <li>
                <Link to="/agent" className="hover:text-green-800">
                  Real Estate Agents
                </Link>
              </li>
            )}
            <li>
              <Link to="/feed" className="hover:text-green-800">
                Feed
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right side (notifications & user/login) */}
        {user ? (
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button
                className="relative text-gray-600 hover:text-green-700"
                onClick={() => setOpen(!open)}
              >
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b font-semibold text-gray-700">Notifications</div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <li key={n.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        {n.text}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center border-t">
                    <Link
                      to="/notifications"
                      className="block p-2 text-sm text-green-700 font-medium hover:text-xl"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User dropdown */}
            <UserDropdown
              user={{
                firstName: user?.firstName,
                lastName: user?.lastName,
                profilePhoto: user?.profilePhoto,
                role: user?.role,
              }}
              logout={logout}
            />
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 md:hidden z-50 animate-slideDown">
          <nav className="flex flex-col p-5 space-y-3 text-gray-800 text-[15px] font-medium">
            <Link
              to="/buy/home"
              className="block px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-800 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              🏠 Buy
            </Link>

            <Link
              to="/rent/apartments"
              className="block px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-800 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              🏢 Rent
            </Link>

            {user?.role !== "agent" && (
              <Link
                to="/agent"
                className="block px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-800 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                👨‍💼 Real Estate Agents
              </Link>
            )}

            <Link
              to="/feed"
              className="block px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-800 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              📰 Feed
            </Link>

            <hr className="border-gray-200 my-2" />

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-800 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  👤 Profile
                </Link>

                <Link
                  to="/notifications"
                  className="block px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-800 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  🔔 Notifications
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-left block w-full px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="block text-center px-4 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                🔑 Login / Sign-Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
