import { useEffect, useState } from "react";
import { fetchWishlistedPlaces, removeFromWishlist } from "../services/api";
import PlaceCard from "../components/PlaceCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = async () => {
    const res = await fetchWishlistedPlaces();
    setWishlist(res.data);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (id) => {
    await removeFromWishlist(id);
    loadWishlist();
  };

  return (
    <div>
      <h1>너의 맛집은....</h1>
      {wishlist.map((place) => (
        <PlaceCard
          key={place.id}
          place={{ ...place, isWishlisted: true }}
          onToggleWish={handleRemove}
        />
      ))}
    </div>
  );
}
