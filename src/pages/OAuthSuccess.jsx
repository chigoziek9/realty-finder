// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { useAuth } from "../AuthContext";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        // Decode JWT to extract user info
        const decodedUser = jwtDecode(token);

        // Save both user and token in AuthContext + storage
        login(decodedUser, token);

        // Optional: console check
        console.log("OAuth login success:", decodedUser);

        // Redirect to correct dashboard
        setTimeout(() => {
          if (decodedUser.role === "individual") {
            console.log("Navigating to /owners-dashboard");
            navigate("/", { replace: true });
          } else if (decodedUser.role === "admin") {
            console.log("Navigating to /admin-dashboard");
            navigate("/admin-dashboard", { replace: true });
          } else {
            console.log("Navigating to /agents-dashboard");
            navigate("/agents-dashboard", { replace: true });
          }
        }, 500);
      } catch (err) {
        console.error("Invalid token:", err);
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, [navigate, login]);

  return <p>Logging you in to RealtyFinder...</p>;
}
