"use client";

import Image from "next/image";

import { SparklesIcon } from "lucide-react";

import { useParty } from "@/components/providers/parties-provider";
import { ASSISTANT_ID } from "@/lib/constants";
import { type PartyDetails } from "@/lib/party-details";
import { cn } from "@/lib/utils";

type Props = {
  partyId?: string;
  party?: PartyDetails;
};

export function ChatMessageIcon({ partyId, party }: Props) {
  const clientParty = useParty(partyId ?? "");

  const normalizedParty = clientParty ?? party;

  return (
    <div
      className={cn(
        "ring-border relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-neutral-400",
        party && "dark:bg-slate-200",
      )}
    >
      {normalizedParty ? (
        <Image
          src={normalizedParty.logo_url}
          alt={normalizedParty.name}
          sizes="100vw"
          width={0}
          height={0}
          className="size-full object-contain p-1"
        />
      ) : partyId === ASSISTANT_ID ? (
        <Image
          src="/images/logos/chatvote.svg"
          alt="chatvote"
          width={0}
          height={0}
          sizes="100vw"
          className="size-8 p-2"
        />
      ) : (
        <SparklesIcon className="size-4" />
      )}
    </div>
  );
}
