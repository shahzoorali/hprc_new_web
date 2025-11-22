export default function ProgrammeLoading() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Skeleton */}
      <div className="container pt-12 space-y-6">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-full max-w-2xl bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-2/3 max-w-xl bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-4 mt-8">
          <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <section className="container space-y-8">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Pricing Table Skeleton */}
        <div className="mt-12 space-y-4">
          <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6 space-y-4">
                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
