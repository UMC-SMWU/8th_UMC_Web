import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DELAY } from "../constants/delay";

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DELAY);
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  // const { data, isError, isLoading } = useGetLpList({
  //   search,
  //   order,
  // });

  const {data: lps, isFetching, hasNextPage, isLoading, fetchNextPage, isError} = 
    useGetInfiniteLpList(3, debouncedValue, order);

  // ref  특정 html 요소 감시 가능
  const {ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if(inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const { getItem } = useLocalStorage("accessToken");
  const isAuthenticated = !!getItem();

  const handleCardClick = (lpId: number) => {
    if (!isAuthenticated) {
      window.alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!!")
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      navigate(`/lp/${lpId}`);
    }
  };

  if (isError) {
    return <div>Error...</div>;
  };
  
  return (
    <div className="mx-5">
      <input 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="검색어를 입력하세요"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <div className="flex justify-end mb-4">
        <div className="flex border border-gray-300 rounded overflow-hidden text-sm font-bold">
        <button
            className={`px-4 py-2 text-center w-30 ${
              order === PAGINATION_ORDER.asc
              ? "bg-white text-black"
              : "bg-black text-white"
            }`}
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
          >
            오래된 순
          </button>
          <button
            className={`px-4 py-2 text-center w-30 ${
              order === PAGINATION_ORDER.asc
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
          >
            최신순
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2 px-4">
        {isLoading && <LpCardSkeletonList count={10} />}
        {lps?.pages?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} onClick={handleCardClick} />
        ))}
        {/* {isFetching && <LpCardSkeletonList count={20} />} */}
        <div ref={ref}>{isFetching && <LpCardSkeletonList count={5} />}</div>
      </div>
    </div>
  )
}

export default HomePage
