import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import { getLpCommentList } from "../../apis/comment";

function useGetInfiniteComments(
    lpId: number,
    limit: number,
    order: PAGINATION_ORDER,
) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.lpId, order],
        queryFn: ({ pageParam = 0 }) => getLpCommentList(
            lpId,
            { cursor: pageParam, limit, order }
        ),
        // initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.hasNext) {
                return lastPage.data.nextCursor;
            }
            return undefined;
        },
    });
}

export default useGetInfiniteComments;
