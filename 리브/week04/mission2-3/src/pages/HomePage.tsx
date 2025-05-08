import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpModal from "../components/LpModal"; 
import { useUploadLp } from "../hooks/mutations/useUploadLp";  


const convertOrderToApi = (order: "new" | "old"): PAGINATION_ORDER =>
  order === "new" ? PAGINATION_ORDER.DESC : PAGINATION_ORDER.ASC;

const HomePage = () => {
  const [order, setOrder] = useState<"new" | "old">("new");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <LpCardSkeletonList count={12} />;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="p-4">
      <LpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={({ name, content, tags }) =>
          uploadLp({
            name,
            content,
            tags,
            thumbnail: "https://example.com/default.png", // 나중에 이미지 업로드 API 생기면 수정
          })
        }
      />

      <div className="flex justify-end mb-4 gap-2">
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

      <div className="grid grid-cols-3 gap-4">
        {data?.pages.map((page) =>
          page.data.data.map((lp) => <LpCard key={lp.id} lp={lp} />)
        )}
        {isFetchingNextPage && <LpCardSkeletonList count={6} />}
      </div>

      {/* 스크롤 관찰용 div */}
      <div ref={ref} className="h-10" />

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

