// src/components/FavoriteButton.jsx
import { Heart } from "lucide-react";
import { useFavorites } from "../FavoriteContext.jsx";

export default function FavoriteButton({ property }) {
  const { favorites, toggleFavorite } = useFavorites();

  if (!property) return null; // prevent crash if not passed

  const isFavorite = favorites.some((item) => item.id === property.id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(property);
      }}
    >
      <Heart
        className={`w-5 h-5 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
        }`}
      />
    </button>
  );
}
