import { Markdown } from '@/components/markdown';

function Impressum() {
  const markdown = `
# Impressum
        
## Adresse
*Robin Frasch*  
An der Verbindungsbahn 7 
20146 Hamburg  
Deutschland

## Kontakt
**E-Mail:** info@wahl.chat
  `;

  return (
    <div className="mx-auto w-full">
      <Markdown onReferenceClick={() => {}}>{markdown}</Markdown>
    </div>
  );
}

export default Impressum;
