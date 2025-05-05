import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard"; // ✅ 추가

const convertOrderToApi = (order: "new" | "old"): PAGINATION_ORDER =>
  order === "new" ? PAGINATION_ORDER.DESC : PAGINATION_ORDER.ASC;

const HomePage = () => {
  const [order, setOrder] = useState<"new" | "old">("new");

  const { data, isPending, isError } = useGetLpList({
    cursor: undefined,
    search: "",
    order: convertOrderToApi(order),
    limit: 30,
  });

  if (isPending) return <div>로딩 중...</div>;
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
        {data?.data.data.map((lp) => (
          <LpCard key={lp.id} lp={lp} /> // ✅ 기존 코드 삭제하고 이걸로 바꿈
        ))}
      </div>
    </div>
  );
};

export default HomePage;

