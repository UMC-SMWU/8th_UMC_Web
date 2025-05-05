import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";


const convertOrderToApi = (order: "new" | "old"): PAGINATION_ORDER =>
  order === "new" ? PAGINATION_ORDER.DESC : PAGINATION_ORDER.ASC;

const HomePage = () => {
  const [order, setOrder] = useState<"new" | "old">("new");

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
    </div>
  );
};

export default HomePage;

