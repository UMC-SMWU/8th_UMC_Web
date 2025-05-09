const CommentSkeleton = () => {
  return (
    <div className="p-4 border rounded shadow-sm bg-white animate-pulse">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2" />
        <div className="w-24 h-4 bg-gray-300 rounded" />
      </div>
      <div className="w-full h-4 bg-gray-300 rounded mb-2" />
      <div className="w-2/3 h-4 bg-gray-300 rounded" />
    </div>
  );
};

export default CommentSkeleton;
