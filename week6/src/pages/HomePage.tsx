import { useEffect, useState } from "react";
import LpItem from "../components/LpItem";
import useGetLps from "../hooks/queries/useGetLps";
import { PAGINATION_ORDER } from "../types/common";
import SortButton from "../components/\bSortButton";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.ASC);
  const { data, refetch } = useGetLps({ order: order });
  console.log(data);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder);
  };

  const handleItemClick = (id: number) => {
    console.log("Item clicked with ID:", id);
    navigate(`/lp/${id}`);
  };

  return (
    <div className="flex flex-col px-10">
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
        {data?.data.data.map((lp) => (
          <LpItem
            key={lp.id}
            title={lp.title}
            thumbnail={lp.thumbnail}
            createdAt={lp.createdAt}
            likes={lp.likes.length}
            onClick={() => handleItemClick(lp.id)}
          />
        ))}
      </div>
    </div>
  );
}
