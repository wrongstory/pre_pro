import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white border-b shadow-sm mb-6">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">맛집 지도</h1>
        <div className="flex gap-3">
          <Link to="/" className={linkStyle("/")}>
            홈
          </Link>
          <Link to="/wishlist" className={linkStyle("/wishlist")}>
            찜 목록
          </Link>
        </div>
      </div>
    </nav>
  );
}
