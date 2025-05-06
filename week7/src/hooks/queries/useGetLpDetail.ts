import { useQuery } from "@tanstack/react-query";
import { getLpById } from "../../api/LpService";
import {QUERY_KEY} from "../../constants/key.ts";

function useGetLpDetail(lpId: number) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpById(lpId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
}

export default useGetLpDetail;
