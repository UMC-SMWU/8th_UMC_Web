import { useQuery } from "@tanstack/react-query";
import { getLpById } from "../../api/LpService";

function useGetLpDetail(lpId: number) {
  return useQuery({
    queryKey: ["lps", lpId],
    queryFn: () => getLpById(lpId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
}

export default useGetLpDetail;
