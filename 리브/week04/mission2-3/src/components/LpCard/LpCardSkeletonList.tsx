import LpCardSkeleton from "./LpCardSkeleton";

const LpCardSkeletonList = ({ count = 9 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;
