import { type MetadataRoute } from "next";

import { type PartyDetails } from "@/lib/party-details";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "https://app.chatvote.org/icon.svg",
    "https://app.chatvote.org/manifest.json",
    "https://app.chatvote.org/pdf/view",
    "https://app.chatvote.org/apple-icon.png",
    "https://app.chatvote.org/donate",
    "https://app.chatvote.org/about-us",
    "https://app.chatvote.org/icon.png",
    "https://app.chatvote.org/privacy-policy",
    "https://app.chatvote.org/legal-notice",
    "https://app.chatvote.org/sources",
    "https://app.chatvote.org/how-to",
    "https://app.chatvote.org",
    "https://app.chatvote.org/swiper",
  ];

  const parties = await fetch("https://app.chatvote.org/api/parties").then(
    (res) => res.json() as Promise<PartyDetails[]>,
  );

  const partyPages = parties.map((party) => ({
    url: `https://app.chatvote.org/session?party_id=${party.party_id}`,
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
