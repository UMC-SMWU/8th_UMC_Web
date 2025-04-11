import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.png"; // 기본 프로필 이미지

const MyPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail"); // 로그인 시 저장해두면 좋아요
    const storedId = localStorage.getItem("userId");


    if (!storedName || !storedId) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login");
      return;
    }

    setUserName(storedName);
    setUserEmail(storedEmail || "이메일 정보 없음");
    setUserId(storedId);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center gap-6 bg-[#1e1e1e] p-10 rounded-md shadow-lg w-[350px]">
        <div className="relative w-full flex items-center justify-center mb-4">
          <button
            onClick={handleBack}
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
          <h2 className="text-xl font-semibold mb-1">{userName}</h2>
          <p className="text-gray-400 text-sm">{userEmail}</p>
          <p className="text-gray-500 text-xs mt-1">ID: {userId}</p>
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