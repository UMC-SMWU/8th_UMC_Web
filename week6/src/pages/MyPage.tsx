import { useEffect, useState } from "react";
import { getMyInfo } from "../api/AuthService";
import { ResponseMyInfoDto } from "../types/auth";
import img_profile from "../assets/ic_signup_profile.svg";
import { useAuthContext } from "../context/AuthContext";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export default function MyPage() {
  const [data, setData] = useState<ResponseMyInfoDto>();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem(LOCAL_STORAGE_KEY.nickname);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
      localStorage.setItem(LOCAL_STORAGE_KEY.nickname, response.data.name);
    };
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 text-white items-center mt-20">
        <img src={img_profile} alt="프로필 이미지" className="size-50 mb-10" />
        <span>이메일: {data?.data.email}</span>
        <span>이름: {data?.data.name}</span>
        <button
          className="bg-pink-600 text-white font-bold py-2 px-4 rounded mt-10"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
