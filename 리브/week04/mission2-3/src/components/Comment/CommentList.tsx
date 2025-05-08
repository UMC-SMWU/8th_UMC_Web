import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteComments from "../../hooks/queries/useGetInfiniteComments";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";
import { Comment } from "../../types/comment";

const CommentList = ({ lpId, order }: { lpId: number; order: "asc" | "desc" }) => {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetInfiniteComments({ lpId, order });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <CommentSkeleton />;
  if (isError) return <div>댓글 불러오기 실패</div>;

  return (
    <div className="mt-6">
      {data?.pages.map((page) =>
        page.data.data.map((comment: Comment) => (
          <CommentItem key={comment.id} comment={comment} lpId={lpId} />
        ))
      )}
      {isFetchingNextPage && <CommentSkeleton />}
      <div ref={ref} className="h-8" />
    </div>
  );
};

export default CommentList;

