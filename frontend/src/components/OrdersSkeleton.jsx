import React from "react";

const OrdersSkeleton = ({ count = 2 }) => {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border rounded-md p-5 space-y-4">
          {Array.from({ length: 2 }).map((__, j) => (
            <div key={j} className="flex gap-5 border-b pb-4 last:border-none">
              <div className="w-20 h-20 bg-gray-200 rounded" />

              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>

              <div className="space-y-2 text-right">
                <div className="h-3 bg-gray-200 rounded w-20 ml-auto" />
                <div className="h-3 bg-gray-200 rounded w-16 ml-auto" />
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-8 bg-gray-200 rounded w-28" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSkeleton;
