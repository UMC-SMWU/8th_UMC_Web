import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { PaginationDto } from "../../types/common";
import { getMyLpList } from "../../apis/lp";

function useGetMyLpList({ cursor, search, order, limit}: PaginationDto){
    return useQuery({
        queryKey: [QUERY_KEY.lps, order],
        queryFn: () => getMyLpList({
            cursor,
            search,
            order,
            limit,
        }),

        select: (data) => data.data,
    })
};

export default useGetMyLpList;
