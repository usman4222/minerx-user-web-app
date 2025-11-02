import React from 'react';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function ShimmerCard({ className = '' }: { className?: string }) {
  return (
    <Card className={`p-6 ${className}`}>
      <Skeleton className="h-6 w-1/3 mb-4" />
      <Skeleton className="h-10 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </Card>
  );
}

export function ShimmerList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function ShimmerStats({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ShimmerCard key={i} />
      ))}
    </div>
  );
}
