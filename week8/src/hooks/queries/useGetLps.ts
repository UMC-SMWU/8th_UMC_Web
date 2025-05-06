import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";
import { getLps } from "../../api/LpService";

function useGetLps({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search],
    queryFn: () => getLps({ cursor, search, order, limit }),
    staleTime: 1000 * 60 * 5, // 5분 - 5분동안 데이터가 변하지 않음
    gcTime: 1000 * 60 * 60, // 1시간 - 비활성화 된지 1시간이 지나면 데이터 삭제
  });
}

export default useGetLps;
