export default function LpItemSkeleton() {
  return (
    <div className="relative rounded-lg overflow-hidden animate-pulse bg-gray-300">
      <div className="w-full h-48 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
      <div className="absolute bottom-4 left-4 right-4 h-6 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
    </div>
  );
}
