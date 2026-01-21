import { type Metadata, type Viewport } from "next";
import { headers } from "next/headers";

import { Analytics } from "@vercel/analytics/react";
import { domAnimation, LazyMotion } from "motion/react";

import { AnonymousAuthProvider } from "@/components/anonymous-auth";
import AuthServiceWorkerProvider from "@/components/providers/auth-service-worker-provider";
import { PartiesProvider } from "@/components/providers/parties-provider";
import TenantProvider from "@/components/providers/tenant-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TENANT_ID_HEADER } from "@/lib/constants";
import { getTenant } from "@/lib/firebase/firebase-admin";
import { getParties, getUser } from "@/lib/firebase/firebase-server";
import { IS_EMBEDDED } from "@/lib/utils";

import "./globals.css";

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

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const parties = await getParties();
  const headersList = await headers();
  const tenantId = headersList.get(TENANT_ID_HEADER);
  const tenant = await getTenant(tenantId);
  const user = await getUser();

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <AuthServiceWorkerProvider />
      <TooltipProvider>
        <AnonymousAuthProvider user={user}>
          <TenantProvider tenant={tenant}>
            <body>
              <LazyMotion features={domAnimation}>
                <ThemeProvider
                  attribute="class"
                  enableSystem={!IS_EMBEDDED}
                  disableTransitionOnChange
                >
                  <PartiesProvider parties={parties}>
                    {children}
                  </PartiesProvider>
                </ThemeProvider>
                <Toaster expand duration={1500} position="top-right" />
                {/* <LoginReminderToast /> */}
                {/* TODO: implement again when problems are fixed <IframeChecker /> */}
                <Analytics />
              </LazyMotion>
            </body>
          </TenantProvider>
        </AnonymousAuthProvider>
      </TooltipProvider>
    </html>
  );
}
