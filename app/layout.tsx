import { type Metadata } from "next";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import { headers } from "next/headers";

import { TENANT_ID_HEADER } from "@/lib/constants";
import { detectDevice } from "@/lib/device";
import { getTenant } from "@/lib/firebase/firebase-admin";
import { getParties, getUser } from "@/lib/firebase/firebase-server";
import { getTheme } from "@/lib/theme/getTheme";

import { AppProvider } from "./_providers/AppProvider";

import "./globals.css";

const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chatvote.fr"),
  title: {
    default: "chatvote - Comprendre la politique de manière interactive",
    template: "%s | chatvote",
  },
  description:
    "Comprenez les objectifs et positions des partis politiques français. Discutez avec les programmes des partis sur chatvote, posez vos questions sur vos sujets et obtenez une analyse critique des positions politiques.",
  applicationName: "chatvote",
  keywords: [
    "Chatvote",
    "Chat politique",
    "IA politique",
    "Chat IA",
    "Programme électoral",
    "Partis politiques",
    "Politique",
    "Comprendre la politique",
    "Élections françaises",
    "IA",
    "Intelligence artificielle",
    "Chatbot",
    "Chat",
    "France",
    "Politique française",
    "Aide au vote",
    "Décision électorale",
    "S&lsquo;informer sur les élections",
    "Comparateur politique",
  ],
  robots: "index, follow",
  openGraph: {
    title: {
      default: "chatvote - Comprendre la politique de manière interactive",
      template:
        "%s | chatvote - Comprendre la politique de manière interactive",
    },
    description:
      "Comprenez les objectifs et positions des partis politiques français. Discutez avec les programmes des partis sur chatvote, posez vos questions sur vos sujets et obtenez une analyse critique des positions politiques.",
    images: ["/images/logo.webp"],
    url: "https://chatvote.fr",
    siteName: "chatvote",
    locale: "fr-FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@chatvote_fr",
    creator: "@chatvote_fr",
    title: "chatvote | Programmes des partis pour les élections françaises",
    description:
      "Comprenez les objectifs et positions des partis politiques français. Discutez avec les programmes des partis sur chatvote, posez vos questions sur vos sujets et obtenez une analyse critique des positions politiques.",
    images: ["/images/logo.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const device = detectDevice(requestHeaders);
  const theme = getTheme(requestHeaders);

  const parties = await getParties();
  const tenantId = requestHeaders.get(TENANT_ID_HEADER);
  const tenant = await getTenant(tenantId);
  const user = await getUser();

  return (
    <html lang="fr" data-theme={theme}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${merriweatherSans.variable} ${merriweather.variable} bg-neutral-950 text-neutral-100 antialiased`}
      >
        <AppProvider
          device={device}
          user={user}
          tenant={tenant}
          parties={parties}
        >
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
