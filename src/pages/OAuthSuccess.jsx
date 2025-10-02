// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Save token for later API requests
      Cookies.set("token", token, { expires: 7 });
      localStorage.setItem("token", token);
      console.log(token)

      // Redirect to dashboard or home
      navigate("/owners-dashboard");
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
}
