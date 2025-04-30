import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";

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
        <div className="p-5">
          <h1 className="text-2xl font-bold">LP Detail Page</h1>
          <p className="text-lg">TITLE: {data.data.title}</p>
        </div>
      );
}

export default LpDetailPage
