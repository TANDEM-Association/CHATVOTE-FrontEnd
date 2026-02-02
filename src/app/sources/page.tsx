import { type NextPage } from "next";

import { PageLayout } from "@components/layout/page-layout";
import SourcesContent from "@components/sources-content";
import { getParties, getSourceDocuments } from "@lib/firebase/firebase-server";

const SourcesPage: NextPage = async () => {
  const sources = await getSourceDocuments();
  const parties = await getParties();

  return (
    <PageLayout>
      <SourcesContent sources={sources} parties={parties} />
    </PageLayout>
  );
};

export default SourcesPage;
