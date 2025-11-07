import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse favorites:", err);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Toggle favorite by unique property ID
  const toggleFavorite = (propertyId, propertyData) => {
  setFavorites((prev) => {
    if (!Array.isArray(prev)) return [propertyData];

    const exists = prev.some(
      (item) => (item?._id || item?.id) === propertyId
    );

    if (exists) {
      // remove it
      return prev.filter((item) => (item?._id || item?.id) !== propertyId);
    } else {
      // add it
      return [...prev, propertyData];
    }
  });
};


  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
