import { GitCompareIcon, MousePointerClickIcon } from "lucide-react";

import ChatGroupPartySelect from "@/components/chat/chat-group-party-select";
import ContactCard from "@/components/home/contact-card";
import HomeInput from "@/components/home/home-input";
import HomePartyCards from "@/components/home/home-party-cards";
import HowToCard from "@/components/home/how-to-card";
import KnownFrom from "@/components/home/known-from";
import SupportUsCard from "@/components/home/support-us-card";
import SwiperTeaserCard from "@/components/home/swiper-teaser-card";
import { Button } from "@/components/ui/button";
import {
  getHomeInputProposedQuestions,
  getSystemStatus,
  getUser,
} from "@/lib/firebase/firebase-server";
import { IS_EMBEDDED } from "@/lib/utils";

export default async function Home() {
  const chatvoteQuestions = await getHomeInputProposedQuestions();
  const systemStatus = await getSystemStatus();
  const user = await getUser();

  return (
    <>
      {/* <KeepUpToDateTeaserCard initialUser={user} /> */}

      <div className="mt-4 flex w-full flex-row items-center justify-center gap-2">
        <MousePointerClickIcon />
        <h1 className="text-center text-sm font-semibold">
          Choisissez un parti et posez vos questions à l&lsquo;IA
        </h1>
      </div>

      <HomePartyCards />

      <div className="w-full">
        <ChatGroupPartySelect>
          <Button
            className="border-border mt-4 w-full max-w-xl border whitespace-normal"
            variant="secondary"
          >
            <GitCompareIcon />
            Sélectionner plusieurs partis pour comparer
          </Button>
        </ChatGroupPartySelect>
      </div>

      <HomeInput
        className="hidden md:block"
        questions={chatvoteQuestions}
        initialSystemStatus={systemStatus}
        hasValidServerUser={!user?.isAnonymous}
      />

      {!IS_EMBEDDED && <KnownFrom />}

      {IS_EMBEDDED ? (
        <section className="mt-4">
          <HowToCard />
        </section>
      ) : (
        <section className="grid w-full grid-cols-1 flex-wrap gap-2 md:grid-cols-2 md:gap-2">
          <SwiperTeaserCard />
          {/* <TvTeaserCard /> */}
          <SupportUsCard />
          <HowToCard />
          <ContactCard />
        </section>
      )}

      <HomeInput
        className="md:hidden"
        questions={chatvoteQuestions}
        initialSystemStatus={systemStatus}
        hasValidServerUser={!user?.isAnonymous}
      />
    </>
  );
}
