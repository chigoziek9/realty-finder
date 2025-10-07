import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();
  const cookieToken = Cookies.get("token");

  console.group("🔒 ProtectedRoute Debug");
  console.log("👤 user from context:", user);
  console.log("🪪 token from context:", token);
  console.log("🍪 token from cookies:", cookieToken);

  // Determine authentication status
  const isUserDefined = user !== undefined && user !== null;
  const hasToken = Boolean(token || cookieToken);

  console.log("✅ user defined?", isUserDefined);
  console.log("✅ has token?", hasToken);

  if (user === undefined) {
    console.log("⏳ User state is undefined — still loading AuthContext...");
    console.groupEnd();
    return <p>Loading...</p>;
  }

  if (!isUserDefined || !hasToken) {
    console.log("🚫 No valid user/token found — redirecting to /signin");
    console.groupEnd();
    return <Navigate to="/signin" replace />;
  }

  console.log("✅ Access granted — rendering protected route");
  console.groupEnd();
  return children;
};

export default ProtectedRoute;
