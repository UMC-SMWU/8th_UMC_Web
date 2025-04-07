import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const location = useLocation(); // 현재 URL 가져오기

    const getLinkClass = (path: string) =>
        location.pathname === path ? "!text-yellow-400" : "!text-gray-900";
    return (
        <nav className = "absolute right-8 top-8 space-x-4">
            <Link to = '/' className = {getLinkClass("/")}>홈</Link>
            <Link to = '/movies' className = {getLinkClass("/movies")}>인기 영화</Link>
            <Link to = '/ongoing' className = {getLinkClass("/ongoing")}>상영 중</Link>
            <Link to = '/highrated' className = {getLinkClass("/highrated")}>평점 높은</Link>
            <Link to = '/upcoming' className = {getLinkClass("/upcoming")}>개봉 예정</Link>
        </nav>
    );
};

export default Navbar;