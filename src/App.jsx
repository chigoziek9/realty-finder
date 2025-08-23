import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Account from "./pages/Account";
import Agent from "./pages/Agent";
import Sell from "./pages/Sell";
import Mortgage from "./pages/Mortgage";
import PropertyDetails from "./components/propertydetail";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/account" element={<Account />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/mortgage" element={<Mortgage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </main>
    </div>
  );
}
