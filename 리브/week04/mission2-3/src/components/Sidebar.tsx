import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 사이드바 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-52 bg-black text-white z-40 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* 메뉴 목록 */}
      <nav className="mt-16 p-6 space-y-6 text-lg">
        <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-pink-400">
          찾기
        </Link>
        <Link to="/my" onClick={() => setIsOpen(false)} className="block hover:text-pink-400">
          마이페이지
        </Link>
      </nav>

      {/* 하단 고정 탈퇴 */}
      <div className="absolute bottom-4 left-6 text-xs text-gray-500">
        탈퇴하기
      </div>
    </div>
  );
};

export default Sidebar;



