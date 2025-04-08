import { Outlet, useNavigate } from "react-router-dom"

const HomeLayout = () => {
  const navigate = useNavigate();
  return (
    <div className='h-dvh flex flex-col'>
        <nav className="flex justify-between items-center text-white font-bold outline-4 outline-lime-900 py-2">
          <div className="text-[#2c4629] text-lg px-3">돌려돌려 LP판</div>
          <div>
            <button 
              className="bg-[#2c4629] text-white py-2 mx-1 p-[10px] rounded-sm text-sm hover:bg-[#4a6d47]/80 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate("/login")}>로그인</button>
            <button 
              className="bg-[#2c4629] text-white py-2 mx-1 p-[10px] rounded-sm text-sm hover:bg-[#4a6d47]/80 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate("/signup")}>회원가입</button>
          </div>
        </nav>
        <main className='flex-1'>
          <Outlet />
        </main>
        <footer>푸터입니다</footer>
    </div>
  )
}

export default HomeLayout
