import { useEffect, useState } from "react";
import {
  fetchWishlistedPlaces,
  IMAGE_BASE_URL,
  removeFromWishlist,
} from "../api/api";
import PlaceCard from "../components/PlaceCard";
import PlaceSkeleton from "../components/PlaceSkeleton";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      const res = await fetchWishlistedPlaces();

      const withImageUrl = res.map((place) => ({
        ...place,
        imageUrl: `${IMAGE_BASE_URL}/${place.image.src}`,
        isWishlisted: true,
      }));

      setWishlist(withImageUrl);
    } catch (err) {
      console.error(err);
      setError("찜한 맛집을 못 불러옴");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (id) => {
    await removeFromWishlist(id);
    loadWishlist();
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">너의 맛집은....</h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-[90%] sm:w-[300px]">
            <PlaceSkeleton />
          </div>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {wishlist.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onToggleWish={handleRemove}
            />
          ))}
        </section>
      )}
    </main>
  );
}
