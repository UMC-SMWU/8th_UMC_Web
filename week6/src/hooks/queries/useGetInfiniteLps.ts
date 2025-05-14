import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../types/common";
import { getLps } from "../../api/LpService";

function useGetInfiniteLps(
  search: string,
  order: PAGINATION_ORDER,
  limit: number
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam = 0 }) =>
      getLps({ cursor: pageParam, search, order, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext) {
        return lastPage.data.nextCursor;
      }
      return undefined;
    },
  });
}

export default useGetInfiniteLps;
