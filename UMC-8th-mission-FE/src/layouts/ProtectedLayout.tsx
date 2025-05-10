import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Footer from "./Footer";
import { MdArrowBack, MdMenu, MdPerson, MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useDeleteUser } from "../hooks/mutations/useAuth";

const ProtectedLayout = () => {
    const { accessToken, logout } = useAuth();

    const [data, setData] = useState<ResponseMyInfoDto>();
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);
            setData(response);
        };
        getData();
    },[]);

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    
    const {mutate} = useDeleteUser();

    if(!accessToken) {
        return <Navigate to={"/login"} replace />;
    }
    
    const handleLogoClick = () => {
      navigate("/");
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

      const handleLeave = () => {
        mutate(undefined, {
          onSuccess: () => {
            alert("탈퇴되었습니다.");
          },
          onError: (error) => {
            console.error("탈퇴 실패:", error);
            alert("탈퇴에 실패했습니다.");
          },
        })
      }

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen); // 사이드바 열기/닫기 토글
    };

    const closeSidebar = () => {
      setIsSidebarOpen(false); // 사이드바 닫기
    };

    return (
        <div className='h-dvh flex flex-col bg-gray-900 text-white relative'>
          {/* 오버레이 */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={closeSidebar}
            ></div>
          )}

          {/* 사이드바 */}
          {isSidebarOpen && (
            <aside className="w-60 bg-gray-800 flex flex-col p-4 fixed h-full z-50">
              <button
                className="text-white text-lg mb-4 self-end"
                onClick={toggleSidebar}
              >
                <MdArrowBack />
              </button>
              <nav className="flex flex-col space-y-4 flex-1">
                <button
                  className="flex items-center text-white py-2 px-4 text-sm cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    closeSidebar(); // 사이드바 닫기
                  }}
                >
                  <MdSearch className="mx-3"/> 찾기
                </button>
                <button
                  className="flex items-center text-white py-2 px-4 text-sm cursor-pointer"
                  onClick={() => {
                    navigate("/my");
                    closeSidebar(); // 사이드바 닫기
                  }}
                >
                  <MdPerson className="mx-3"/> 마이페이지
                </button>
                <button
                  className="items-center text-white py-2 px-4 text-xs cursor-pointer mt-auto"
                  onClick={() => {
                    setIsModalOpen(true);
                    closeSidebar(); // 사이드바 닫기
                  }}
                >
                  탈퇴하기
                </button>
              </nav>
            </aside>
          )}
          {/* 탈퇴 모달 */}
          {isModalOpen && (
              <div className="fixed inset-0 z-1000 flex items-center justify-center">
                <div className="bg-white p-10 rounded shadow-lg text-black">
                  <p className="mb-4">정말로 탈퇴하시겠습니까?</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-20"
                      onClick={() => {
                        handleLeave(); // 탈퇴 처리
                        setIsModalOpen(false)
                      }}
                    >
                      예
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-20"
                      onClick={() => {setIsModalOpen(false)}} // 모달 닫기
                    >
                      아니오
                    </button>
                  </div>
              </div>
            </div>
          )}

          <div className={`flex flex-col flex-1 transition-opacity duration-300 ${isSidebarOpen || isModalOpen ? "opacity-50" : "opacity-100"}`}>
            <nav className="flex justify-between items-center text-white font-bold py-2 px-4">
              <div className="flex items-center">
                <button
                  className="text-white text-l cursor-pointer"
                    onClick={toggleSidebar}
                >
                  <MdMenu />
                </button>
                <div className="text-[#6c9ace] text-lg px-3 cursor-pointer" onClick={handleLogoClick}>
                  돌려돌려 LP판
                </div>
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                <div className="px-3 cursor-pointer">
                  <MdSearch />
                </div>
                {accessToken && (
                  <div className="text-sm">{data?.data.name}님 반갑습니다.</div>
                )}
                <button 
                  className="text-white py-2 mx-1 p-[10px] rounded-sm text-sm cursor-pointer"
                  onClick={handleLogout}>로그아웃</button>
              </div>
            </nav>
            <main className='flex-1'>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      )
}

export default ProtectedLayout