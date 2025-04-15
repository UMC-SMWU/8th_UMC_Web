import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ProtectedLayout = () => {
    const { accessToken, logout } = useAuth();
    const navigate = useNavigate();

    if(!accessToken) {
        return <Navigate to={"/login"} replace />;
    }

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className='h-dvh flex flex-col bg-gray-900 text-white'>
            <nav className="flex justify-between items-center text-white font-bold outline-4 outline-[#6c9ace] py-2">
              <div className="text-[#6c9ace] text-lg px-3">돌려돌려 LP판</div>
              <div>
                <button 
                  className="bg-[#6c9ace] text-white py-2 mx-1 p-[10px] rounded-sm text-sm hover:bg-[#6c9ace]/80 transition-colors duration-200 cursor-pointer"
                  onClick={handleLogout}>로그아웃</button>
              </div>
            </nav>
            <main className='flex-1'>
              <Outlet />
            </main>
            <footer>푸터입니다</footer>
        </div>
      )
}

export default ProtectedLayout