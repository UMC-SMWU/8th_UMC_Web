import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <nav>네비게이션 바 입니다.</nav>
      <main className="flex-1 flex items-center justify-center"> {/* 이 줄 수정! */}
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default HomeLayout;

