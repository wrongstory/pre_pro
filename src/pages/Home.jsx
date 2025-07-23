import { useEffect, useState } from "react";
import { fetchAllPlaces, IMAGE_BASE_URL } from "../api/api";
import PlaceCard from "../components/PlaceCard";
import PlaceSkeleton from "../components/PlaceSkeleton";

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

        // 상태 코드(http) 에 따라 분기. axios는 무응답의 경우 res가 undefined 일 수 있음.
        const status = err.response?.status;

        if (status === 404) {
          setError("요청 데이터를 찾을 수 없습니다. 404");
        } else if (status === 500) {
          setError("서버에 문제가 발생했습니다. 500");
        } else {
          setError("맛집 정보를 불러오는 데 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    }
    loadPlaces();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🍜 너가 알 수도 있는 맛집
      </h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-[90%] sm:w-[300px]">
            <PlaceSkeleton />
          </div>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </section>
      )}
    </main>
  );
}
