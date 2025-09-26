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

  // ✅ Update whole profile (not just picture)
  const updateProfile = async (formData) => {
    try {
      const res = await fetch("https://your-api.com/api/profile/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // send token if API needs auth
        },
        body: formData, // FormData so image uploads work
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser = await res.json();

      // Update global state + localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (err) {
      console.error("Profile update failed:", err);
      throw err;
    }
  };

  // ✅ (kept for backwards compatibility)
  const updateProfilePhoto = (fileUrl) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, profilePhoto: fileUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Login: save user + token
  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    Cookies.set("token", tokenValue, { expires: 7 });
  };

  // Logout: clear all
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateProfile, updateProfilePhoto }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
