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
        const region = `${addr.city || addr.town || addr.county || ""} ${
          addr.suburb || addr.village || addr.neighbourhood || ""
        }`;
        setAddress(region.trim());
      } catch (err) {
        console.error("주소 변환 실패:", err);
        setAddress("지역 정보를 불러오지 못했습니다.");
      }
    };

    fetchAddress();
  }, [location]);

  return address;
}
