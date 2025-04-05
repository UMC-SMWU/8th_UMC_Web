import { useEffect, useState } from "react";
import { getMyInfo } from "../api/AuthService";
import { ResponseMyInfoDto } from "../types/auth";
import img_profile from "../assets/ic_signup_profile.svg";

export default function MyPage() {
  const [data, setData] = useState<ResponseMyInfoDto>();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">My Page</h1>
      <div className="flex flex-col gap-2 text-white h-dvh items-center mt-20">
        <img src={img_profile} alt="프로필 이미지" className="size-50 mb-10" />
        <span>이메일: {data?.data.email}</span>
        <span>이름: {data?.data.name}</span>
      </div>
    </div>
  );
}
