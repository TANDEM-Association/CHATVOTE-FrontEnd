import { type NextPage } from "next";

import { PageLayout } from "@/components/layout/page-layout";
import { Markdown } from "@/components/markdown";

const LegalNoticesPage: NextPage = () => {
  const markdown = `
# Mentions légales
        
## Adresse
*TANDEM*  
24, rue Noble
63450 Saint-Saturnin  
France

## Contact
**E-Mail:** info@chatvote.org
  `;

  return (
    <PageLayout>
      <div className="mx-auto w-full">
        <Markdown onReferenceClick={() => {}}>{markdown}</Markdown>
      </div>
    </PageLayout>
  );
};

export default LegalNoticesPage;
