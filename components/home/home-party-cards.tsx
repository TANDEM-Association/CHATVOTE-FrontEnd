"use client";

import { track } from "@vercel/analytics/react";

import PartyCards from "@/components/party-cards";

export default function HomePartyCards() {
  const handlePartyClick = (partyId: string) => {
    track("home_page_party_clicked", {
      party: partyId,
    });
  };

  return (
    <PartyCards
      className="mt-4"
      selectable={false}
      onPartyClicked={handlePartyClick}
    />
  );
}
