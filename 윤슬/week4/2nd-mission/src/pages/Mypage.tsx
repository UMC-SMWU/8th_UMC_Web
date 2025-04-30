import { ResponseMyInfoDto } from "types/auth";
import { getMyInfo } from "../apis/auth";
import { useEffect, useState } from "react"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        }
        getData();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/"); // 로그아웃 후 홈으로 이동
            alert("로그아웃 성공");
            
        } catch (error) {
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

  return (
    <div>
      <h1>{data?.data?.name}</h1> 
      <img src={data?.data?.avatar as string} alt={"구글 로고"}/>
      <h1>{data?.data?.email}</h1>

      <button onClick={handleLogout} className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">로그아웃</button>
    </div>
  );
}

export default MyPage;