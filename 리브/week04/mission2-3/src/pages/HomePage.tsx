import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpModal from "../components/LpModal"; 
import { useUploadLp } from "../hooks/mutations/useUploadLp";
import { useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/useThrottle"; 

const convertOrderToApi = (order: "new" | "old"): PAGINATION_ORDER =>
  order === "new" ? PAGINATION_ORDER.DESC : PAGINATION_ORDER.ASC;

const HomePage = () => {
  const [order, setOrder] = useState<"new" | "old">("new");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); 

  const { mutate: uploadLp } = useUploadLp();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetInfiniteLpList({
    order: convertOrderToApi(order),
    search: debouncedSearchTerm, 
  });

  const { ref, inView } = useInView();

  useThrottle(() => {
    if (inView && hasNextPage) {
      console.log("🔥 fetchNextPage 실행");
      fetchNextPage();
    }
  }, 1000, [inView, hasNextPage]);

  if (isLoading) return <LpCardSkeletonList count={12} />;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="p-4">
      {/* LP 업로드 모달 */}
      <LpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={({ name, content, tags }) =>
          uploadLp({
            name,
            content,
            tags,
            thumbnail: "https://example.com/default.png",
          })
        }
      />

      {/* 🔍 검색창 */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="LP 제목을 검색하세요"
          className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        {/* 정렬 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("old")}
            className={`px-3 py-1 rounded ${order === "old" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("new")}
            className={`px-3 py-1 rounded ${order === "new" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* LP 카드 리스트 */}
      <div className="grid grid-cols-3 gap-4">
        {data?.pages.map((page) =>
          page.data.data.map((lp) => <LpCard key={lp.id} lp={lp} />)
        )}
        {isFetchingNextPage && <LpCardSkeletonList count={6} />}
      </div>

      {/* 무한스크롤 트리거 */}
      <div ref={ref} className="h-10" />

      {/* LP 추가 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-6 p-4 bg-pink-500 text-white text-3xl rounded-full shadow-lg hover:bg-pink-600 transition"
      >
        +
      </button>
    </div>
  );
};

export default HomePage;