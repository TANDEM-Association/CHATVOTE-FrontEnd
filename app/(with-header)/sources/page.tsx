import Image from "next/image";
import Link from "next/link";

import Logo from "@/components/chat/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CHATVOTE_PARTY_ID } from "@/lib/constants";
import { type SourceDocument } from "@/lib/firebase/firebase.types";
import { getParties, getSourceDocuments } from "@/lib/firebase/firebase-server";
import { buildPartyImageUrl } from "@/lib/utils";

async function SourcesPage() {
  const sources = await getSourceDocuments();
  const parties = await getParties();

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
        Sources utilisées par <span className="underline">chatvote</span>
      </h1>
      <p className="text-muted-foreground mb-2 text-sm">
        Notre IA utilise ces sources pour les réponses générales. Pour
        contextualiser les positions, nous utilisons Perplexity.ai qui
        s&lsquo;appuie sur des informations actuelles d&lsquo;Internet.
      </p>
      <Accordion type="single" collapsible asChild>
        <section>
          {Object.entries(sourcesByPartyId).map(([partyId, sources]) => {
            const party =
              partyId === CHATVOTE_PARTY_ID
                ? undefined
                : parties.find((party) => party.party_id === partyId);

            const name = party?.name ?? "chatvote";

            return (
              <AccordionItem value={partyId} key={partyId}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4">
                    {partyId === CHATVOTE_PARTY_ID ? (
                      <div className="border-border aspect-square size-8 rounded-full border object-contain p-1">
                        <Logo variant="small" className="size-full" />
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
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-inside list-disc">
                    {sources.map((source) => (
                      <li key={source.id}>
                        <Link
                          href={source.storage_url}
                          target="_blank"
                          className="underline"
                        >
                          {source.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </section>
      </Accordion>
    </article>
  );
}

export default SourcesPage;
