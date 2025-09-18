import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load user from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Load token from cookie
  const [token, setToken] = useState(() => {
    return Cookies.get("token") || null;
  });

  // Update profile picture
  const updateProfilePic = (fileUrl) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, profilePic: fileUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Login: save user to localStorage and token to cookie
  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    Cookies.set("token", tokenValue, { expires: 7 }); // token expires in 7 days
  };

  // Logout: clear both
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateProfilePic }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
