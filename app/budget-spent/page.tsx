import Link from "next/link";

import { BadgeEuroIcon, HeartHandshakeIcon } from "lucide-react";

import DonationDialog from "@/components/donation-dialog";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";

function BudgetSpent() {
  return (
    <PageLayout>
      <section className="mx-auto flex h-full max-w-lg flex-col items-center justify-center space-y-4 p-4 text-center">
        <BadgeEuroIcon className="size-12" />
        <h1 className="text-2xl font-bold">Budget épuisé</h1>
        <p>
          Comme nous nous finançons exclusivement par des dons, il peut arriver
          que notre budget soit épuisé.
        </p>
        <p>Si vous souhaitez nous soutenir, vous pouvez faire un don.</p>
        <div className="flex justify-center gap-2">
          <DonationDialog>
            <Button>
              <HeartHandshakeIcon />
              Soutenez-nous
            </Button>
          </DonationDialog>
          <Button variant="outline" asChild>
            <Link href="/about-us">À propos</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}

export default BudgetSpent;
