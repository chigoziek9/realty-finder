import { Heart } from "lucide-react";
import { useFavorites } from "../FavoriteContext.jsx";

export default function FavoriteButton({ property }) {
  const { favorites, toggleFavorite } = useFavorites();

  // ✅ Guard clause: no property passed
  if (!property) return null;

  // ✅ Ensure we always have a valid ID
  const propertyId = property?._id || property?.id;
  if (!propertyId) return null; // If no ID, don't render the button

  // ✅ Safely check if this property is already favorited
  const isFavorite = Array.isArray(favorites)
    ? favorites.some((item) => {
        if (!item) return false;
        const id = item?._id || item?.id;
        return id === propertyId;
      })
    : false;

  const handleClick = (e) => {
    e.stopPropagation();
    toggleFavorite(propertyId, property); // send ID + full property object
  };

  return (
    <button
      onClick={handleClick}
      className="transition-transform hover:scale-110"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`w-5 h-5 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
        }`}
      />
    </button>
  );
}
