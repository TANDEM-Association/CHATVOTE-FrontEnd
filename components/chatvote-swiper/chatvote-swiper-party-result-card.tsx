import Image from "next/image";
import Link from "next/link";

import { CheckIcon, MessageSquareIcon, XIcon } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type PartiesScoreResult,
  type ThesesScoreResult,
} from "@/lib/chatvote-swiper/chatvote-swiper.types";
import { type PartyDetails } from "@/lib/party-details";
import { buildPartyImageUrl, cn } from "@/lib/utils";

const CHATVOTE_SWIPER_PARTY_IDS = [
  "afd",
  "cdu",
  "fdp",
  "gruene",
  "linke",
  "spd",
  "bsw",
];

type Props = {
  party: PartyDetails;
  score: PartiesScoreResult[string];
};

const ChatvoteSwiperPartyResultCard = ({ party, score }: Props) => {
  const prettyScore = score.score.toFixed(1);

  const chatLink = `/session?party_id=${party.party_id}`;

  const sortedTheses = score.theses.sort((a, b) => {
    if (a.thesis.topic === b.thesis.topic) {
      return a.thesis.question.localeCompare(b.thesis.question);
    }
    return a.thesis.topic.localeCompare(b.thesis.topic);
  });

  const consensusTheses = sortedTheses.filter((thesis) => thesis.consensus);
  const notConsensusTheses = sortedTheses.filter((thesis) => !thesis.consensus);

  return (
    <AccordionItem
      className="border-border relative flex w-full flex-col overflow-hidden rounded-md border"
      value={party.party_id}
    >
      <AccordionTrigger className="relative flex w-full flex-row items-center p-4">
        <div
          className="bg-primary/5 absolute top-0 left-0 h-full"
          style={{
            width: `${score.score}%`,
          }}
        />
        <div className="z-10 flex grow flex-row items-center gap-4">
          <div
            className="flex aspect-square size-[40px] items-center justify-center rounded-full"
            style={{
              backgroundColor: party.background_color,
            }}
          >
            <Image
              src={buildPartyImageUrl(party.party_id)}
              alt={party.name}
              width={30}
              height={30}
            />
          </div>
          <p className="text-foreground font-medium">{party.name}</p>
        </div>
        <h2 className="z-10 mr-2 text-xl font-bold no-underline">
          {prettyScore}%
        </h2>
      </AccordionTrigger>

      <AccordionContent>
        <Separator />

        <div className="flex flex-col gap-2 p-4">
          <h2 className="font-bold">Consensus entre {party.name} et vous :</h2>
          <p className="text-muted-foreground text-sm">
            {party.name} est d&lsquo;accord avec vous sur{" "}
            <span className="font-bold">
              {consensusTheses.length} sur {sortedTheses.length}
            </span>{" "}
            questions.
          </p>
          <div className="border-border bg-muted flex w-fit flex-row items-center justify-start gap-2 rounded-md border p-2">
            <p className="w-8 text-center text-xl">💡</p>
            <p className="text-muted-foreground text-sm">
              Cliquez sur une question pour plus d&lsquo;informations.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead className="min-w-[100px] text-right">
                  D&lsquo;accord
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <span className="mx-4 mt-4 block w-fit rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-500">
                Consensus
              </span>

              {consensusTheses.map((thesis) => (
                <ThesisRow key={thesis.thesis.id} thesis={thesis} />
              ))}

              <span className="mx-4 mt-4 block w-fit rounded-md bg-red-500/10 px-2 py-1 text-xs text-red-500">
                Pas de consensus
              </span>

              {notConsensusTheses.map((thesis) => (
                <ThesisRow key={thesis.thesis.id} thesis={thesis} />
              ))}
            </TableBody>
          </Table>

          <Button variant="secondary" className="mx-4" asChild>
            <Link href={chatLink}>
              <MessageSquareIcon />
              Aller au chat
            </Link>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const ThesisRow = ({ thesis }: { thesis: ThesesScoreResult[number] }) => {
  const searchParams = new URLSearchParams();
  CHATVOTE_SWIPER_PARTY_IDS.forEach((partyId) => {
    searchParams.append("party_id", partyId);
  });
  searchParams.append("q", thesis.thesis.question);

  const link = `/session?${searchParams.toString()}`;

  const agree = thesis.userStance === "yes";

  return (
    <TableRow>
      <TableCell className="font-semibold">
        <Link href={link} target="_blank" className="hover:underline">
          {thesis.thesis.question}
        </Link>
      </TableCell>
      <TableCell className="flex items-center justify-end">
        <div
          className={cn(
            "flex aspect-square w-fit flex-row items-center justify-center rounded-full p-2",
            agree && "bg-green-500/10 text-green-500",
            !agree && "bg-red-500/10 text-red-500",
          )}
        >
          {agree ? (
            <CheckIcon className="size-4" />
          ) : (
            <XIcon className="size-4" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ChatvoteSwiperPartyResultCard;
