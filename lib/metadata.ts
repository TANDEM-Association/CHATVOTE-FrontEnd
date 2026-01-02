import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const localeMap: Record<string, string> = {
  de: "de-DE",
  en: "en-US",
  fr: "fr-FR",
};

export async function generateBaseMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://wahl.chat"),
    title: {
      default: t("title"),
      template: "%s | wahl.chat",
    },
    description: t("description"),
    applicationName: "wahl.chat",
    keywords: t.raw("keywords"),
    robots: "index, follow",
    openGraph: {
      title: {
        default: t("title"),
        template: "%s | wahl.chat",
      },
      description: t("description"),
      images: ["/images/logo.webp"],
      url: "https://wahl.chat",
      siteName: "wahl.chat",
      locale: localeMap[locale] || "de-DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@wahl_chat",
      creator: "@wahl_chat",
      title: t("twitter-title"),
      description: t("description"),
      images: ["/images/logo.webp"],
    },
  };
}