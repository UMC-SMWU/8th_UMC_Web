import { useEffect, useState } from "react";

export default function useCustomFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "에러 발생");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}
