import { type NextPage } from "next";

import HowTo from "@/components/guide";
import { PageLayout } from "@/components/layout/page-layout";

const GuidePage: NextPage = () => {
  return (
    <PageLayout>
      <h1 className="mt-4 mb-2 text-xl font-bold md:text-2xl">
        Que puis-je faire avec <span className="underline">chatvote</span> ?
      </h1>
      <HowTo />
    </PageLayout>
  );
};

export default GuidePage;
