import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import NavButton from "./NavButton";
import { AlignJustify, Search } from "lucide-react";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";

export default function NavBar() {
  const navigate = useNavigate();
  const { accessToken, nickname, logout } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [wasSidebarOpen, setWasSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(true);
    setWasSidebarOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(wasSidebarOpen);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [wasSidebarOpen]);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-[#0d0d0d]">
        <div className="flex flex-1 items-center gap-4">
          <AlignJustify color="white" onClick={toggleSidebar} />
          <h1
            className="text-2xl font-bold text-pink-600"
            onClick={() => navigate("/")}
          >
            돌려돌려LP판
          </h1>
        </div>
        <Search color="white" size={18} />
        {accessToken ? (
          <section className="flex gap-4 items-center">
            <NavButton text={`${nickname}님 반갑습니다.`} onClick={() => {}} />
            <NavButton
              text="로그아웃"
              onClick={() => {
                logout();
              }}
              style="bg-pink-600"
            />
          </section>
        ) : (
          <section className="flex gap-4 items-center">
            <NavButton text="로그인" onClick={() => navigate("/login")} />
            <NavButton
              text="회원가입"
              onClick={() => navigate("/signup")}
              style="bg-pink-600"
            />
          </section>
        )}
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 "
          onClick={() => {
            setIsSidebarOpen(false);
            setWasSidebarOpen(false);
          }}
        />
      )}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
}
