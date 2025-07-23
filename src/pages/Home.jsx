import PlaceCard from "../components/PlaceCard";

const dummyPlaces = [
  {
    id: 1,
    name: "순대국밥집",
    description: "진한 국물과 정겨운 맛의 순대국밥 전문점",
    distance: 0.3,
    isWishlisted: true,
  },
  {
    id: 2,
    name: "연어덮밥 전문점",
    description: "신선한 연어가 올라간 일본식 덮밥",
    distance: 1.2,
    isWishlisted: false,
  },
  {
    id: 3,
    name: "불고기 백반집",
    description: "한상 가득 나오는 전통 백반 메뉴",
    distance: 0.7,
    isWishlisted: true,
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📍 내 주변 맛집</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dummyPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} onToggleWish={() => {}} />
        ))}
      </section>
    </main>
  );
}
