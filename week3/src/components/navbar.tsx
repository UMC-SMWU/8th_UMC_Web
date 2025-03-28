import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      className="top-0 left-0 w-full h-12 bg-gray-800 text-white 
    flex items-center justify-evenly"
    >
      <Link to={"/"}>홈 페이지로 이동</Link>
      <Link to={"/movies"}>영화 페이지로 이동</Link>
    </nav>
  );
};

export default NavBar;
