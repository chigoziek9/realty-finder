import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      console.log({token})
      localStorage.setItem("authToken", token);
      navigate("/agents-dashboard");

    } else {
      navigate("/signin");
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
