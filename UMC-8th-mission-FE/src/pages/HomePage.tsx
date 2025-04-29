import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { data, isError, isLoading } = useGetLpList({
    search,
    order,
  });
  console.log(data?.data.map((lp) => lp.title));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error...</div>;
  }
  
  return (
    <div className="mx-5">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="flex justify-end mb-4">
        <div className="flex border border-gray-300 rounded overflow-hidden font-bold">
          <button
            className={`px-4 py-2 text-center w-30 ${
              order === PAGINATION_ORDER.asc
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
          >
            오래된 순
          </button>
          <button
            className={`px-4 py-2 text-center w-30 ${
              order === PAGINATION_ORDER.desc
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
          >
            최신순
          </button>
        </div>
      </div>
      <div>{data?.data.map((lp) => <h1>{lp.title}</h1>)}</div>
    </div>
  )
}

export default HomePage
