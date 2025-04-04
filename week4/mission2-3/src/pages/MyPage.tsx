import { useEffect, useState } from "react";
import { getMyInfo } from "../api/AuthService";
import { ResponseMyInfoDto } from "../types/auth";

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
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span>이메일: {data?.data.email}</span>
        </div>
      </div>
    </div>
  );
}
