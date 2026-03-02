export default function ProspectCardSkeleton() {
  return (
    <div className="gradient-border rounded-3xl overflow-hidden">
      <div className="p-8 space-y-6">
        <div className="w-3/4 h-9 bg-gray-800 rounded-lg animate-pulse" />
        <div className="space-y-3">
          <div className="w-full h-4 bg-gray-800 rounded animate-pulse" />
          <div className="w-full h-4 bg-gray-800 rounded animate-pulse" />
          <div className="w-2/3 h-4 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}