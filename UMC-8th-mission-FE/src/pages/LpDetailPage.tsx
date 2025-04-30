import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { IoMdHeart } from "react-icons/io";

const LpDetailPage = () => {
    const { lpId } = useParams();
    const { data, isError, isLoading } = useGetLpDetail(Number(lpId));
    
    if (isLoading) {
      return <div>Loading...</div>;
    };
    
    if (isError) {
      return <div>Error...</div>;
    };
    
    console.log('data:', data);

    return (
      <div className="p-5 flex flex-col items-center text-white min-h-screen ">
        <h1 className="text-3xl font-bold mb-4">{data.data.title}</h1>
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700 animate-spin-slow">
          <img
            src={data.data.thumbnail}
            alt={data.data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
  
        <p className="text-center text-gray-300 mt-6 px-4">{data.data.content}</p>
  
        <div className="flex flex-wrap gap-2 mt-4">
          {data.data.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
  
        <div className="flex items-center gap-2 mt-6">
          <span className="text-pink-500 text-2xl"><IoMdHeart /></span>
          <span className="text-gray-300 text-lg">{data.data.likes.length}</span>
        </div>
      </div>
    );
}

export default LpDetailPage
