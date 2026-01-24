import Link from "next/link";

import { RefreshCcwIcon } from "lucide-react";

import ChatGroupPartySelect from "@/components/chat/chat-group-party-select";
import { AccordionGroup } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { type PartiesScoreResult } from "@/lib/chatvote-swiper/chatvote-swiper.types";
import { type PartyDetails } from "@/lib/party-details";
import { type UserDetails } from "@/lib/utils";

import ChatvoteSwiperPartyResultCard from "./chatvote-swiper-party-result-card";
import ChatvoteSwiperShareButton from "./chatvote-swiper-share-button";
import ChatvoteSwiperSurveyLoginCard from "./chatvote-swiper-survey-login-card";

type Props = {
  resultId: string;
  scores: PartiesScoreResult;
  parties: PartyDetails[];
  userDetails?: UserDetails;
};

const ChatvoteSwiperResult = ({
  resultId,
  scores,
  parties,
  userDetails,
}: Props) => {
  const sortedScores = Object.entries(scores).sort(
    ([, score], [, otherScore]) => otherScore.score - score.score,
  );

  return (
    <div className="relative mx-auto mt-4 flex size-full flex-col items-center justify-start gap-4">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">Résultats du Swiper</h1>
        <div className="text-muted-foreground flex flex-col gap-1 text-sm">
          <p>
            Ce résultat ne sert que de première orientation. Questionnez-le de
            manière critique et consultez vous-même les programmes électoraux -
            notre chat de comparaison peut vous aider :
          </p>
          <ChatGroupPartySelect>
            <span className="cursor-pointer underline">
              Chat de comparaison
            </span>
          </ChatGroupPartySelect>
        </div>
      </div>

      <ChatvoteSwiperSurveyLoginCard
        resultId={resultId}
        userDetails={userDetails}
      />

      <AccordionGroup multiple={true}>
        {sortedScores.map(([party, score]) => {
          const partyDetails = parties.find((p) => p.party_id === party);

          if (partyDetails === undefined) {
            return null;
          }

          return (
            <ChatvoteSwiperPartyResultCard
              key={party}
              party={partyDetails}
              score={score}
            />
          );
        })}
      </AccordionGroup>
      <div className="bg-background/20 inset-x-0 bottom-0 backdrop-blur-sm">
        <div className="mt-2 mb-4 grid grid-cols-2 gap-2">
          <Button asChild>
            <Link href="/swiper">
              <RefreshCcwIcon />
              Réessayer
            </Link>
          </Button>
          <ChatvoteSwiperShareButton />
        </div>
      </div>
    </div>
  );
};

export default ChatvoteSwiperResult;
