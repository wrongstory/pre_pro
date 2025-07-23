export default function PlaceSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 animate-pulse flex flex-col items-center justify-center h-72">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
      <p className="text-sm text-gray-400">맛집을 불러오는 중입니다...</p>
    </div>
  );
}
