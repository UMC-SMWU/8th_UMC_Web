import LpCommentSkeleton from "./LpCommentSkeleton";

interface LpCommentSkeletonListProps {
    count: number;
}

const LpCommentSkeletonList = ({ count } : LpCommentSkeletonListProps) => {
  return (
    <>
        {new Array(count).fill(0).map((_, idx) => (
            <LpCommentSkeleton key={idx} />
        ))}
    </>
  )
}

export default LpCommentSkeletonList;
