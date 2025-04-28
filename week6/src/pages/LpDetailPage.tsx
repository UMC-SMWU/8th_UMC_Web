import { useParams } from "react-router-dom";
import { Heart, Pencil, Trash2 } from "lucide-react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import formatDate from "../utils/formatDate";

export default function LpDetailPage() {
  const lpId = Number(useParams().lpId);
  const { data } = useGetLpDetail(lpId);
  console.log(data?.data);

  return (
    <>
      <div
        className="flex-col justify-center items-center text-gray-300 py-10 px-30 gap-4 bg-[#3e3f4355] mx-auto max-w-4xl mt-10
      rounded-3xl"
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={data?.data.author.avatar}
              alt="프로필 이미지"
              className="size-8 rounded-full bg-white "
            />
            <h1 className="text-xl font-bold">{data?.data?.author.name}</h1>
          </div>
          <span>
            {data?.data.createdAt ? formatDate(data.data.createdAt) : ""}
          </span>
        </div>
        <div className="flex items-center justify-between mt-6">
          <span className="text-2xl">{data?.data?.title}</span>
          <div className="flex items-center gap-2">
            <Pencil color="#BDBDBD" size={20} />
            <Trash2 color="#BDBDBD" size={20} />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="relative inline-flex justify-center items-center p-4 shadow-md shadow-black rounded-xl">
            <div className="absolute size-20 bg-white rounded-full z-10 border-2 border-gray-600" />
            <img
              src={data?.data?.thumbnail}
              alt="Thumbnail"
              className="w-80 h-80 object-cover rounded-full border-4 border-black animate-spin"
            />
          </div>
        </div>
        <div className="text-sm mt-6">{data?.data?.content}</div>
        <ul className="flex justify-center items-center gap-2 mt-10">
          {data?.data?.tags.map((tag) => (
            <li
              key={tag.id}
              className="text-gray-200 text-sm bg-gray-700 rounded-xl px-3 py-0.5"
            >
              #{tag.name}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 justify-center mt-8">
          <Heart color="white" />
          <span>{data?.data?.likes.length}</span>
        </div>
      </div>
    </>
  );
}
