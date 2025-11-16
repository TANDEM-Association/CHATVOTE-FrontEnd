import type { PartyDetails } from '@/lib/party-details';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    'https://wahl.chat/icon.svg',
    'https://wahl.chat/manifest.json',
    'https://wahl.chat/pdf/view',
    'https://wahl.chat/apple-icon.png',
    'https://wahl.chat/donate',
    'https://wahl.chat/about-us',
    'https://wahl.chat/icon.png',
    'https://wahl.chat/datenschutz',
    'https://wahl.chat/impressum',
    'https://wahl.chat/sources',
    'https://wahl.chat/how-to',
    'https://wahl.chat',
    'https://wahl.chat/swiper',
  ];

  const parties = await fetch('https://wahl.chat/api/parties').then(
    (res) => res.json() as Promise<PartyDetails[]>,
  );

  const partyPages = parties.map((party) => ({
    url: `https://wahl.chat/session?party_id=${party.party_id}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...pages.map((page) => ({
      url: page,
      lastModified: new Date().toISOString(),
    })),
    ...partyPages,
  ];
}
