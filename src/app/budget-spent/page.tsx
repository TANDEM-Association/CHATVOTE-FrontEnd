import { type NextPage } from "next";

import BudgetSpentContent from "@components/budget-spent-content";
import { PageLayout } from "@components/layout/page-layout";

const BudgetSpentPage: NextPage = () => {
  return (
    <PageLayout>
      <BudgetSpentContent />
    </PageLayout>
  );
};

export default BudgetSpentPage;
