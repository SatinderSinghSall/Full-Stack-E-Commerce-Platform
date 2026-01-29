import React from "react";

const LatestCollectionSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-16">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Image Skeleton */}
          <div className="w-full aspect-square bg-gray-200 rounded-md"></div>

          {/* Text Skeleton */}
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestCollectionSkeleton;
