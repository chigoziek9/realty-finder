import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-red shadow-sm px-6 md:px-10 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">X</span>
        </div>
        <span className="font-bold text-lg">RealtyFinder</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li><Link to="/" className="hover:text-gray-600">Home</Link></li>
          <li><Link to="/buy" className="hover:text-gray-600">Buy</Link></li>
          <li><Link to="/sell" className="hover:text-gray-600">Sell</Link></li>
          <li><Link to="/rent" className="hover:text-gray-600">Rent</Link></li>
          <li><Link to="/mortgage" className="hover:text-gray-600">Mortgage</Link></li>
          <li><Link to="/agent" className="hover:text-gray-600">Agent</Link></li>
          <li><Link to="/account" className="hover:text-gray-600">Account</Link></li>
          <li><Link to="/help" className="hover:text-gray-600">Help</Link></li>
        </ul>
      </nav>

      {/* Desktop Auth */}
      <div className="hidden md:flex gap-4">
        <button className="px-5 py-2 border border-black rounded-full hover:bg-gray-100">Login</button>
        <button className="px-5 py-2 bg-gray-300 rounded-full hover:bg-gray-400">Create an account</button>
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
          <li><Link to="/" className="hover:text-red-500" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/buy" className="hover:text-red-500" onClick={() => setIsOpen(false)}>Buy</Link></li>
          <li><Link to="/sell" className="hover:text-red-500" onClick={() => setIsOpen(false)}>Sell</Link></li>
          <li><Link to="/rent" className="hover:text-red-500" onClick={() => setIsOpen(false)}>Rent</Link></li>
          <li><Link to="/mortgage" className="hover:text-red-500" onClick={() => setIsOpen(false)}>Mortgage</Link></li>
          <li><Link to="/agent" className="hover:text-red-500" onClick={() => setIsOpen(false)}>Agent</Link></li>
          <li><Link to="/account" className="hover:text-red-500" onClick={() => setIsOpen(false)}>Account</Link></li>
          <li><Link to="/help" className="hover:text-red-500" onClick={() => setIsOpen(false)}>Help</Link></li>
        </ul>

        {/* Auth buttons */}
        <div className="flex flex-col gap-3 mt-8 px-6">
          <button className="w-full px-5 py-2 border border-black rounded-full hover:bg-gray-100">
            Login
          </button>
          <button className="w-full px-5 py-2 bg-gray-300 rounded-full hover:bg-gray-400">
            Create an account
          </button>
        </div>
      </div>
    </header>
  );
}
