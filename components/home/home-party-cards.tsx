"use client";

import { track } from "@vercel/analytics/react";

import PartyCards from "@/components/party-cards";
import PartyCardsSkeleton from "@/components/party-cards-skeleton";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";

export default function HomePartyCards() {
  const isMounted = useIsMounted();

  const handlePartyClick = (partyId: string) => {
    track("home_page_party_clicked", {
      party: partyId,
    });
  };

  // Render skeleton during SSR and hydration to avoid Radix UI hydration mismatch
  if (isMounted === false) {
    return <PartyCardsSkeleton className="mt-4" />;
  }

  return (
    <PartyCards
      className="mt-4"
      selectable={false}
      onSelectParty={handlePartyClick}
    />
  );
}
