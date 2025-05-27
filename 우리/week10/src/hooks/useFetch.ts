import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isloading, setISLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setISLoading(true);
            try {
                const { data } = await axiosClient.get(url, {
                    ...options
                });

                setData(data);
            } catch  {
                setError("데이터를 가져오는 중 에러 발생");
            } finally {
                setISLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return {
        data,
        error,
        isloading,
    }
};

export default useFetch;
