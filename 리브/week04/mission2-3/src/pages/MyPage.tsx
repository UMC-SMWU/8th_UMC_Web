import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";  // API 호출 함수
import { ResponseMyInfoDto } from "../types/auth";  // 타입 정의
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // AuthContext를 통한 로그인 상태 확인

const MyPage = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();  // accessToken과 logout 함수 가져오기
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 유저 정보를 불러옵니다.
  useEffect(() => {
    const getData = async () => {
      if (!accessToken) {
        // 로그인 상태가 아니라면 로그인 페이지로 리디렉션
        navigate("/login");
        return;
      }

      try {
        // API 호출로 유저 정보 가져오기
        const response = await getMyInfo();
        console.log("내 정보", response);
        setData(response);  // 유저 정보 상태에 저장
      } catch (error) {
        console.error("정보 가져오기 실패", error);
        alert("정보를 가져오는 데 실패했습니다.");
      }
    };
    getData();
  }, [accessToken, navigate]);  // `accessToken`이 변할 때마다 다시 실행

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    await logout();  // 로그아웃
    navigate("/");  // 홈 페이지로 리디렉션
  };

  // 로딩 중일 때 화면
  if (!data) return <div className="text-white">로딩 중...</div>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={data.data?.avatar as string}
          alt="프로필 이미지"
          className="w-40 h-40 rounded-full object-cover"
        />
        <div className="text-lg">{data.data?.email}</div>
        <div className="text-2xl font-bold">{data.data?.name}</div>
  
        <button
          className="mt-6 px-6 py-2 bg-pink-500 hover:bg-pink-700 rounded-md text-white font-semibold"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;

