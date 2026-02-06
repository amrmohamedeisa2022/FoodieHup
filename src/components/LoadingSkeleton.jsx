import React from "react";

export default function LoadingSkeleton({ count=3 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({length: count}).map((_,i) => (
        <div key={i} className="bg-dark-elev rounded-lg p-4 animate-pulse">
          <div className="h-44 bg-[#222] rounded mb-4"></div>
          <div className="h-4 bg-[#222] rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-[#222] rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
}
