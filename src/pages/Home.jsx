import { useEffect, useState } from "react";
import { fetchAllPlaces, IMAGE_BASE_URL } from "../api/api";
import PlaceCard from "../components/PlaceCard";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlaces() {
      try {
        const placesData = await fetchAllPlaces();

        const withImages = placesData.map((place) => ({
          ...place,
          imageUrl: `${IMAGE_BASE_URL}/${place.image.src}`,
        }));

        setPlaces(withImages);
      } catch (err) {
        console.error(err);
        setError("맛집 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🍜 전체 맛집</h1>

      {loading && <p className="text-center text-gray-500">불러오는 중...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} onToggleWish={() => {}} />
        ))}
      </section>
    </main>
  );
}
