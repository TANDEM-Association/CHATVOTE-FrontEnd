import { Markdown } from "@/components/markdown";

const LegalNotices = () => {
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
    <div className="mx-auto w-full">
      <Markdown onReferenceClick={() => {}}>{markdown}</Markdown>
    </div>
  );
};

export default LegalNotices;
