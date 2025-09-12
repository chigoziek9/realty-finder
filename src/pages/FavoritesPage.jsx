// src/pages/FavoritesPage.jsx
import { useFavorites } from "../FavoriteContext";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa'; // or the correct icon family



export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <p className="flex justify-center items-center text-2xl font-bold h-40">
        No favorites yet ❤️
      </p>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-12">
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((house) => (
          <div
            key={house.id}
            onClick={() => navigate(`/property/${house.id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={house.images[0]}
              alt={house.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{house.title}</h3>
              <p className="text-gray-500">{house.address}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-green-700 font-medium">
                  {house.price}
                </span>
                <FavoriteButton property={house} />
              </div>
            </div>
          </div>
        ))}
        <Link
            to="/favorites"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm">FAvorites</span>
            
          </Link>
      </div>
    </div>
  );
}
