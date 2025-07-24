import { useEffect, useState } from "react";
import { fetchWishlistedPlaces, removeFromWishlist } from "../api/api";
import PlaceCard from "../components/PlaceCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      const res = await fetchWishlistedPlaces();
      setWishlist(res);
    } catch (err) {
      console.error(err);
      setError("찜한 맛집을 못 불러옴");
    }
  };

  useEffect(() => {
    async () => {
      await loadWishlist();
      setLoading(false);
    };
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
        <p className="text-center text-gray-500">불러오는 중...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-center text-gray-400">찜한 맛집이 없습니다.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {wishlist.map((place) => (
            <PlaceCard
              key={place.id}
              place={{ ...place, isWishlisted: true }}
              onToggleWish={handleRemove}
            />
          ))}
        </section>
      )}
    </main>
  );
}
