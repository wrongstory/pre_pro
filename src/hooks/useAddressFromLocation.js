import { useEffect, useState } from "react";

export default function useAddressFromLocation(location) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!location) return;

    const fetchAddress = async () => {
      try {
        const { lat, lon } = location;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await res.json();
        const addr = data.address;

        const state = addr.state || "";
        const city = addr.city || addr.county || "";
        const dong = addr.suburb || addr.village || addr.neighbourhood || "";
        const road = addr.road || "";
        const houseNumber = addr.house_number || "";

        const fullAddress = [state, city, dong, road, houseNumber]
          .filter(Boolean)
          .join(" ");

        setAddress(fullAddress);
      } catch (err) {
        console.error("주소 변환 실패:", err);
        setAddress("지역 정보를 불러오지 못했습니다.");
      }
    };

    fetchAddress();
  }, [location]);

  return address;
}
