const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 items-start p-4 w-full animate-pulse">
      <div className="w-9 h-9 bg-gray-700 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="w-1/4 h-4 bg-gray-700 rounded" />
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-3/4 h-4 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
  