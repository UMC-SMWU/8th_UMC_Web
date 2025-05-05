import { useEffect, useState } from "react";
import LpItem from "../components/LpItem";
import useGetInfiniteLps from "../hooks/queries/useGetInfiniteLps";
import { PAGINATION_ORDER } from "../types/common";
import SortButton from "../components/SortButton";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import LpItemSkeleton from "../components/LpItemSkeleton";
import { Plus } from "lucide-react";
import LpCreateModal from "../components/LpCreateModal.tsx";
import TextInput from "../components/TextInput.tsx";
import useDebounce from "../hooks/useDebounce.ts";
import { DEBOUNCE_SEARCH_DELAY } from "../constants/delay.ts";

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, DEBOUNCE_SEARCH_DELAY);
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.ASC);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    console.log("openModal");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useGetInfiniteLps(debouncedSearch, order, 10);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder);
  };

  const handleItemClick = (id: number) => {
    navigate(`/lp/${id}`);
  };

  const renderItems = () => {
    if (isLoading) {
      return Array.from({ length: 20 }).map((_, idx) => (
        <LpItemSkeleton key={`loading-skeleton-${idx}`} />
      ));
    }

    if (!data) {
      return null;
    }

    return data.pages.flatMap((page, pageIndex) =>
      page.data.data.map((lp) => (
        <LpItem
          key={`${lp.id}-${pageIndex}`}
          title={lp.title}
          thumbnail={lp.thumbnail}
          createdAt={lp.createdAt}
          likes={lp.likes.length}
          onClick={() => handleItemClick(lp.id)}
        />
      )),
    );
  };

  return (
    <div className="flex flex-col px-10">
      <div className={`flex justify-between items-center gap-4`}>
        <TextInput
          onChange={(e) => setSearch(e.target.value)}
          placeholder={"검색어를 입력하세요"}
          type={"text"}
          value={search}
          className={`flex-1`}
        />
        <button className={`text-white bg-pink-600 py-2 px-4 rounded-md`}>
          검색
        </button>
      </div>
      <div className="flex justify-end items-center mt-4 p-6">
        <SortButton
          text="오래된순"
          selected={order === PAGINATION_ORDER.ASC}
          onClick={() => handleOrderChange(PAGINATION_ORDER.ASC)}
          position="left"
        />
        <SortButton
          text="최신순"
          selected={order === PAGINATION_ORDER.DESC}
          onClick={() => handleOrderChange(PAGINATION_ORDER.DESC)}
          position="right"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-7 sm:grid-cols-5 xs:grid-cols-3 gap-4 text-2xl text-white">
        {renderItems()}
      </div>
      <button
        className="fixed bottom-10 right-10 bg-pink-600 text-white font-bold rounded-full p-4"
        onClick={openModal}
      >
        <Plus color="white" />
      </button>
      {isModalOpen && <LpCreateModal closeModal={closeModal} />};
      {/* sentinel */}
      <div ref={ref} className="h-10" />
    </div>
  );
}
