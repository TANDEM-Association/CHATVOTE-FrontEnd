import DonationDialog from '@/components/donation-dialog';
import { Button } from '@/components/ui/button';
import { BadgeEuroIcon, HeartHandshakeIcon } from 'lucide-react';
import Link from 'next/link';

function BudgetSpent() {
  return (
    <section className="max-w-lg mx-auto flex flex-col items-center p-4 space-y-4 h-full justify-center text-center">
      <BadgeEuroIcon className="size-12" />
      <h1 className="text-2xl font-bold">Budget aufgebraucht</h1>
      <p>
        Da wir uns ausschließlich mit Spenden finanzieren, kann es dazu kommen,
        dass unser budget aufgebraucht ist.
      </p>
      <p>Wenn du uns unterstützen möchtest, kannst du uns gerne spenden.</p>
      <div className="flex justify-center gap-2">
        <DonationDialog>
          <Button>
            <HeartHandshakeIcon />
            Unterstütze uns
          </Button>
        </DonationDialog>
        <Button variant="outline" asChild>
          <Link href="/about-us">Über uns</Link>
        </Button>
      </div>
    </section>
  );
}

export default BudgetSpent;
