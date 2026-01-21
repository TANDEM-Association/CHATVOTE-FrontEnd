import Logo from '@/components/chat/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { WAHL_CHAT_PARTY_ID } from '@/lib/constants';
import { getParties, getSourceDocuments } from '@/lib/firebase/firebase-server';
import type { SourceDocument } from '@/lib/firebase/firebase.types';
import { buildPartyImageUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

// Force dynamic rendering to avoid Firebase calls during build
export const dynamic = 'force-dynamic';

async function SourcesPage() {
  const sources = await getSourceDocuments();
  const parties = await getParties();

  const sourcesByPartyId = sources.reduce(
    (acc, source) => {
      acc[source.party_id] = acc[source.party_id] || [];
      acc[source.party_id].push(source);
      return acc;
    },
    {} as Record<string, SourceDocument[]>
  );

  return (
    <article>
      <h1 className="text-xl md:text-2xl font-bold mt-4">
        Quellen die <span className="underline">wahl.chat</span> nutzt
      </h1>
      <p className="text-sm text-muted-foreground mb-2">
        Diese Quellen nutzt unsere KI für die allgemeinen Antworten. Für das
        Einordnen von Positionen verwenden wir Perplexity.ai, welches sich auf
        aktuelle Informationen aus dem Internet stützt.
      </p>
      <Accordion type="single" collapsible asChild>
        <section>
          {Object.entries(sourcesByPartyId).map(([partyId, sources]) => {
            const party =
              partyId === WAHL_CHAT_PARTY_ID
                ? undefined
                : parties.find((party) => party.party_id === partyId);

            const name = party?.name ?? 'wahl.chat';

            return (
              <AccordionItem value={partyId} key={partyId}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4">
                    {partyId === WAHL_CHAT_PARTY_ID ? (
                      <div className="rounded-full aspect-square object-contain p-1 border border-border size-8">
                        <Logo variant="small" className="size-full" />
                      </div>
                    ) : (
                      <Image
                        src={buildPartyImageUrl(partyId)}
                        alt={name}
                        width={32}
                        height={32}
                        className="rounded-full aspect-square object-contain p-1"
                        style={{ backgroundColor: party?.background_color }}
                      />
                    )}
                    <h2 className="font-bold">{name}</h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside">
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
