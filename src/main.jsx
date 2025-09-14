import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; 
import { AuthProvider } from "./AuthContext"; // ✅ import
import { FavoriteProvider } from "./FavoriteContext"; // ✅ import

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
       <FavoriteProvider>
        <App />
      </FavoriteProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
