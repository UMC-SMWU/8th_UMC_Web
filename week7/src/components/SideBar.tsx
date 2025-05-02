import { Search, UserRound, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../hooks/mutations/useUser.ts";
import { useState } from "react";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SideBar({ isOpen }: SideBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteUser } = useDeleteUser();
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#3e3f43] p-4 rounded shadow-lg w-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="flex ml-auto mb-15" onClick={closeModal}>
              <X size={20} color="white" />
            </button>
            <h2 className="text-lg font-bold text-center text-white">
              정말 탈퇴하시겠습니까?
            </h2>
            <div className="flex justify-center gap-4 mt-10 mb-15">
              <button
                className="bg-pink-600 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  deleteUser();
                  closeModal();
                }}
              >
                탈퇴하기
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={closeModal}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
      <aside
        className={`fixed left-0 top-16 h-[calc(100%-4rem)] w-64 bg-[#0d0d0d] p-4 text-white z-50 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out flex flex-col justify-between`}
      >
        <div className="flex flex-col gap-6 mt-10">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("")}
          >
            <Search color="white" />
            <p>찾기</p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <UserRound color="white" />
            <p>마이페이지</p>
          </div>
        </div>

        <span
          className="mb-10 cursor-pointer text-gray-400 text-center"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          탈퇴하기
        </span>
      </aside>
    </>
  );
}
