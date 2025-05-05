import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { accessToken, user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black text-white flex items-center justify-between px-4 py-3 shadow">
      {/* 왼쪽: 햄버거 + 로고 */}
      <div className="flex items-center space-x-3">
        <button className="text-2xl focus:outline-none" onClick={toggleSidebar}>
          ☰
        </button>
        <Link to="/" className="text-pink-500 text-xl font-bold">
          돌려돌려LP판
        </Link>
      </div>

      {/* 오른쪽: 로그인 상태별 메뉴 */}
      <div className="flex items-center space-x-4 text-sm">
        {accessToken ? (
          <>
            <span>{user?.name}님 반갑습니다.</span>
            <button
              onClick={logout}
              className="hover:text-pink-400 transition-colors"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-pink-400">
              로그인
            </Link>
            <Link
              to="/signup"
              className="bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-600 transition"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;


