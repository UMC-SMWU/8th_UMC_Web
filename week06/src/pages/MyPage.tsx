import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const {logout} = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (err) {
        console.error("❌ getMyInfo 에러:", err);
      }
    };
    getData();
  }, []);

  if (!data || !data.data) return <div className="text-white">로딩 중...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center gap-6 bg-[#1e1e1e] p-10 rounded-md shadow-lg w-[350px]">
        <div className="relative w-full flex items-center justify-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-white text-2xl focus:outline-none px-3"
          >
            &lt;
          </button>
          <h1 className="text-3xl font-bold text-center w-full">마이페이지</h1>
        </div>

        <img
          src={profile}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full border border-gray-400 object-cover"
        />

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-1">{data.data?.name}</h2>
          <p className="text-gray-400 text-sm">{data.data?.email}</p>
        </div>
        <div className="flex flex-col gap-3 mt-6 w-full">
          <button
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-md text-white font-medium"
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <button
            className="w-full py-3 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-medium"
            onClick={() => alert("회원 정보 수정은 추후 구현 예정입니다.")}
          >
            회원 정보 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;