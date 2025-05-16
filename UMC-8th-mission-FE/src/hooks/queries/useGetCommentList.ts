import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpCommentList } from "../../apis/comment";
import { PaginationDto } from "../../types/common";

function useGetLpComment(lpId: number, { cursor, limit, order } : PaginationDto) {
    return useQuery({
        queryKey: [ QUERY_KEY.lpId, order ],
        queryFn: () => getLpCommentList(
            lpId,
            { cursor, limit, order }        
        ),
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes

        select: (data) => data.data,
    });
};

export default useGetLpComment;
