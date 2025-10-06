// src/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 🔹 Load user from localStorage (if exists)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 🔹 Load token from cookies (if exists)
  const [token, setToken] = useState(() => Cookies.get("token") || null);

  // 🔹 Automatically restore user from token if missing (e.g., after OAuth redirect)
  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (!user && cookieToken) {
      try {
        const decodedUser = jwtDecode(cookieToken);
        setUser(decodedUser);
        setToken(cookieToken);
        localStorage.setItem("user", JSON.stringify(decodedUser));
      } catch (err) {
        console.error("Failed to decode token:", err);
        Cookies.remove("token");
      }
    }
  }, [user]);

  // ✅ Update whole profile (server + local)
  const updateProfile = async (formData) => {
    try {
      const res = await fetch(
        "https://realtyfinder.onrender.com/api/profile/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Server response:", text);
        throw new Error("Failed to update profile");
      }

      const resData = await res.json();
      if (!resData.success) throw new Error("Profile update failed");

      const updatedUser = resData.data;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (err) {
      console.error("Profile update failed:", err);
      throw err;
    }
  };

  // ✅ Update only profile photo locally
  const updateProfilePhoto = (fileUrl) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, profilePhoto: fileUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // ✅ Login: works for both normal + OAuth
  const login = (responseUser, tokenValue) => {
    const userData =
      responseUser?.data && responseUser.success
        ? responseUser.data
        : responseUser;

    const userWithRole = {
      ...userData,
      role: userData?.role || localStorage.getItem("role") || "individual",
    };

    setUser(userWithRole);
    setToken(tokenValue);

    // 🔹 Persist user but make cookie session-only (expires on refresh)
    localStorage.setItem("user", JSON.stringify(userWithRole));
    Cookies.set("token", tokenValue); // ❌ no expires → session cookie
  };

  // ✅ Logout: clear everything
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateProfile,
        updateProfilePhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth
export const useAuth = () => useContext(AuthContext);
