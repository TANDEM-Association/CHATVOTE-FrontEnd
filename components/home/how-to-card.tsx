import Link from "next/link";

import { BookMarkedIcon } from "lucide-react";

function HowToCard() {
  return (
    <div className="border-border flex flex-col overflow-hidden rounded-md border md:order-last md:col-span-2">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-bold">
          Comment fonctionne <span className="underline">chatvote</span> ?
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          <span>Découvrez ce que vous pouvez faire avec</span>{" "}
          <span className="text-bold">Chatvote</span>{" "}
          <span>et quelles fonctionnalités vous pouvez utiliser.</span>
        </p>
        <Link
          href="/how-to"
          className="mx-auto flex h-10 w-30 flex-row items-center justify-center gap-2 rounded-md border border-neutral-950 p-2 dark:border-neutral-100"
        >
          <BookMarkedIcon className="size-4" strokeWidth={1} />
          <span>Guide</span>
        </Link>
      </div>
    </div>
  );
}

export default HowToCard;
