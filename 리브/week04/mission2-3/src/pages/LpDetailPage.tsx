import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { ResponseLpDetailDto } from "../types/lp";
import { timeAgo } from "../utils/timeAgo";
import { Pencil, Trash2 } from "lucide-react";

const LpDetailPage = () => {
  const { LPid } = useParams();

  const { data: response, isLoading, isError } = useQuery<ResponseLpDetailDto>({
    queryKey: ["lp", LPid],
    queryFn: () => getLpDetail(Number(LPid)),
    enabled: !!LPid,
  });

  if (isLoading)
    return <div className="text-white text-center mt-20">로딩 중...</div>;
  if (isError || !response?.data)
    return <div className="text-white text-center mt-20">LP 정보를 불러오지 못했습니다.</div>;

  const lp = response.data;

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center pt-24 px-4">
      <div className="bg-[#1e1e1e] rounded-2xl p-6 w-full max-w-xl shadow-xl relative">
        {/* 작성자 + 수정 삭제 */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">
              {lp.author.name.charAt(0)}
            </div>
            <span className="font-semibold text-sm">{lp.author.name}</span>
          </div>
          <div className="flex gap-2 text-gray-400">
            <button><Pencil size={18} /></button>
            <button><Trash2 size={18} /></button>
          </div>
        </div>

        {/* 시간 */}
        <p className="text-right text-xs text-gray-500 mb-1">{timeAgo(lp.createdAt)}</p>

        {/* 제목 */}
        <h1 className="text-xl font-bold text-white mb-6 text-center">{lp.title}</h1>

        {/* LP 이미지 디스크 */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-64 rounded-full overflow-hidden relative border-8 border-black">
            {/* 애니메이션은 이미지에 적용 */}
            <img
              src={lp.thumbnail}
              alt="LP 디스크"
              className="w-full h-full object-cover rounded-full animate-spin-slow"
            />
            <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 설명 */}
        <p className="text-sm text-gray-300 leading-relaxed text-center mb-6 px-4 whitespace-pre-wrap">
          {lp.content}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {lp.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#2f2f2f] px-3 py-1 rounded-full text-sm text-white"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 */}
        <div className="flex justify-center">
          <button className="text-pink-400 text-lg">❤️ {lp.likes.length}</button>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;



