import DonationDialog from '@/components/donation-dialog';
import { Button } from '@/components/ui/button';
import { HeartHandshakeIcon, UsersRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

function SupportUsCard() {
  const t = useTranslations('home');
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-border">
      <div className="flex flex-col p-4">
        <h2 className="font-bold">{t('support-card-title')}</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          {t('support-card-description')}
        </p>
        <div className="flex w-full flex-row gap-2 [&_button]:w-full">
          <DonationDialog>
            <Button>
              <HeartHandshakeIcon /> {t('support-card-donate-button')}
            </Button>
          </DonationDialog>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/about-us">
              <UsersRoundIcon />
              {t('support-card-about-button')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SupportUsCard;
