import { Search, UserRound } from "lucide-react";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SideBar({ isOpen }: SideBarProps) {
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100%-4rem)] w-64 bg-[#0d0d0d] p-4 text-white z-50 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out flex flex-col justify-between`}
    >
      <div className="flex flex-col gap-6 mt-10">
        <div className="flex items-center gap-2 cursor-pointer">
          <Search color="white" />
          <p>찾기</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <UserRound color="white" />
          <p>마이페이지</p>
        </div>
      </div>

      <span className="mb-10 cursor-pointer text-gray-400 text-center">
        탈퇴하기
      </span>
    </aside>
  );
}
