"use client";

import { useState } from "react";

import { FilloutPopupEmbed } from "@fillout/react";
import { StarIcon, UserIcon } from "lucide-react";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { type UserDetails } from "@/lib/utils";

import "@fillout/react/style.css";

type Props = {
  resultId: string;
  userDetails?: UserDetails;
};

const ChatvoteSwiperSurveyLoginCard = ({ resultId, userDetails }: Props) => {
  const [open, setOpen] = useState(false);
  const [userClosedSurvey, setUserClosedSurvey] = useState(false);
  const { user } = useAnonymousAuth();

  const handleCloseSurvey = () => {
    setOpen(false);
    setUserClosedSurvey(true);
  };

  const hasValidUser = user
    ? !user.isAnonymous
    : userDetails
      ? !userDetails.isAnonymous
      : false;

  if (userClosedSurvey && hasValidUser) {
    return null;
  }

  return (
    <section className="border-border bg-muted flex w-full flex-col gap-2 rounded-md border p-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold">⭐️ Donnez-nous votre avis</h1>

        <p className="text-muted-foreground text-sm">
          Nous serions ravis que vous nous fassiez part de vos commentaires sur
          notre Chatvote Swiper.
          {!hasValidUser &&
            " Si vous souhaitez continuer à être informé après les élections lorsque vos opinions seront mises en œuvre, vous pouvez vous connecter ici."}
        </p>
      </div>

      <div className="flex gap-2">
        <LoginButton
          userDetails={userDetails}
          noUserChildren={
            <Button size="sm">
              <UserIcon />
              Se connecter
            </Button>
          }
        />

        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          <StarIcon />
          Feedback
        </Button>
      </div>
      {open && (
        <FilloutPopupEmbed
          filloutId="kyYP68KHyhus"
          onClose={handleCloseSurvey}
          parameters={{
            result_id: resultId,
          }}
        />
      )}
    </section>
  );
};

export default ChatvoteSwiperSurveyLoginCard;
