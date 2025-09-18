import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token"); // JWT sent by backend

    if (token) {
      // Store token in localStorage for future API requests
      localStorage.setItem("authToken", token);
      navigate("/agents-dashboard"); // Redirect to protected dashboard
    } else {
      navigate("/login"); // If token is missing, go to login
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthRedirect;
