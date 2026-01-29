import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-20 border-t-2 pt-10 animate-pulse">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Images Skeleton */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 sm:w-[18.7%] w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[24%] sm:w-full aspect-square bg-gray-200 rounded"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%] aspect-square bg-gray-200 rounded" />
        </div>

        {/* Product Info Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-200 rounded w-1/4" />

          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>

          <div className="h-10 bg-gray-200 rounded w-40 mt-6" />

          <div className="mt-8 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
