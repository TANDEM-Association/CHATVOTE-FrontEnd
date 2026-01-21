"use client";
import { createContext, useContext, useMemo, useRef } from "react";

import { type PartyDetails } from "@/lib/party-details";

type PartiesContextType = {
  parties?: PartyDetails[];
  partyCount: number;
};

export const PartiesContext = createContext<PartiesContextType | undefined>(
  undefined,
);

export type Props = {
  children: React.ReactNode;
  parties: PartyDetails[];
};

export const useParties = (partyIds?: string[]) => {
  const context = useContext(PartiesContext);
  if (!context) {
    throw new Error("useParties must be used within a PartiesProvider");
  }

  const parties = useMemo(() => {
    if (partyIds) {
      return context.parties?.filter((p) => partyIds.includes(p.party_id));
    }
    return context.parties;
  }, [context.parties, partyIds]);

  return parties;
};

export const useParty = (partyId: string) => {
  const parties = useParties([partyId]);

  if (!parties) {
    return undefined;
  }

  return parties[0];
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const PartiesProvider = ({ children, parties }: Props) => {
  const randomizedPartiesRef = useRef<PartyDetails[] | null>(null);
  const prevPartiesRef = useRef<PartyDetails[] | null>(null);

  // Compute randomized parties when parties prop changes (ref-based to avoid render issues)
  if (prevPartiesRef.current !== parties) {
    prevPartiesRef.current = parties;
    randomizedPartiesRef.current = shuffleArray(parties);
  }

  return (
    <PartiesContext.Provider
      value={{
        parties: randomizedPartiesRef.current ?? undefined,
        partyCount: parties?.length,
      }}
    >
      {children}
    </PartiesContext.Provider>
  );
};
