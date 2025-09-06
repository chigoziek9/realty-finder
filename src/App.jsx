import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Buy from "./pages/Buy";
import Houses from "./pages/Houses";
import Account from "./pages/Account";
import Agent from "./pages/Agent";
import Sell from "./pages/Sell";
import Navbar from "./components/Navbar";

import Feed from "./pages/Feed";
import ChooseAccountType from "./pages/ChooseAccountType";
import SignUp from "./pages/SignUp";
import PhoneSignup from "./pages/PhoneSignup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import PhoneSigninOtp from "./pages/PhoneSigninOtp";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";
import PropertyDetails from "./components/propertydetail";
import Newtomarket from "./pages/Newtomarket";
import MostViewed from "./pages/MostViewed";
import NaturePage from "./pages/NaturePage";
import SigninPage from "./pages/SignIn";
import SignInEmail from "./pages/SignInEmail";
import SignInPhone from "./pages/SignInPhone";
import PhoneSigninPage from "./pages/PhoneSigninPage";
import Notifications from "./pages/Notifications";
import EmailSms from "./pages/EmailSMS";
import HomeMatches from "./pages/HomeMatches";
import Messages from "./pages/Messages";
import SavedProperty from "./pages/SavedProperty";
import Hometours from "./pages/Hometours";
import HomeReport from "./pages/HomeReport";
import Contact from "./pages/Contact";
import RentProperty from "./pages/RentProperty";
import Rent from "./pages/Rent";
import PropertyRequestAlert from "./pages/PropertyRequestAlert";
import AddPropertyRequestAlert from "./pages/AddPropertyRequestAlert";
import Explore from "./pages/Explorerent";

// ✅ Force lowercase URLs
function LowercaseRedirect() {
  const location = useLocation();
  const lowercasePath = location.pathname.toLowerCase();

  if (location.pathname !== lowercasePath) {
    return <Navigate to={lowercasePath} replace />;
  }
  return null;
}

// ✅ Wrapper to protect signup route
function ProtectedSignupRoute({ children }) {
  const accountType = localStorage.getItem("accountType");
  if (!accountType) {
    return <Navigate to="/choose-account-type" replace />;
  }
  return children;
}

export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
      {/* 🔽 Ensures all paths become lowercase */}
      <Route path="*" element={<LowercaseRedirect />} />

      {/* Main pages */}
      <Route path="/" element={<Home />} />
      <Route path="/help" element={<Help />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/buy/houses" element={<Houses />} />
      <Route path="/account" element={<Account />} />
      <Route path="/agent" element={<Agent />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/contact" element={<Contact />} />

      {/* Property routes */}
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/newtomarket" element={<Newtomarket />} />
      <Route path="/mostviewed" element={<MostViewed />} />
      <Route path="/naturepage" element={<NaturePage />} />
      <Route path="/explore" element={<Explore />} />

      {/* Auth routes */}
      <Route
        path="/signup"
        element={
          <ProtectedSignupRoute>
            <SignUp />
          </ProtectedSignupRoute>
        }
      />
      <Route path="/signup/phone" element={<PhoneSignup />} />
      <Route path="/choose-account-type" element={<ChooseAccountType />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/phone-signin" element={<PhoneSigninPage />} />
      <Route path="/signin-email" element={<SignInEmail />} />
      <Route path="/signin-phone" element={<SignInPhone />} />
      <Route path="/phone-signin-otp" element={<PhoneSigninOtp />} />

      {/* Password reset flow */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-success" element={<ResetPasswordSuccess />} />

      {/* Notifications & Settings */}
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/email-sms" element={<EmailSms />} />
      <Route path="/home-matches" element={<HomeMatches />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/saved-property" element={<SavedProperty />} />
      <Route path="/home-tours" element={<Hometours />} />
      <Route path="/home-report" element={<HomeReport />} />
      <Route path="/rent" element={<Rent />} />
        <Route path="/rent-property" element={<RentProperty />} />
         <Route path="/property-request-alert" element={<PropertyRequestAlert />} />
          <Route path="/add-property-request-alert" element={<AddPropertyRequestAlert />} />
    </Routes>
    </>
    
  );
}
