import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lpdetail";
import { QUERY_KEY } from "../../constants/key";

function useGetLpDetail(lpId: number) {
    return useQuery({
        queryKey: [ QUERY_KEY.lpId, lpId ],
        queryFn: () => getLpDetail(lpId),
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes

        select: (data) => data,
    });
};

export default useGetLpDetail;
