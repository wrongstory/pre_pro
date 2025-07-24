import { useState } from "react";

export default function PlaceCard({ place, onToggleWish }) {
  const [isWishlisted, setIsWishlisted] = useState(place.isWishlisted || false);

  const handleWishToggle = () => {
    setIsWishlisted(!isWishlisted);
    onToggleWish(place.id, !isWishlisted);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition duration-200">
      <img
        src={place.imageUrl}
        alt={place.image.alt}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {place.title}
          </h2>
          <button
            onClick={handleWishToggle}
            className="text-2xl"
            aria-label="찜콩맛집"
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>
        <p className="text-sm text-gray-600">{place.description}</p>
        {place.distance && (
          <p className="text-right text-sm text-blue-500">
            📏 거리: {place.distance.toFixed(2)} km
          </p>
        )}
      </div>
    </div>
  );
}
