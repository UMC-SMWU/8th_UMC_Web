import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../apis/axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Tag {
  id: number;
  name: string;
}

interface LpDetail {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  tags: Tag[];
  likes: { id: number }[];
  authorName: string;
}

const LpDetailPage = () => {
  const { lpId } = useParams();
  const [lp, setLp] = useState<LpDetail | null>(null);

  useEffect(() => {
    const fetchLp = async () => {
      const res = await axiosInstance.get(`/v1/lps/${lpId}`);
      setLp(res.data.data);
    };
    fetchLp();
  }, [lpId]);

  if (!lp) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 flex justify-center">
      <div className="max-w-2xl w-full bg-zinc-900 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-300">{lp.authorName}</div>
          <div className="text-sm text-gray-500">{dayjs(lp.createdAt).locale("ko").fromNow()}</div>
        </div>

        <h1 className="text-2xl font-bold mb-4">{lp.title}</h1>

        <div className="w-full flex justify-center mb-6">
          <div className="w-80 h-80 rounded-full relative overflow-hidden animate-spin-slow">
            <img src={lp.thumbnail} alt="LP 커버" className="w-full h-full object-cover rounded-full border-8 border-black" />
          <div className="absolute top-1/2 left-1/2 w-18 h-18 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 shadow-md" style={{ backgroundColor: "rgb(220, 220, 220)" }} />
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 text-center max-w-xl mx-auto">{lp.content}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {lp.tags.map((tag) => (
            <span key={tag.id} className="bg-zinc-800 text-white text-xs px-3 py-1 rounded-full">
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="text-gray-400 hover:text-white">
            🖊 수정
          </button>
          <button className="text-gray-400 hover:text-white">
            🗑 삭제
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button className="text-pink-500">❤️ {lp.likes.length}</button>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
