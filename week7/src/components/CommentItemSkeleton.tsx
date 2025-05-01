export default function CommentItemSkeleton() {
  return (
    <div className="flex justify-between gap-2 py-2 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gray-300" />
      <div className="flex-col flex-1 space-y-2">
        <div className="w-1/3 h-4 bg-gray-300 rounded" />
        <div className="w-full h-4 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
