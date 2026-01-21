import Link from "next/link";

import { HeartHandshakeIcon, UsersRoundIcon } from "lucide-react";

import DonationDialog from "@/components/donation-dialog";
import { Button } from "@/components/ui/button";

function SupportUsCard() {
  return (
    <div className="border-border flex flex-col overflow-hidden rounded-md border">
      <div className="flex flex-col p-4">
        <h2 className="font-bold">Repenser l&lsquo;éducation politique</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Aidez-nous à couvrir les coûts de fonctionnement de l&lsquo;IA !
        </p>
        <div className="flex w-full flex-row gap-2 [&_button]:w-full">
          <DonationDialog>
            <Button>
              <HeartHandshakeIcon /> Faire un don
            </Button>
          </DonationDialog>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/about-us">
              <UsersRoundIcon />À propos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SupportUsCard;
