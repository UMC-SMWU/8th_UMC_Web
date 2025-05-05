import { useAuth } from "../context/AuthContext.tsx";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {useState} from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  const [sidebarOpen, setSidebarOpen] =useState(false);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen bg-black text-white">
      {/* 헤더 */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* 사이드바 */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* 본문 영역 */}
      <main className="pt-16 px-4 min-h-screen bg-black">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
