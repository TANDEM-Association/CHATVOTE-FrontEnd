import React from "react";

import { HomeElectionFlow } from "@/components/election-flow";
import ContactCard from "@/components/home/contact-card";
import HowToCard from "@/components/home/how-to-card";
import KnownFrom from "@/components/home/known-from";
import SupportUsCard from "@/components/home/support-us-card";
import SwiperTeaserCard from "@/components/home/swiper-teaser-card";
import { IS_EMBEDDED } from "@/lib/utils";

export default function Home() {
  return (
    <React.Fragment>
      <HomeElectionFlow className="mt-4" />

      {IS_EMBEDDED === false ? (
        <React.Fragment>
          <section className="mt-10 grid w-full grid-cols-1 flex-wrap gap-2 md:grid-cols-2 md:gap-2">
            <SwiperTeaserCard />
            {/* <TvTeaserCard /> */}
            <SupportUsCard />
            <HowToCard />
            <ContactCard />
          </section>
          <KnownFrom />
        </React.Fragment>
      ) : (
        <section className="mt-4">
          <HowToCard />
        </section>
      )}
    </React.Fragment>
  );
}
