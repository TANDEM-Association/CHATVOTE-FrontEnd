import React from "react";

import { type NextPage } from "next";

import { GitCompareIcon, MousePointerClickIcon } from "lucide-react";

import ChatGroupPartySelect from "@/components/chat/chat-group-party-select";
import { HomeElectionFlow } from "@/components/election-flow";
import ContactCard from "@/components/home/contact-card";
import GuideCard from "@/components/home/guide-card";
import HomePartyCards from "@/components/home/home-party-cards";
import KnownFrom from "@/components/home/known-from";
import SupportUsCard from "@/components/home/support-us-card";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { IS_EMBEDDED } from "@/lib/utils";

const HomePage: NextPage = () => {
  return (
    <PageLayout>
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
      <HomeElectionFlow className="mt-4" />

      {IS_EMBEDDED === false ? (
        <React.Fragment>
          <section className="mt-10 grid w-full grid-cols-1 flex-wrap gap-2 md:grid-cols-2 md:gap-2">
            <SupportUsCard />
            <GuideCard />
            <ContactCard />
          </section>
          <KnownFrom />
        </React.Fragment>
      ) : (
        <section className="mt-4">
          <GuideCard />
        </section>
      )}
    </PageLayout>
  );
};

export default HomePage;
