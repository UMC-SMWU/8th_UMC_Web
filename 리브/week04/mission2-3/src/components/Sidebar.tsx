import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ComfirmModal";
import { useDeleteUser } from "../hooks/mutations/useDeleteUser"; // ✅ 커스텀 훅
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  // 회원탈퇴 mutation
  const { mutate: deleteUser } = useDeleteUser();

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  // 탈퇴 확정 시 호출
  const handleWithdraw = () => {
    deleteUser(); // 내부에서 logout과 navigate 수행됨
    setShowModal(false);
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-52 bg-black text-white z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="mt-16 p-6 space-y-6 text-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-pink-400">
            찾기
          </Link>
          <Link to="/my" onClick={() => setIsOpen(false)} className="block hover:text-pink-400">
            마이페이지
          </Link>
        </nav>

        {/* 탈퇴하기 버튼 */}
        <button
          onClick={() => setShowModal(true)}
          className="absolute bottom-10 left-6 text-sm text-white hover:text-red-400 transition"
        >
          탈퇴하기
        </button>
      </div>

      {/* 모달 */}
      {showModal && (
        <ConfirmModal
          message="정말 탈퇴하시겠습니까?"
          onConfirm={handleWithdraw}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;





