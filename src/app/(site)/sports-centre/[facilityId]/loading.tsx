export default function FacilityLoading() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Skeleton */}
      <div className="container pt-12 space-y-6">
        <div className="h-4 w-32 bg-gray-200 animate-pulse"></div>
        <div className="h-12 w-3/4 bg-gray-200 animate-pulse"></div>
        <div className="h-6 w-full max-w-2xl bg-gray-200 animate-pulse"></div>
        <div className="h-6 w-2/3 max-w-xl bg-gray-200 animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <section className="container space-y-8">
        {/* Image and Description Skeleton */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="h-80 bg-gray-200 animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 w-1/2 bg-gray-200 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="space-y-6 mt-12">
          <div className="h-6 w-1/4 bg-gray-200 animate-pulse"></div>
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-5 w-5 bg-gray-200 animate-pulse flex-shrink-0"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
