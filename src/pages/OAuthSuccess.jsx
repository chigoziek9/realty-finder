// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
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
        if (decodedUser.role === "individual") {
          navigate("/individual-dashboard");
        } else if (decodedUser.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/owners-dashboard");
        }
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
