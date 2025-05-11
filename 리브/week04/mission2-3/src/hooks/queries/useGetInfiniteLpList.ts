import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { ResponseLpListDto } from "../../types/lp";
import { PAGINATION_ORDER } from "../../enums/common";

interface UseGetInfiniteLpListProps {
  order: PAGINATION_ORDER;
  search?: string;
}

const useGetInfiniteLpList = ({ order, search }: UseGetInfiniteLpListProps) =>
  useInfiniteQuery<ResponseLpListDto>({
    queryKey: ["lps", order, search], 
    queryFn: ({ pageParam = undefined }) =>
      getLpList({ order, search, cursor: pageParam as number | undefined }), // search 포함
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
    initialPageParam: undefined,
  });

export default useGetInfiniteLpList;












