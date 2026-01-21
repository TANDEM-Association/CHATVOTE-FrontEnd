import Link from "next/link";

import { RefreshCcwIcon } from "lucide-react";

import ChatGroupPartySelect from "@/components/chat/chat-group-party-select";
import { Accordion } from "@/components/ui/accordion";
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
    <div className="relative mx-auto mt-4 flex w-full flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">Résultats du Swiper</h1>
        <p className="text-muted-foreground text-sm">
          Ce résultat ne sert que de première orientation. Questionnez-le de
          manière critique et consultez vous-même les programmes électoraux -
          notre chat de comparaison peut vous aider :{" "}
          <ChatGroupPartySelect>
            <span className="underline">Chat de comparaison</span>
          </ChatGroupPartySelect>
        </p>
      </div>

      <ChatvoteSwiperSurveyLoginCard
        resultId={resultId}
        userDetails={userDetails}
      />

      <Accordion type="single" collapsible className="flex flex-col gap-2">
        {sortedScores.map(([party, score]) => {
          const partyDetails = parties.find((p) => p.party_id === party);

          if (!partyDetails) {
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
      </Accordion>
      <div className="bg-background/20 sticky inset-x-0 bottom-0 z-10 backdrop-blur-sm">
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
