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

import MyPropertyAlerts from "./pages/MyPropertyAlerts";
import MySavedProperty from "./pages/MySavedProperty";
import AccountSettings from "./pages/AccountSettings";
import Profile from "./pages/Profile";
import FavoritesPage from "./pages/FavoritesPage";
import AgentsDashboard from "./pages/AgentDashboard";
import AgentsClient from "./pages/AgentsClient";
import AgentsDocument from "./pages/AgentsDocument";
import AgentsProperty from "./pages/AgentsProperty";
import AgentsTransaction from "./pages/AgentsTransaction";
import AgentPropertyForm from "./components/AgentPropertyForm";
import ResetOtpVerification from "./pages/ResetOtpVerification";
import SetNewPassword from "./pages/SetNewPassword";
import PasswordSuccess from "./pages/PasswordSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import AgentSettings from "./pages/AgentSettings";
import OwnersDashboard from "./pages/OwnersDashboard";
import OwnersDocuments from "./pages/OwnersDocuments";
import OwnersAgreement from "./pages/OwnersAgreement";
import OwnersAccountSettings from "./pages/OwnersAccountSettings";
import OwnersPropertyListings from "./pages/OwnersPropertyListings";
import OwnersPropertySaved from "./pages/OwnersPropertySaved";
import AgentsList from "./components/AgentsList";
import OAuthSuccess from "./pages/OAuthSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserMgt from "./pages/AdminUserMgt";
import AdminPropertyMgt from "./pages/AdminPropertyMgt";
import AdminPayments from "./pages/AdminPayments";
import AdminPaymentsOverview from "./pages/AdminPaymentsOverview";
import AdminAgentMgt from "./pages/AdminAgentMgt";
 import AdminPaymentsPending from "./pages/AdminPaymentsPending";
import AdminPaymentDetail from "./pages/AdminPaymentDetail";
import AgentDetail from "./pages/AgentDetail"
import ReassignArea from "./pages/ReassignArea";
import Exploremain from "./pages/Explore";

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
          <Route path="/feed" element={<Feed />} />
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/buy/home" element={<Buy />} />
        <Route path="/buy/land" element={<Houses />} />
        <Route path="/account" element={<Account />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/sell" element={<Sell />} />
       
        <Route path="/contact" element={<Contact />} />
         <Route path="/explore" element={<Explore />} />

        {/* Property routes */}

        <Route
          path="/property/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/newtomarket" element={<Newtomarket />} />
        <Route path="/mostviewed" element={<MostViewed />} />
        <Route path="/naturepage" element={<NaturePage />} />
        <Route path="/exploremain" element={<Explore />} />

        {/* Auth routes */}
        <Route path="/signup" element={<SignUp />} />
         <Route
          path="/add-property-request-alert"
          element={
            <ProtectedRoute>
              < AddPropertyRequestAlert />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/admin-user-mgt"
          element={
            <ProtectedRoute>
              <AdminUserMgt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-property-mgt"
          element={
            <ProtectedRoute>
              <AdminPropertyMgt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-agents-mgt"
          element={
            <ProtectedRoute>
              <AdminAgentMgt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-payments-transactions"
          element={
            <ProtectedRoute>
              <AdminPayments />
            </ProtectedRoute>
            
          }
        />
        <Route path="/admin-payments-overview" element={<AdminPaymentsOverview />} />
        <Route path="/admin-payments-pending" element={<AdminPaymentsPending />} />
        <Route path="/admin-payment-detail" element={<AdminPaymentDetail />} />
         <Route path="/explore" element={<Exploremain />} />




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

        <Route
          path="/property-request-alert"
          element={
            <ProtectedRoute>
              <PropertyRequestAlert />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agents-listed-property"
          element={
            <ProtectedRoute>
              <AgentsList />
            </ProtectedRoute>
          }
        />

        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
          path="/agent-settings"
          element={
            <ProtectedRoute>
              <AgentSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owners-dashboard"
          element={
            <ProtectedRoute>
              <OwnersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owners-documents"
          element={
            <ProtectedRoute>
              <OwnersDocuments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owners-agreement"
          element={
            <ProtectedRoute>
              <OwnersAgreement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owners-settings"
          element={
            <ProtectedRoute>
              <OwnersAccountSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owners-listings"
          element={
            <ProtectedRoute>
              <OwnersPropertyListings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owners-saved-property"
          element={
            <ProtectedRoute>
              <OwnersPropertySaved />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}

        {/* Fallback */}
        <Route
          path="*"
          element={<h1 className="p-10">404 - Page Not Found</h1>}
        />

        <Route
          path="/Reset-Otp-Verification"
          element={<ResetOtpVerification />}
        />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents-dashboard"
          element={
            <ProtectedRoute>
              <AgentsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents-client"
          element={
            <ProtectedRoute>
              <AgentsClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents-document"
          element={
            <ProtectedRoute>
              <AgentsDocument />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents-property"
          element={
            <ProtectedRoute>
              <AgentsProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents-transaction"
          element={
            <ProtectedRoute>
              <AgentsTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents-form"
          element={
            <ProtectedRoute>
              <AgentPropertyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property-request-alert"
          element={
            <ProtectedRoute>
              <PropertyRequestAlert />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-property-alerts"
          element={
            <ProtectedRoute>
              <MyPropertyAlerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-properties"
          element={
            <ProtectedRoute>
              <MySavedProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account-settings"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />
        <Route path="/admin-agent-detail" element={<AgentDetail />} />
          <Route path="/reassign-area" element={<ReassignArea />} />
      </Routes>
    </>
  );
}
