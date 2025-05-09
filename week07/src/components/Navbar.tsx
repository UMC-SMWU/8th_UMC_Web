import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { axiosInstance } from "../apis/axios";

const Navbar = () => {
  const location = useLocation();
  const { accessToken, isLoggedIn, logout } = useAuth();
  const [name, setName] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await axiosInstance.get("/v1/users/me");
        setName(res.data.data.name);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    if (isLoggedIn && !name) {
      fetchMyInfo();
    }
  }, [isLoggedIn, name]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    const handleResize = () => {
      setSidebarOpen(false);
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarOpen]);

  const getLinkClass = (path: string) =>
    location.pathname === path ? "!text-pink-400" : "!text-white";

  const handleDeleteUser = async () => {
    try {
      await axiosInstance.delete("/v1/users");
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
    }
  };

  return (
    <>
      <nav className="fixed w-full z-10 bg-black text-white">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className="block">
              <Menu className="w-6 h-6 text-white" />
            </button>
            <Link to="/" className="text-pink-600 font-bold text-xl">
              돌려돌려 LP판
            </Link>
          </div>

          <div className="space-x-6">
            {accessToken && name ? (
              <div className="flex items-center gap-4">
                <span className="text-sm !text-white font-semibold">
                  {name}님 반갑습니다.
                </span>
                <button
                  onClick={logout}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded text-sm"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className={getLinkClass("/login")}>
                  로그인
                </Link>
                <Link to="/signup" className={getLinkClass("/signup")}>
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 shadow-lg p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">메뉴</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {accessToken && (
                <Link to="/mypage" className={getLinkClass("/mypage")}>
                  마이페이지
                </Link>
              )}
              <Link to="/search" className={getLinkClass("/search")}>
                검색
              </Link>
            </nav>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-white hover:text-pink-600"
            >
              탈퇴하기
            </button>
          </div>

          {isDeleteModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsDeleteModalOpen(false);
              }}
            >
              <div className="relative bg-white text-black rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="absolute top-2 right-2 text-black text-xl hover:text-red-500"
                >
                  ✕
                </button>

                <p className="mb-6 text-lg font-semibold">
                  정말 탈퇴하시겠습니까?
                </p>

                <div className="flex justify-center gap-6">
                  <button
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                    onClick={handleDeleteUser}
                  >
                    예
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    아니오
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
