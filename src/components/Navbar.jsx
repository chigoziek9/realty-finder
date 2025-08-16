import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-red shadow-sm px-6 md:px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">X</span>
        </div>
        <span className="font-bold text-lg">RealtyFinder</span>
      </div>

      {/* Nav Links */}
      <nav>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          <li><Link to="/" className="hover:text-black-600">Home</Link></li>
          <li><Link to="/buy" className="hover:text-gray-600">Buy</Link></li>
          <li><Link to="/sell" className="hover:text-gray-600">Sell</Link></li>
            <li><Link to="/rent" className="hover:text-gray-600">Rent</Link></li>
            <li><Link to="/mortgage" className="hover:text-gray-600">Mortgage</Link></li>
            <li><Link to="/agent" className="hover:text-gray-600">Agent</Link></li>
             <li><Link to="/account" className="hover:text-gray-600">Account</Link></li>

            <li><Link to="/help" className="hover:text-gray-600">Help</Link></li>
            


        </ul>
      </nav>

      {/* Auth buttons */}
      <div className="hidden md:flex gap-4">
        <button className="px-5 py-2 border border-black rounded-full hover:bg-gray-100">Login</button>
        <button className="px-5 py-2 bg-gray-300 rounded-full hover:bg-gray-400">Create an account</button>
      </div>
    </header>
  );
}
