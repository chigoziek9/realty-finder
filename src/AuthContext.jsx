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

  // ✅ Update whole profile (including accountType, profile, etc.)
  const updateProfile = async (formData) => {
    try {
      const res = await fetch(
        "https://realtyfinder.onrender.com/api/profile/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // send token if API needs auth
          },
          body: formData, // FormData so image uploads work
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Server response:", text);
        throw new Error("Failed to update profile");
      }

      const resData = await res.json();
      if (!resData.success) throw new Error("Profile update failed");

      const updatedUser = resData.data; // ✅ only the user object

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (err) {
      console.error("Profile update failed:", err);
      throw err;
    }
  };

  // ✅ Update profile photo helper
  const updateProfilePhoto = (fileUrl) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, profilePhoto: fileUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // ✅ Login: unwrap `data` if backend wraps it
  const login = (responseUser, tokenValue) => {
    const userData =
      responseUser?.data && responseUser.success
        ? responseUser.data
        : responseUser; // handle both { success, data } and raw object

    // ✅ Ensure accountType is always stored
    const userWithType = {
      ...userData,
      accountType: userData?.accountType || localStorage.getItem("accountType"),
    };

    setUser(userWithType);
    setToken(tokenValue);

    localStorage.setItem("user", JSON.stringify(userWithType));
    Cookies.set("token", tokenValue, { expires: 7 });
  };

  // ✅ Logout: clear all
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

export const useAuth = () => useContext(AuthContext);
