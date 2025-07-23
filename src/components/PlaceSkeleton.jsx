export default function PlaceSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
    </div>
  );
}
