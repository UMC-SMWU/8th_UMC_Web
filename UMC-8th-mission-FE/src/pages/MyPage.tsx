import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { IoPerson } from "react-icons/io5";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto>();
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);
            setData(response);
        };
        getData();
    },[]);

    return (
        <>
            <div className="flex items-center justify-center w-40 h-40 rounded-full bg-[#aed3fd] m-4">
                {data?.data.avatar ? (
                    <img
                        src={data.data.avatar}
                        alt="프로필 이미지"
                        className="w-40 h-40 rounded-full"
                    />
                ) : (
                    <IoPerson className="text-white text-7xl" />
                )}
            </div>
            <div>{data?.data.name}</div>
            <div>{data?.data.email}</div>
        </>
    )
}

export default MyPage
