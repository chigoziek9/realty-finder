import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Buy from "./pages/Buy";
import Houses from "./pages/Houses";
import Account from "./pages/Account";
import Agent from "./pages/Agent";
import Sell from "./pages/Sell";

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
    <Routes>
      {/* 🔽 This ensures all paths become lowercase */}
      <Route path="*" element={<LowercaseRedirect />} />


          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/buy/houses" element={<Houses />} />
          <Route path="/account" element={<Account />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/Feed" element={<Feed />} />
          
          {/* Add more routes here as needed */}
          {/* Add more routes here later */}
          <Route path="/signup" element={<SignUp />} />   {/* 👈 signup route */}
          <Route path="/signin" element={<SigninPage />} /> {/* 👈 signin route */}
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/Newtomarket" element={<Newtomarket />} />
          <Route path="/MostViewed" element={<MostViewed />} />
          <Route path="/NaturePage" element={<NaturePage />} />
         
          {/* Auth routes */}
          <Route
            path="/signup"
            element={
              <ProtectedSignupRoute>
                <SignUp />
              </ProtectedSignupRoute>
            }
          />
          <Route path="/choose-account-type" element={<ChooseAccountType />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/phone-signin" element={<PhoneSigninPage />} />
          <Route path="/signin-email" element={<SignInEmail />} />
          <Route path="/signin-phone" element={<SignInPhone />} />
          {/* Password reset flow */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetPasswordSuccess />} />
          <Route path="/signup/phone" element={<PhoneSignup />} />
=======
      <Route path="/" element={<Home />} />
      <Route path="/help" element={<Help />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/rent" element={<Rent />} />
      <Route path="/account" element={<Account />} />
      <Route path="/agent" element={<Agent />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/mortgage" element={<Mortgage />} />

      {/* Auth routes */}
      <Route
        path="/signup"
        element={
          <ProtectedSignupRoute>
            <SignUp />
          </ProtectedSignupRoute>
        }
      />
      <Route path="/choose-account-type" element={<ChooseAccountType />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/phone-signin" element={<PhoneSigninPage />} />
      <Route path="/signin-email" element={<SignInEmail />} />
      <Route path="/signin-phone" element={<SignInPhone />} />
      {/* Password reset flow */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-success" element={<ResetPasswordSuccess />} />
      <Route path="/signup/phone" element={<PhoneSignup />} />
(Auto-redirect users to /email-sms after signup)

      {/* Property routes */}
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/newtomarket" element={<Newtomarket />} />
      <Route path="/mostviewed" element={<MostViewed />} />
      <Route path="/naturepage" element={<NaturePage />} />
      <Route path="/phone-signin-otp" element={<PhoneSigninOtp />} />

      {/* Notifications & Settings */}
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/email-sms" element={<EmailSms />} />
      <Route path="/home-matches" element={<HomeMatches />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/saved-property" element={<SavedProperty />} />
      <Route path="/home-tours" element={<Hometours />} />
      <Route path="/home-report" element={<HomeReport />} />
    </Routes>
  );
}
