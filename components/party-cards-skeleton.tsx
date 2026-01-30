import { cn } from "@/lib/utils";

import { Skeleton } from "./ui/skeleton";

type Props = {
  className?: string;
  gridColumns?: number;
};

/**
 * Skeleton component for PartyCards.
 * Used during SSR and hydration to avoid Radix UI hydration mismatches.
 */
function PartyCardsSkeleton({ className, gridColumns = 4 }: Props) {
  // 5 large parties + 1 "show more" button
  const skeletonCount = 6;

  return (
    <section
      className={cn("grid w-full grid-cols-4 gap-2", className)}
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Skeleton key={index} className="aspect-square w-full rounded-md" />
      ))}
    </section>
  );
}

export default PartyCardsSkeleton;
