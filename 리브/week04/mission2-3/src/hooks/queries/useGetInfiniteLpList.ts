import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { ResponseLpListDto } from "../../types/lp";
import { PAGINATION_ORDER } from "../../enums/common";

const useGetInfiniteLpList = ({ order }: { order: PAGINATION_ORDER }) =>
  useInfiniteQuery<ResponseLpListDto>({
    queryKey: ["lps", order],
    queryFn: ({ pageParam = undefined }) =>
      getLpList({ order, cursor: pageParam as number | undefined }),
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
    initialPageParam: undefined,
  });

export default useGetInfiniteLpList;











