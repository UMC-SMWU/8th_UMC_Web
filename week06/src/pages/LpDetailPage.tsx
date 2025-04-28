import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../apis/axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import CommentSkeleton from "../components/CommentSkeleton";

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
  const params = useParams();
  const lpId = params.lpId ? Number(params.lpId) : undefined;
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [lp, setLp] = useState<LpDetail | null>(null);

  // lpId 먼저 체크
  if (lpId === undefined) {
    return (
      <div className="text-white text-center mt-20">잘못된 접근입니다.</div>
    );
  }

  // useGetInfiniteComments 항상 호출
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteComments(lpId, order);

  // LP 상세정보
  useEffect(() => {
    const fetchLp = async () => {
      try {
        const res = await axiosInstance.get(`/v1/lps/${lpId}`);
        setLp(res.data.data);
      } catch (error) {
        console.error("LP 상세 정보 가져오기 실패:", error);
      }
    };
    fetchLp();
  }, [lpId]);

  // observer 무한스크롤
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!lp) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 flex justify-center">
      <div className="max-w-2xl w-full bg-zinc-900 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-300">{lp.authorName}</div>
          <div className="text-sm text-gray-500">
            {dayjs(lp.createdAt).locale("ko").fromNow()}
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">{lp.title}</h1>
        <div className="w-full flex justify-center mb-6">
          <div className="w-80 h-80 rounded-full relative overflow-hidden animate-spin-slow">
            <img
              src={lp.thumbnail}
              alt="LP 커버"
              className="w-full h-full object-cover rounded-full border-8 border-black"
            />
            <div
              className="absolute top-1/2 left-1/2 w-18 h-18 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 shadow-md"
              style={{ backgroundColor: "rgb(220, 220, 220)" }}
            />
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 text-center max-w-xl mx-auto">
          {lp.content}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-zinc-800 text-white text-xs px-3 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="text-gray-400 hover:text-white">🖊 수정</button>
          <button className="text-gray-400 hover:text-white">🗑 삭제</button>
        </div>

        <div className="flex justify-center mt-6">
          <button className="text-pink-500">❤️ {lp.likes.length}</button>
        </div>

        {/* 댓글 작성란 */}
        <div className="mt-8 p-4 border rounded bg-gray-300">
          <textarea
            className="w-full p-2 rounded resize-none text-gray-600"
            rows={2}
            placeholder="댓글을 입력하세요..."
          />
          <button
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded"
            disabled
          >
            작성
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className="flex justify-end mt-4 mb-4">
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="asc">오래된 순</option>
            <option value="desc">최신 순</option>
          </select>
        </div>

        <div className="space-y-4">
          {!data && isFetching
            ? Array.from({ length: 5 }).map((_, index) => (
                <CommentSkeleton key={index} />
              ))
            : data?.pages.flatMap((page) =>
                page.data.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="p-4 border rounded shadow-sm bg-gray-300 text-black"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-400 mr-2" />
                      <span className="font-semibold">
                        {comment.author.name}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
        </div>

        {/* 무한스크롤 */}
        <div ref={observerRef} className="h-10" />
      </div>
    </div>
  );
};

export default LpDetailPage;
