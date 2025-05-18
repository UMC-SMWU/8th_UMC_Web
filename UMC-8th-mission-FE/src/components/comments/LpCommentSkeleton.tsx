const LpCommentSkeleton = () => {
    return (
      <div className="flex gap-4 p-4 border-b border-gray-700 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="w-1/4 h-4 bg-gray-700 rounded"></div>
          <div className="w-full h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default LpCommentSkeleton;
