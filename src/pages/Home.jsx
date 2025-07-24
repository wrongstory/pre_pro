import { useEffect, useState } from "react";
import { fetchAllPlaces, IMAGE_BASE_URL } from "../api/api";
import PlaceCard from "../components/PlaceCard";
import PlaceSkeleton from "../components/PlaceSkeleton";
import useUserLocation from "../hooks/useUserLocation";
import { sortPlacesByDistance } from "../hooks/loc";
import useAddressFromLocation from "../hooks/useAddressFromLocation";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { location: userLocation, locationError } = useUserLocation();
  const address = useAddressFromLocation(userLocation);

  const handleToggleWish = (placeId, isWishlisted) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === placeId ? { ...place, isWishlisted } : place
      )
    );
  };

  useEffect(() => {
    if (!userLocation) return;

    async function loadPlaces() {
      try {
        const placesData = await fetchAllPlaces();

        const withImages = placesData.map((place) => ({
          ...place,
          imageUrl: `${IMAGE_BASE_URL}/${place.image.src}`,
        }));

        // 거리 순 정렬
        const sorted = sortPlacesByDistance(
          withImages,
          userLocation.lat,
          userLocation.lon
        );

        setPlaces(sorted);
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
  }, [userLocation]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-2">
      <div className="text-right text-sm text-gray-500 mb-6">
        {locationError && <p className="text-red-500">{locationError}</p>}
        {!locationError && !userLocation && (
          <p>위치 정보를 불러오는 중입니다...</p>
        )}
        {userLocation && (
          <p>
            📍 현재 위치: {userLocation.lat.toFixed(4)},{" "}
            {userLocation.lon.toFixed(4)}
          </p>
        )}
        {address && <p> 현재 지역: {address}</p>}
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        🍜 너가 알 수도 있는 맛집
      </h1>
      {(error || locationError) && (
        <p className="text-center text-red-500 mt-2">
          {locationError || error}
        </p>
      )}
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
            <PlaceCard
              key={place.id}
              place={place}
              onToggleWish={handleToggleWish}
            />
          ))}
        </section>
      )}
    </main>
  );
}
