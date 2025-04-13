import { ResponseMyInfoDto } from "types/auth";
import { getMyInfo } from "../apis/auth";
import { useEffect, useState } from "react"; 


const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        }
        getData();
    }, []);
  return (
    <div>
      <h1>{data?.data?.name} {data?.data?.email}</h1>
    </div>
  );
}

export default MyPage;