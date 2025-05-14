import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];

const NavBar = () => {
  return (
    <nav
      className="top-0 left-0 w-full h-12 shadow-md
    flex items-center justify-evenly"
    >
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-500" : "text-gray-500"
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
