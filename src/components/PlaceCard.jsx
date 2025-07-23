export default function PlaceCard({ place, onToggleWish }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition duration-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">{place.name}</h2>
        <button
          onClick={() => onToggleWish(place.id)}
          className="text-2xl"
          aria-label="찜하기"
        >
          {place.isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-3">
        {place.description || "설명이 없습니다."}
      </p>

      {place.distance && (
        <p className="text-sm text-blue-500">
          📏 거리: {place.distance.toFixed(2)} km
        </p>
      )}
    </div>
  );
}
