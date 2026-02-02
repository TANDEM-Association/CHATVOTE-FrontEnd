import React from "react";

import { type NextPage } from "next";

import { HomeElectionFlow } from "@components/election-flow";
import ContactCard from "@components/home/contact-card";
import GuideCard from "@components/home/guide-card";
import { HomeCompareButton, HomeHero } from "@components/home/home-hero";
import HomePartyCards from "@components/home/home-party-cards";
import KnownFrom from "@components/home/known-from";
import SupportUsCard from "@components/home/support-us-card";
import { PageLayout } from "@components/layout/page-layout";
import { IS_EMBEDDED } from "@lib/utils";

const HomePage: NextPage = () => {
  return (
    <PageLayout>
      <HomeHero />

      <HomePartyCards />

      <HomeCompareButton />

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
