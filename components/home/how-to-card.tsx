import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { BookMarkedIcon } from 'lucide-react';
import { Button } from '../ui/button';

function HowToCard() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-border md:col-span-2 md:order-last">
      <div className="flex flex-col p-4">
        <h2 className="font-bold">
          {t.rich('how-to-card-title', { underline: (chunks) => <span className="underline">{chunks}</span> })}
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          {t.rich('how-to-card-description', { underline: (chunks) => <span className="underline">{chunks}</span> })}
        </p>
        <Button asChild variant="secondary">
          <Link href="/how-to">
            <BookMarkedIcon />
            {t('how-to-card-button')}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HowToCard;
