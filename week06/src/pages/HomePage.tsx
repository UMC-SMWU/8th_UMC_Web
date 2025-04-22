import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAuth } from "../context/AuthContext";

type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  likes: { id: number }[];
};

const fetchLps = async (order: string) => {
  const res = await axiosInstance("/v1/lps", {
    params: {
      order: order,
      limit: 50,
    },
  });
  return res.data.data.data as Lp[];
};

const HomePage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { data: lps, refetch } = useQuery({
    queryKey: ["lps", order],
    queryFn: () => fetchLps(order),
  });

  useEffect(() => {
    refetch();
  }, [order]);

  const handleCardClick = (lpId: number) => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요한 서비스입니다! 로그인을 해주세요!")) {
        navigate("/login");
      }
      return;
    }
    navigate(`/lp/${lpId}`);
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">LP 목록</h1>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md"
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된 순</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {lps?.map((lp) => (
          <div
            key={lp.id}
            onClick={() => handleCardClick(lp.id)}
            className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-110"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-60 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
              <h2 className="text-lg font-bold mb-2">{lp.title}</h2>
              <p className="text-sm text-gray-300">
                {dayjs(lp.createdAt).locale("ko").format("YYYY.MM.DD")}
              </p>
              <p className="text-sm mt-1">❤️ {lp.likes.length}개</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
