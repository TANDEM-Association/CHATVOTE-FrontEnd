import { cn } from "@/lib/utils";

type Props = {
  partyCount: number;
  className?: string;
  gridColumns?: number;
};

function LoadingPartyCards({ partyCount, className, gridColumns }: Props) {
  return (
    <section
      className={cn("grid w-full gap-2", className)}
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: partyCount }).map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className={cn(
            "flex aspect-square items-center justify-center rounded-md transition-all",
            "border-muted-foreground/20 h-fit w-full overflow-hidden border bg-zinc-200 p-6 dark:bg-zinc-700",
            "animate-pulse",
          )}
        />
      ))}
    </section>
  );
}

export default LoadingPartyCards;
