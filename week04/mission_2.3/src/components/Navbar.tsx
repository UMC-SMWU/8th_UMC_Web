import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const location = useLocation(); // 현재 URL 가져오기

    const getLinkClass = (path: string) =>
        location.pathname === path ? "!text-pink-400" : "!text-white";
    return (
        <nav className = "absolute right-8 top-8 space-x-4">
            <Link to = '/' className = {getLinkClass("/")}></Link>
            <Link to = '/login' className = {getLinkClass("/login")}>로그인</Link>
            <Link to = '/signin' className = {getLinkClass("/signin")}>회원가입</Link>
        </nav>
    );
};

export default Navbar;