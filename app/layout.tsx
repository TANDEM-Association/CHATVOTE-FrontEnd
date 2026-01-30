import { type Metadata } from "next";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import { headers } from "next/headers";

import { TENANT_ID_HEADER } from "@/lib/constants";
import { detectDevice } from "@/lib/device";
import { getTenant } from "@/lib/firebase/firebase-admin";
import { getAuth, getParties } from "@/lib/firebase/firebase-server";
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
  metadataBase: new URL("https://app.chatvote.org"),
  title: {
    default: "chatvote - Comprendre la politique de manière interactive",
    template: "%s | chatvote",
  },
  description:
    "Comprenez les objectifs et positions des partis politiques français. Discutez avec les programmes des partis sur chatvote, posez vos questions sur vos sujets et obtenez une analyse critique des positions politiques.",
  applicationName: "chatvote",
  icons: {
    icon: [
      {
        url: "/images/icons/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/images/icons/favicon-96x96.png?v=2",
        sizes: "96x96",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/icons/favicon-192x192.png?v=2",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/images/icons/favicon-512x512.png?v=2",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/images/icons/apple-touch-icon.png",
    other: [
      {
        rel: "shortcut icon",
        url: "/images/icons/favicon.ico",
      },
    ],
  },
  manifest: "/manifest.json",
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
    url: "https://app.chatvote.org",
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
  const auth = await getAuth();

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
          auth={auth}
          tenant={tenant}
          parties={parties}
        >
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
