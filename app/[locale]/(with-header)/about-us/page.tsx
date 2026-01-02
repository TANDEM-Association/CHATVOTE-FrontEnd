import DonationDialog from '@/components/donation-dialog';
import { Button } from '@/components/ui/button';
import { HeartHandshakeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function AboutUs() {
  const t = await getTranslations('about-us');

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-6 pt-4">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src="/images/team.webp"
          alt="About Us"
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className="object-cover"
        />
      </div>
      <section className="space-y-4">
        <p>
          <span className="font-bold [&_a]:underline">
            {t('team-intro-start')}{' '}
            <Link href="http://wahl.chat/">wahl.chat</Link>{' '}
            {t('team-intro-end')}
            <a href="https://www.linkedin.com/in/sebmai/" target="_blank">
              Sebastian
            </a>
            ,{' '}
            <a href="https://www.linkedin.com/in/antonwy/" target="_blank">
              Anton
            </a>
            ,{' '}
            <a
              href="https://www.linkedin.com/in/michel-schimpf-55069b198/"
              target="_blank"
            >
              Michel
            </a>
            ,{' '}
            <a href="https://www.linkedin.com/in/robin-frasch/" target="_blank">
              Robin
            </a>
            ,{' '}
            <a href="https://www.linkedin.com/in/roman-mayr/" target="_blank">
              Roman
            </a>{' '}
          </span>
          ({t('team-image')})
        </p>

        <p>{t('team-description')}</p>
        <p className="[&_a]:underline">
          {t('thanks-supporters')}
          <a target="_blank" href="https://www.linkedin.com/in/simonkaran/">
            Simon
          </a>
          ,{' '}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/nathan-orester-898014247/"
          >
            Nathan
          </a>
          ,{' '}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/anton-kluge-0b0aa6220/"
          >
            Anton
          </a>
          ,{' '}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/paul-barbu-8391b7216/"
          >
            Paul
          </a>
          ,{' '}
          <a target="_blank" href="https://www.linkedin.com/in/etiennekoehler/">
            Etienne
          </a>
          ,{' '}
          <a target="_blank" href="https://www.linkedin.com/in/nikhil-j-roy/">
            Nikhil
          </a>
          , Mai
        </p>
        <p className="[&_a]:underline">
          {t('join-team-start')}
          <Link href="http://wahl.chat/">wahl.chat</Link>
          {t('join-team-end')}
          <a href="mailto:info@wahl.chat">info@wahl.chat</a>
        </p>
        <p className="[&_a]:underline">
          {t('thesis-invitation')}{' '}
          <a href="mailto:robin@wahl.chat">robin@wahl.chat</a>
        </p>

        <div className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
          <div className="flex flex-col">
            <h2 className="font-bold">{t('support-us-title')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('support-description')}
            </p>
          </div>

          <DonationDialog>
            <Button>
              <HeartHandshakeIcon />
              {t('donate')}
            </Button>
          </DonationDialog>
        </div>
      </section>
    </div>
  );
}
