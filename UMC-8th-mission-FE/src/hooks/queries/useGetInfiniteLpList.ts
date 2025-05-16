import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
    limit: number, 
    search: string, 
    order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: ({pageParam = 0}) => 
            getLpList({cursor: pageParam, limit, search, order}),
        // initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            console.log(lastPage);
            if (lastPage.data.hasNext) {
                return lastPage.data.nextCursor;
            }
            return undefined;
        },
    });
}

export default useGetInfiniteLpList;
