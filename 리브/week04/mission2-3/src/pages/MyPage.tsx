import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log("내 정보", response);
      setData(response);
    };
    getData();
  }, []);

  if (!data) return <div className="text-white">로딩 중...</div>;

  return (
    <div className="text-white p-6">
      <h1 className="text-xl font-bold mb-4">마이페이지</h1>
      <p>닉네임: {data.name}</p>
      <p>이메일: {data.email}</p>
    </div>
  );
};

export default MyPage;
