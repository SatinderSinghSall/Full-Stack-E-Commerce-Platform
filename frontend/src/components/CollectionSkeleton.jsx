import React from "react";

const CollectionSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Image */}
          <div className="w-full aspect-square bg-gray-200 rounded-md"></div>

          {/* Text */}
          <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionSkeleton;
