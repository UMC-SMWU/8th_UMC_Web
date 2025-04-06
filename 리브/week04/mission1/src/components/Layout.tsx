import { Outlet, NavLink } from "react-router-dom";

const navItems = [
  { name: "홈", to: "/" },
  { name: "인기 영화", to: "/movies/popular" },
  { name: "상영 중", to: "/movies/now_playing" },
  { name: "평점 높은", to: "/movies/top_rated" },
  { name: "개봉 예정", to: "/movies/upcoming" },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="flex gap-4 p-4 bg-sky-200">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `font-semibold ${isActive ? "text-blue-800 underline" : "text-gray-700"}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}