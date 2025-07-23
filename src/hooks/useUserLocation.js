import { useEffect, useState } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState(null); // { lat, lon }
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      (err) => {
        console.error("위치 오류:", err);
        setLocationError("위치를 불러오지 못했습니다.");
      }
    );
  }, []);

  return { location, locationError };
}
