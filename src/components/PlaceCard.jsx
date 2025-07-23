export default function PlaceCard({ place, onToggleWish }) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition duration-200">
      <img
        src={place.imageUrl}
        alt={place.image.alt}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {place.title}
        </h2>
        <p className="text-sm text-gray-600">{place.description}</p>
      </div>
    </div>
  );
}
