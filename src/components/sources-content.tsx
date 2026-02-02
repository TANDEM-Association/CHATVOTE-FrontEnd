"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AccordionGroup, AccordionItem } from "@components/ui/accordion";
import { ASSISTANT_ID } from "@lib/constants";
import { type SourceDocument } from "@lib/firebase/firebase.types";
import { type PartyDetails } from "@lib/party-details";
import { buildPartyImageUrl } from "@lib/utils";

type Props = {
  sources: SourceDocument[];
  parties: PartyDetails[];
};

const SourcesContent = ({ sources, parties }: Props) => {
  const t = useTranslations("sources");

  const sourcesByPartyId = sources.reduce(
    (acc, source) => {
      acc[source.party_id] = acc[source.party_id] || [];
      acc[source.party_id].push(source);
      return acc;
    },
    {} as Record<string, SourceDocument[]>,
  );

  return (
    <article>
      <h1 className="mt-4 text-xl font-bold md:text-2xl">
        {t("title")} <span className="underline">chatvote</span>
      </h1>
      <p className="text-muted-foreground mb-2 text-sm">{t("description")}</p>
      <AccordionGroup>
        {Object.entries(sourcesByPartyId).map(([partyId, partySources]) => {
          const party =
            partyId === ASSISTANT_ID
              ? undefined
              : parties.find((p) => p.party_id === partyId);

          const name = party?.name ?? "chatvote";

          return (
            <AccordionItem title={name} key={partyId}>
              <div>
                <div className="flex items-center gap-4">
                  {partyId === ASSISTANT_ID ? (
                    <div className="border-border aspect-square size-8 rounded-full border object-contain p-1">
                      <Image
                        src="/images/logos/chatvote.svg"
                        alt="chatvote"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="size-full"
                      />
                    </div>
                  ) : (
                    <Image
                      src={buildPartyImageUrl(partyId)}
                      alt={name}
                      width={32}
                      height={32}
                      className="aspect-square rounded-full object-contain p-1"
                      style={{ backgroundColor: party?.background_color }}
                    />
                  )}
                  <h2 className="font-bold">{name}</h2>
                </div>
              </div>
              <div>
                <ul className="list-inside list-disc">
                  {partySources.map((source) => {
                    return (
                      <li key={source.id}>
                        <Link
                          href={source.storage_url}
                          target="_blank"
                          className="underline"
                        >
                          {source.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AccordionItem>
          );
        })}
      </AccordionGroup>
    </article>
  );
};

export default SourcesContent;
