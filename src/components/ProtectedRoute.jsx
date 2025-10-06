import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();
  const cookieToken = Cookies.get("token");

  // ✅ Check both AuthContext state and cookie
  if (user === undefined) {
    return <p>Loading...</p>;
  }
  if (!user || !(token || cookieToken)) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
