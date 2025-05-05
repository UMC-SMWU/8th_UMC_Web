import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment"; 
import { ResponseCommentListDto } from "../../types/comment"; 

const useGetInfiniteComments = ({
  lpId,
  order,
}: {
  lpId: number;
  order: "asc" | "desc";
}) =>
  useInfiniteQuery<ResponseCommentListDto>({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam = null }) =>
      getComments({ lpId, cursor: pageParam as number | undefined, order }),
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
    initialPageParam: undefined,
  });

export default useGetInfiniteComments;









