import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Load user and token from storage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => Cookies.get("token") || null);

  // Restore user from token if available
 useEffect(() => {
  const cookieToken = Cookies.get("token");
  if (!user && cookieToken) {
    try {
      const decodedUser = jwtDecode(cookieToken);
      setToken(cookieToken);

      // ✅ Fetch full user details from backend
      fetch("https://realtyfinder.onrender.com/api/profile/me", {
        headers: { Authorization: `Bearer ${cookieToken}` },
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error("Failed to fetch full profile:", await res.text());
            return decodedUser; // fallback
          }
          const data = await res.json();
          if (data?.success && data?.data) {
            setUser(data.data);
            localStorage.setItem("user", JSON.stringify(data.data));
          } else {
            // fallback if backend didn’t return full data
            setUser(decodedUser);
            localStorage.setItem("user", JSON.stringify(decodedUser));
          }
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setUser(decodedUser);
          localStorage.setItem("user", JSON.stringify(decodedUser));
        });
    } catch (err) {
      console.error("❌ Failed to decode token:", err);
      Cookies.remove("token");
    }
  }
}, [user]);


  // ✅ Update full user profile
  const updateProfile = async (formData) => {
    try {
      const res = await fetch(
        "https://realtyfinder.onrender.com/api/profile/update-profile",
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
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

  // ✅ Update only profile photo
  const updateProfilePhoto = (fileUrl) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, profilePhoto: fileUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // ✅ Login (normal or OAuth)
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

    localStorage.setItem("user", JSON.stringify(userWithRole));
    Cookies.set("token", tokenValue);
  };

  // ✅ Logout (clears everything safely)
  const logout = () => {
    console.log("🚪 Logging out user...");
    setUser(null);
    setToken(null);
    localStorage.clear();
    Cookies.remove("token");
    sessionStorage.clear();
    navigate("/signin", { replace: true });
    console.log("✅ Cleared user, token, and storage.");
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

// ✅ Hook for consuming context
export const useAuth = () => useContext(AuthContext);
