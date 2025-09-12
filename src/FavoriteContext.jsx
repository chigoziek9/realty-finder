// src/context/FavoriteContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // ✅ Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // ✅ Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (property) => {
    setFavorites((prev) =>
      prev.find((item) => item.id === property.id)
        ? prev.filter((item) => item.id !== property.id)
        : [...prev, property]
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
