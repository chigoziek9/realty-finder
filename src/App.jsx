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
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";
import PropertyDetails from "./components/propertydetail";
import Newtomarket from "./pages/Newtomarket";
import MostViewed from "./pages/MostViewed";
import NaturePage from "./pages/NaturePage";
import SigninPage from "./pages/SignIn"; 
import SignInEmail from "./pages/SignInEmail";
import SignInPhone from "./pages/SignInPhone";
import PhoneSigninPage from "./pages/PhoneSigninPage";

 


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

          {/* Auth routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/phone-signin" element={<PhoneSigninPage />} />
          <Route path="/signin-email" element={<SignInEmail />} />
          <Route path="/signin-phone" element={<SignInPhone />} />

          {/* Password reset flow */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetPasswordSuccess />} />

          {/* Property routes */}
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/Newtomarket" element={<Newtomarket />} />
          <Route path="/MostViewed" element={<MostViewed />} />
          <Route path="/NaturePage" element={<NaturePage />} />
        </Routes>
      </main>
    </div>
  );
}
