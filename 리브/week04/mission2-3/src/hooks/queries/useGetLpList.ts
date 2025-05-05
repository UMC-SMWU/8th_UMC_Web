// import { QUERY_KEY } from "../../constants/key.ts";
import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";

const useGetLpList = ({ cursor, search, order, limit }: PaginationDto) => {
  return useQuery({
    queryKey: ["lps", order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10,   // 10분
  });
};

export default useGetLpList;

 