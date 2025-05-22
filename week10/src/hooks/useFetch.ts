import type { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient.ts";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(url, {
          ...options,
        });
        setData(data);
      } catch {
        setError("데이터를 가져오는 데 에러가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
