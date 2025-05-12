import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import "dayjs/locale/ko";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCardSkeleton from "../components/LpCard/LpCardSkeleton";
import NewLpForm from "./NewLpForm";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteLpList(
      50,
      debouncedValue,
      order === "asc" ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc
    );

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

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
      <div className="flex justify-between items-center mb-15">
        <div className="flex justify-center w-full mt-20">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-6 h-6" />
            <input
              className="w-full bg-transparent border-b border-white pl-12 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none"
              placeholder="검색어를 입력하세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md mt-25"
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된 순</option>
        </select>
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-10 bg-pink-500 text-white w-12 h-12 rounded-full shadow-lg text-2xl z-50"
        >
          +
        </button>
        {isModalOpen && <NewLpForm onClose={() => setIsModalOpen(false)} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {!data && isFetching ? (
          <LpCardSkeletonList />
        ) : (
          <>
            {data?.pages.flatMap((page) =>
              page.data.data.map((lp: any) => (
                <LpCard key={lp.id} lp={lp} onClick={handleCardClick} />
              ))
            )}
            {isFetchingNextPage &&
              Array.from({ length: 5 }).map((_, index) => (
                <LpCardSkeleton key={`skeleton-${index}`} />
              ))}
          </>
        )}
      </div>
      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && (
        <p className="text-center mt-4">Loading more...</p>
      )}
    </div>
  );
};

export default SearchPage;
