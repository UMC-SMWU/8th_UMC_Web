import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
    data: T | null;
    isPending: boolean;
    isError: boolean;
}

function useCustomFetch<T>(url: string): ApiResponse<T>{
    // 영화 목록은 배열, 상세는 객체체
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                const { data } = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
                    },
                });
                setData(data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, isPending, isError };
}

export default useCustomFetch;