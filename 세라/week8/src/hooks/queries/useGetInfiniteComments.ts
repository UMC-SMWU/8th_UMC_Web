import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";
import { getComments } from "../../api/CommentService";

function useGetInfiniteComments(
  lpId: number,
  order: PAGINATION_ORDER,
  limit: number
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getComments({ lpId, cursor: pageParam, order, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext) {
        return lastPage.data.nextCursor;
      }
      return undefined;
    },
  });
}

export default useGetInfiniteComments;
