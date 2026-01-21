import Link from "next/link";

import { BookMarkedIcon } from "lucide-react";

import { Button } from "../ui/button";

function HowToCard() {
  return (
    <div className="border-border flex flex-col overflow-hidden rounded-md border md:order-last md:col-span-2">
      <div className="flex flex-col p-4">
        <h2 className="font-bold">
          Comment fonctionne <span className="underline">chatvote</span> ?
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Découvrez ce que vous pouvez faire avec{" "}
          <span className="underline">chatvote</span> et quelles fonctionnalités
          vous pouvez utiliser.
        </p>
        <Button asChild variant="secondary">
          <Link href="/how-to">
            <BookMarkedIcon />
            Guide
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HowToCard;
