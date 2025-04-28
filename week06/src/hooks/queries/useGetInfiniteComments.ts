import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

const fetchComments = async ({
  lpId,
  cursor,
  limit,
  order,
}: {
  lpId: number;
  cursor: number;
  limit: number;
  order: "asc" | "desc";
}) => {
  const res = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      limit,
      order,
    },
  });
  return res.data.data;
};

function useGetInfiniteComments(lpId: number | undefined, order: "asc" | "desc") {
  return useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam = 0 }) => {
      if (lpId === undefined) {
        throw new Error("lpId is undefined");
      }
      return fetchComments({ lpId, cursor: pageParam, limit: 10, order });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    enabled: lpId !== undefined,  // lpId 있을 때만 요청
  });
}

export default useGetInfiniteComments;