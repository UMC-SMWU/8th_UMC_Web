import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { data, isError, isLoading } = useGetLpList({
    search,
    order,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  };
  
  if (isError) {
    return <div>Error...</div>;
  };
  
  return (
    <div className="mx-5">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="flex justify-end mb-4">
        <div className="flex border border-gray-300 rounded overflow-hidden text-sm font-bold">
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
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 px-4">
        {data?.data.map((lp) => (
            <div 
              key={lp.id}
              className="relative w-full pb-[100%] rounded overflow-hidden group 
              hover:scale-120 transition-transform duration-300 hover:z-10"
              onClick={() => navigate(`/lp/${lp.id}`)}
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="absolute top-0 left-0 w-full h-full object-cover bg-gray-300"
              />

              <div 
                className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col 
                justify-end p-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <h3 className="text-white text-md font-bold">{lp.title}</h3>
                <div className="flex justify-between text-gray-300 text-sm w-full ">
                  <p>{lp.createdAt.split("T")[0]}</p>
                  <p className="flex items-center gap-1"> <IoMdHeart /> {lp.likes.length}</p>
                </div>
              </div>
            </div>
        ))}
      </div>
      
    </div>
  )
}

export default HomePage
