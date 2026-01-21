import { type MetadataRoute } from "next";

import { type PartyDetails } from "@/lib/party-details";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "https://chatvote.fr/icon.svg",
    "https://chatvote.fr/manifest.json",
    "https://chatvote.fr/pdf/view",
    "https://chatvote.fr/apple-icon.png",
    "https://chatvote.fr/donate",
    "https://chatvote.fr/about-us",
    "https://chatvote.fr/icon.png",
    "https://chatvote.fr/privacy-policy",
    "https://chatvote.fr/legal-notice",
    "https://chatvote.fr/sources",
    "https://chatvote.fr/how-to",
    "https://chatvote.fr",
    "https://chatvote.fr/swiper",
  ];

  const parties = await fetch("https://chatvote.fr/api/parties").then(
    (res) => res.json() as Promise<PartyDetails[]>,
  );

  const partyPages = parties.map((party) => ({
    url: `https://chatvote.fr/session?party_id=${party.party_id}`,
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
